'use strict';

var bubbleSort = require('../../..').Sorting.bubbleSort,
    sortingTestsHelper = require('./sorting_tests_helper');

describe('Bubble Sort', function () {
  it('should sort the given array', function () {
    sortingTestsHelper.testSort(bubbleSort);
  });

  it('should sort the array with a specific comparison function', function () {
    sortingTestsHelper.testSortWithComparisonFn(bubbleSort);
  });
});
