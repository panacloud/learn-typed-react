/**
 * Implementation of longest common substring
 */

'use strict';

/**
 * Implementation via dynamic programming
 */
var longestCommonSubstring = function (s1, s2) {
  // Multidimensional array for dynamic programming algorithm
  var cache = new Array(s1.length + 1);

  var i, j;

  for (i = 0; i <= s1.length + 1; i++) {
    cache[i] = new Int32Array(s2.length + 1);
  }

  var lcsPosition = {};
  var lcsLength = 0;

  // Fill in the cache
  for (i = 1; i <= s1.length; i++) {
    for (j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        cache[i][j] = cache[i - 1][j - 1] + 1;
        if (cache[i][j] > lcsLength) {
          lcsPosition.i = i;
          lcsPosition.j = j;
          lcsLength = cache[i][j];
        }
      } else {
        cache[i][j] = 0;
      }
    }
  }

  var lcs = '';
  if (lcsLength) {
    lcs = s1.substring(lcsPosition.i - lcsLength, lcsPosition.i);
  }

  return lcs;
};

module.exports = longestCommonSubstring;
