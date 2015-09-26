'use strict';

// String algorithms
module.exports = {
  levenshtein: require('./algorithms/string/levenshtein'),
  rabinKarp: require('./algorithms/string/rabin_karp'),
  knuthMorrisPratt: require('./algorithms/string/knuth_morris_pratt'),
  huffman: require('./algorithms/string/huffman'),
  hamming: require('./algorithms/string/hamming'),
  longestCommonSubsequence: require(
    './algorithms/string/longest_common_subsequence'),
  longestCommonSubstring: require(
      './algorithms/string/longest_common_substring')
};
