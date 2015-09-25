'use strict';

/**
 * Calculate Shannon Entropy of an array
 *
 * @param {Array} arr - An array of values.
 * @return Number
 */
var shannonEntropy = function (arr) {
  // find the frequency of each value
  var freqs = arr.reduce(function (acc, item) {
    acc[item] = acc[item] + 1 || 1;
    return acc;
  }, {});

  // find the probability of each value
  var probs = Object.keys(freqs).map(function (key) {
    return freqs[key] / arr.length;
  });

  // calulate the shannon entropy of the array
  return probs.reduce(function (e, p) {
    return e - p * Math.log(p);
  }, 0) * Math.LOG2E;
};

module.exports = shannonEntropy;
