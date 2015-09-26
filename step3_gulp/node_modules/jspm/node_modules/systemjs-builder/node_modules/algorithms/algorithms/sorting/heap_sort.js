'use strict';
var MinHeap = require('../../data_structures/heap').MinHeap;

/**
 * Heap sort first creates a valid heap data structure. Next it
 * iteratively removes the smallest element of the heap until it's
 * empty. The time complexity of the algorithm is O(n.lg n)
 */
var heapsort = function (array, comparatorFn) {

  var minHeap = new MinHeap(comparatorFn);
  minHeap.heapify(array);

  var result = [];
  while (!minHeap.isEmpty())
    result.push(minHeap.extract());

  return result;
};

module.exports = heapsort;
