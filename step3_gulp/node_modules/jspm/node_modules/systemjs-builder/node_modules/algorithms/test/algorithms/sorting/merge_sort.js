'use strict';

var mergeSort = require('../../..').Sorting.mergeSort,
    sortingTestsHelper = require('./sorting_tests_helper');

describe('Merge Sort', function () {
  it('should sort the given array', function () {
    sortingTestsHelper.testSort(mergeSort);
  });

  it('should sort the array with a specific comparison function', function () {
    sortingTestsHelper.testSortWithComparisonFn(mergeSort);
  });
});
