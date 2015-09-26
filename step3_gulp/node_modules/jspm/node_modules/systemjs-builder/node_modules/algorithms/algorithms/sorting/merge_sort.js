'use strict';
var Comparator = require('../../util/comparator');

/**
 * Merge sort
 * O(n.lgn)
 */
var mergeSortInit = function (a, compareFn) {
  var comparator = new Comparator(compareFn);

  return (function mergeSort(a) {
    if (a.length > 1) {
      var middle = a.length >> 1;
      var left = mergeSort(a.slice(0, middle));
      var right = mergeSort(a.slice(middle));
      a = merge(left, right, comparator);
    }

    return a;
  })(a);
};

var merge = function (a, b, comparator) {
  var i = 0,
      j = 0,
      result = [];

  while (i < a.length && j < b.length) {
    result.push(comparator.lessThan(a[i], b[j]) ? a[i++] : b[j++]);
  }

  // Concats the elements from the sub-array
  // that has not been included yet
  return result.concat((i < a.length ? a.slice(i) : b.slice(j)));
};

module.exports = mergeSortInit;
