'use strict';

var radixSort = require('../../..').Sorting.radixSort,
    assert = require('assert');

var firstObject = {
  someProperty: 'The',
  key: 88541234132
};

var secondObject = {
  someProperty: 'winter',
  key: 90071992540992
};

var thirdObject = {
  someProperty: 'is',
  key: 0
};

var fourthObject = {
  someProperty: 'coming',
  key: 65234567,
  anotherProperty: '!'
};

describe('Radix Sort', function () {
  it('should sort the given array', function () {
    var sorted = radixSort([
      thirdObject,
      fourthObject,
      firstObject,
      secondObject,
      secondObject,
      firstObject,
      firstObject,
      fourthObject
    ]);

    // Asserts that the array is truly sorted
    assert.deepEqual(sorted, [
      thirdObject,
      fourthObject,
      fourthObject,
      firstObject,
      firstObject,
      firstObject,
      secondObject,
      secondObject
    ]);

    assert.deepEqual(radixSort([thirdObject, thirdObject]), [
        thirdObject,
        thirdObject
      ]);
  });
});
