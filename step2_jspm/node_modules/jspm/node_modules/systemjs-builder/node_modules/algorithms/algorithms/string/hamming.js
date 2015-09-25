/**
 *
 * "Hamming distance between two strings of equal length is the number of
 * positions at which the corresponding symbols are different. In another way,
 * it measures the minimum number of substitutions required to change one string
 * into the other." - https://en.wikipedia.org/wiki/Hamming_distance
 *
 */
'use strict';

var hamming = function (a, b) {
  if (a.length !== b.length) {
    throw new Error('Strings must be equal in length');
  }

  var dist = 0;

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      dist++;
    }
  }

  return dist;
};

module.exports = hamming;
