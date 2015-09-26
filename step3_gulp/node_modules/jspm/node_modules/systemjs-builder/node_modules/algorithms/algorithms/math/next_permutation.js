'use strict';

var Comparator = require('../../util/comparator');


/**
 * Narayana's algorithm computes the subsequent permutation
 *   in lexicographical order.
 * Complexity: O(n).
 *
 * @param {Array} array
 * @param {function} [compareFn] - Custom compare function.
 * @return {boolean} Boolean flag indicating whether the algorithm succeeded,
 *   true unless the input permutation is lexicographically the last one.
 */
var nextPermutation = function (array, compareFn) {
  if (!array.length) {
    return false;
  }
  var cmp = new Comparator(compareFn);

  // Find pivot and successor indices.
  var pivot = array.length - 1;
  while (pivot && cmp.greaterThanOrEqual(array[pivot - 1], array[pivot])) {
    pivot -= 1;
  }
  if (!pivot) {
    // Permutation is sorted in descending order.
    return false;
  }
  var pivotValue = array[--pivot];
  var successor = array.length - 1;
  while (cmp.lessThanOrEqual(array[successor], pivotValue)) {
    successor -= 1;
  }

  // Swap values.
  array[pivot] = array[successor];
  array[successor] = pivotValue;

  // Reverse the descending part.
  for (var left = pivot, right = array.length; ++left < --right;) {
    var temp = array[left];
    array[left] = array[right];
    array[right] = temp;
  }
  return true;
};


module.exports = nextPermutation;
