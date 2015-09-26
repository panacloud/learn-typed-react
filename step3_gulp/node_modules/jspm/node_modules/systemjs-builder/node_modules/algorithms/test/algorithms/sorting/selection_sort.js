'use strict';

var selectionSort = require('../../..').Sorting.selectionSort,
    sortingTestsHelper = require('./sorting_tests_helper');

describe('Selection Sort', function () {
  it('should sort the given array', function () {
    sortingTestsHelper.testSort(selectionSort);
  });

  it('should sort the array with a specific comparison function', function () {
    sortingTestsHelper.testSortWithComparisonFn(selectionSort);
  });
});
