'use strict';


var huffman = {};


/**
 * Maximum block size used by functions "compress", "decompress".
 *
 * @const
 */
var MAX_BLOCK_SIZE = (-1 >>> 0).toString(2).length;


/**
 * Compress 0-1 string to int32 array.
 *
 * @param {string} string
 * @return {number[]}
 */
var compress = function (string) {
  var blocks = [];
  var currentBlock = 0, currentBlockSize = 0;

  string.split('').forEach(function (char) {
    currentBlock = (currentBlock << 1) | char;
    currentBlockSize += 1;

    if (currentBlockSize === MAX_BLOCK_SIZE) {
      blocks.push(currentBlock);
      currentBlock = currentBlockSize = 0;
    }
  });

  // Append last block size to the end.
  if (currentBlockSize) {
    blocks.push(currentBlock, currentBlockSize);
  }
  else {
    blocks.push(MAX_BLOCK_SIZE);
  }

  return blocks;
};


/**
 * Decompress int32 array back to 0-1 string.
 *
 * @param {number[]} array
 * @return {string}
 */
var decompress = function (array) {
  if (!array.length) {
    return '';
  }
  else if (array.length === 1) {
    throw new Error('Compressed array must be either empty ' +
                    'or at least 2 blocks big.');
  }

  var padding = new Array(MAX_BLOCK_SIZE + 1).join(0);

  var string = array.slice(0, -2).map(function (block) {
    return (padding + (block >>> 0).toString(2)).slice(-padding.length);
  }).join('');

  // Append the last block.
  var lastBlockSize = array.slice(-1)[0];
  var lastBlock = array.slice(-2)[0];
  string += (padding + (lastBlock >>> 0).toString(2)).slice(-lastBlockSize);

  return string;
};


/**
 * Apply Huffman encoding to a string.
 *
 * @param {string} string
 * @param {boolean} [compressed=false] - Whether compress the string to bits.
 * @return {{encoding: Object.<string, string>, value: string|number[]}}
 */
huffman.encode = function (string, compressed) {
  if (!string.length) {
    return {
      encoding: {},
      value: (compressed ? [] : '')
    };
  }

  var counter = {};
  string.split('').forEach(function (char) {
    counter[char] = (counter[char] || 0) + 1;
  });

  var letters = Object.keys(counter).map(function (char) {
    return {
      char: char,
      count: counter[char]
    };
  });

  var compare = function (a, b) {
    return a.count - b.count;
  };
  var less = function (a, b) {
    return a && (b && (a.count < b.count) || !b);
  };

  letters.sort(compare);

  // Each time two least letters are merged into one, the result is pushing into
  // this buffer. Since the letters are pushing in ascending order of frequency,
  // no more sorting is ever required.
  var buffer = [];
  var lettersIndex = 0, bufferIndex = 0;

  var extractMinimum = function () {
    return less(letters[lettersIndex], buffer[bufferIndex]) ?
      letters[lettersIndex++] : buffer[bufferIndex++];
  };

  for (var numLetters = letters.length; numLetters > 1; --numLetters) {
    var a = extractMinimum(), b = extractMinimum();
    a.code = '0';
    b.code = '1';
    var union = {
      count: a.count + b.count,
      parts: [a, b]
    };
    buffer.push(union);
  }

  // At this point there is a single letter left.
  var root = extractMinimum();
  root.code = (letters.length > 1) ? '' : '0';

  // Unroll the code recursively in reverse.
  (function unroll(parent) {
    if (parent.parts) {
      var a = parent.parts[0], b = parent.parts[1];
      a.code += parent.code;
      b.code += parent.code;
      unroll(a);
      unroll(b);
    }
  })(root);

  var encoding = letters.reduce(function (acc, letter) {
    acc[letter.char] = letter.code.split('').reverse().join('');
    return acc;
  }, {});

  // Finally, apply the encoding to the given string.
  var result = string.split('').map(function (char) {
    return encoding[char];
  }).join('');

  return {
    encoding: encoding,
    value: (compressed ? compress(result) : result)
  };
};


/**
 * Decode a Huffman-encoded string or compressed number sequence.
 *
 * @param {Object.<string, string>} encoding - Maps characters to 0-1 sequences.
 * @param {string|number[]} encodedString
 * @return {string} Decoded string.
 */
huffman.decode = function (encoding, encodedString) {
  if (Array.isArray(encodedString)) {
    encodedString = decompress(encodedString);
  }

  // We can make use of the fact that encoding mapping is always one-to-one
  // and rely on the power of JS hashes instead of building hand-made FSMs.
  var letterByCode = Object.keys(encoding).reduce(function (acc, letter) {
    acc[encoding[letter]] = letter;
    return acc;
  }, {});

  var decodedLetters = [];

  var unresolved = encodedString.split('').reduce(function (code, char) {
    code += char;
    var letter = letterByCode[code];
    if (letter) {
      decodedLetters.push(letter);
      code = '';
    }
    return code;
  }, '');

  if (unresolved) {
    throw new Error('Invalid string to decode.');
  }

  return decodedLetters.join('');
};


module.exports = huffman;
