/**
 * Implementation of longest common subsequence
 */

'use strict';

/**
 * Implementation via dynamic programming
 */
var longestCommonSubsequence = function (s1, s2) {
  // Multidimensional array for dynamic programming algorithm
  var cache = new Array(s1.length + 1);

  var i, j;

  for (i = 0; i <= s1.length; i++) {
    cache[i] = new Int32Array(s2.length + 1);
  }

  // Fill in the cache
  for (i = 1; i <= s1.length; i++) {
    for (j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        cache[i][j] = cache[i - 1][j - 1] + 1;
      } else {
        cache[i][j] = Math.max(cache[i][j - 1], cache[i - 1][j]);
      }
    }
  }

  // Build LCS from cache
  i = s1.length;
  j = s2.length;
  var lcs = '';

  while (cache[i][j] !== 0) {
    if (s1[i - 1] === s2[j - 1]) {
      lcs = s1[i - 1] + lcs;
      i--;
      j--;
    } else if (cache[i - 1][j] > cache[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
};

module.exports = longestCommonSubsequence;
