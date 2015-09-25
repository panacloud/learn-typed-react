'use strict';

var countingSort = require('../../..').Sorting.countingSort,
    assert = require('assert');

var firstObject = {
  someProperty: 'The',
  key: 12
};

var secondObject = {
  someProperty: 'chosen',
  key: 66
};

var thirdObject = {
  someProperty: 'one!',
  key: 43
};

var array = [
  thirdObject,
  firstObject,
  secondObject,
  secondObject,
  firstObject,
  firstObject
];

describe('Counting Sort', function () {
  it('should sort the given array', function () {
    array = countingSort(array);

    // Asserts that the array is truly sorted
    assert.deepEqual(array.indexOf(firstObject), 0);
    assert.deepEqual(array.indexOf(secondObject), 4);
    assert.deepEqual(array.indexOf(thirdObject), 3);
    assert.deepEqual(array.indexOf({key: 99}), -1);
  });
});
