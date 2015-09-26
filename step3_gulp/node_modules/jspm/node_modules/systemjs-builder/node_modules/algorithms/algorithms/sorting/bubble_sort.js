'use strict';
var Comparator = require('../../util/comparator');

/**
 * Bubble sort algorithm O(n^2)
 */
var bubbleSort = function (a, comparatorFn) {
  var comparator = new Comparator(comparatorFn);
  var n = a.length;
  var bound = n - 1;
  var check = false;
  for (var i = 0; i < n - 1; i++) {
    var newbound = 0;
    for (var j = 0; j < bound; j++) {
      if (comparator.greaterThan(a[j], a[j + 1])) {
        var tmp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = tmp;
        newbound = j;
        check = true;
      }
    }
    if (!check)
      return a;
    bound = newbound;
  }
  return a;
};

module.exports = bubbleSort;
