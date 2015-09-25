'use strict';

/**
 * A prime number used to create
 * the hash representation of a word
 *
 * Bigger the prime number,
 * bigger the hash value
 */
var base = 997;

/**
 * Calculates String Matching between two Strings
 * Returns true if String 'b' is contained in String 'a'
 *
 * Average and Best Case Complexity: O(a.length + b.length)
 * Worst Case Complexity: O(a.length * b.length)
 *
 * @param String
 * @param String
 * @return Integer
 */
var rabinKarp = function (s, pattern) {
  if (pattern.length === 0) return 0;

  var hashPattern = hash(pattern);
  var currentSubstring = s.substring(0, pattern.length);
  var hashCurrentSubstring;

  for (var i = pattern.length; i <= s.length; i++) {
    if (hashCurrentSubstring === undefined) {
      hashCurrentSubstring = hash(currentSubstring);
    } else {
      /*
       * Re-hash
       * Recalculates the hash representation of a word so that it isn't
       * necessary to traverse the whole word again
       */
      hashCurrentSubstring -= currentSubstring.charCodeAt(0) *
        Math.pow(base, pattern.length - 1);
      hashCurrentSubstring *= base;
      hashCurrentSubstring += s.charCodeAt(i);

      currentSubstring = currentSubstring.substring(1) + s[i];
    }

    if (hashPattern === hashCurrentSubstring &&
        pattern === currentSubstring) {
      // Hack for the off-by-one when matching in the beginning of the string
      return i === pattern.length ? 0 : i - pattern.length + 1;
    }
  }

  return -1;
};

/**
 * Creates the hash representation of 'word'
 *
 * @param String
 * @return Number
 */
var hash = function (word) {
  var h = 0;

  for (var i = 0; i < word.length; i++) {
    h += word.charCodeAt(i) * Math.pow(base, word.length - i - 1);
  }

  return h;
};

module.exports = rabinKarp;
