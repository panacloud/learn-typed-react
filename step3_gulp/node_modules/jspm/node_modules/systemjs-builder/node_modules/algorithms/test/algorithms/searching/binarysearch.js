'use strict';

var binarySearch = require('../../..').Search.binarySearch,
    assert = require('assert');

describe('Binary Search', function () {
  it('should find elements in the sorted array', function () {
    assert.equal(binarySearch([1, 2, 3, 4, 5], 3), 2);
    assert.equal(binarySearch([1, 2, 3, 4, 5], 1), 0);
    assert.equal(binarySearch([1, 2, 3, 4, 5], 2), 1);
    assert.equal(binarySearch([1, 2, 3, 4, 5], 4), 3);
    assert.equal(binarySearch([1, 2, 3, 4, 5], 5), 4);
    assert.equal(binarySearch([1, 2, 3, 4, 5], 0), -1);
    assert.equal(binarySearch([1, 2, 3, 4, 5, 8], 6), -1);
    assert.equal(binarySearch([1, 2, 3, 4, 5], 100), -1);
  });
});


