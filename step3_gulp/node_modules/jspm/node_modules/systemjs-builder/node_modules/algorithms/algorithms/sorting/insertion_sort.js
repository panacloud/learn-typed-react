'use strict';
var Comparator = require('../../util/comparator');

/**
 * Insertion sort algorithm O(n + d)
 */
var insertionSort = function (vector, comparatorFn) {
  var comparator = new Comparator(comparatorFn);

  for (var i = 1, len = vector.length; i < len; i++) {
    var aux = vector[i],
      j = i;

    while (j > 0 && comparator.lessThan(aux, vector[j - 1])) {
      vector[j] = vector[j - 1];
      j--;
    }

    vector[j] = aux;
  }

  return vector;
};

module.exports = insertionSort;
