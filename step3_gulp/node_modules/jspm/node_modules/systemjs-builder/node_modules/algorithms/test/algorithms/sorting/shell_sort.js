'use strict';

var shellSort = require('../../..').Sorting.shellSort,
    sortingTestsHelper = require('./sorting_tests_helper.js');

describe('ShellSort', function () {
  it('should sort the given array', function () {
    sortingTestsHelper.testSort(shellSort);
  });

  it('should sort the array with a specific comparison function', function () {
    sortingTestsHelper.testSortWithComparisonFn(shellSort);
  });
});


