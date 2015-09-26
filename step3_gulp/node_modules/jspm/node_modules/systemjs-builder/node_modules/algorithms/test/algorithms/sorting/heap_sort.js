'use strict';

var heapSort = require('../../..').Sorting.heapSort,
    sortingTestsHelper = require('./sorting_tests_helper');

describe('Heap Sort', function () {
  it('should sort the given array', function () {
    sortingTestsHelper.testSort(heapSort);
  });

  it('should sort the array with a specific comparison function', function () {
    sortingTestsHelper.testSortWithComparisonFn(heapSort);
  });
});
