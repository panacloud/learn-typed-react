'use strict';
var Comparator = require('../../util/comparator');

/**
 * Quicksort recursively sorts parts of the array in
 * O(n.lg n)
 */
var quicksortInit = function (array, comparatorFn) {

  var comparator = new Comparator(comparatorFn);

  return (function quicksort(array, lo, hi) {
    while (lo < hi) {
      var p = partition(array, comparator, lo, hi);
      //Chooses only the smallest partition to use recursion on and
      //tail-optimize the other. This guarantees O(log n) space in worst case.
      if (p - lo < hi - p) {
        quicksort(array, lo, p - 1);
        lo = p + 1;
      } else {
        quicksort(array, p + 1, hi);
        hi = p - 1;
      }
    }

    return array;
  })(array, 0, array.length - 1);
};

/**
 * Chooses a pivot and makes every element that is
 * lower than the pivot move to its left, and every
 * greater element moves to its right
 *
 * @return Number the positon of the pivot
 */
var partition = function (a, comparator, lo, hi) {
  // pick a random element, swap with the rightmost and
  // use it as pivot
  swap(a, Math.floor(Math.random() * (hi - lo)) + lo, hi);
  var pivot = hi;

  // dividerPosition keeps track of the position
  // where the pivot should be inserted
  var dividerPosition = lo;

  for (var i = lo; i < hi; i++) {
    if (comparator.lessThan(a[i], a[pivot])) {
      swap(a, i, dividerPosition);
      dividerPosition++;
    }
  }
  swap(a, dividerPosition, pivot);
  return dividerPosition;
};

/**
 * Swaps two elements in the array
 */
var swap = function (array, x, y) {
  var tmp = array[y];
  array[y] = array[x];
  array[x] = tmp;
};

module.exports = quicksortInit;
