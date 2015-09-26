'use strict';
var Comparator = require('../../util/comparator');
/**
 * shell sort  worst:O(n lg n)  best:O(n)
 */
var shellSort = function (array, comparatorFn) {
  var comparator = new Comparator(comparatorFn),
    begin = 0,
    end = array.length - 1,
    gap = parseInt((end - begin + 1) / 2),
    i = 0, j = 0, temp = 0;

  while (gap >= 1) {
    for (i = begin + gap;i <= end;i += 1) {
      temp = array[i];
      j = i - gap;
      while (j >= begin && comparator.greaterThan(array[j], temp)) {
        array[j + gap] = array[j];
        j = j - gap;
      }
      array[j + gap] = temp;
    }
    gap = parseInt(gap / 2);
  }

  return array;
};

module.exports = shellSort;
