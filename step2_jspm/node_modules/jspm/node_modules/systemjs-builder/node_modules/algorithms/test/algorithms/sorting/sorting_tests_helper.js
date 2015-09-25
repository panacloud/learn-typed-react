'use strict';

var assert = require('assert');

module.exports = {
  testSort: function (sortFn) {
    assert.deepEqual(sortFn([]), []);
    assert.deepEqual(sortFn([1]), [1]);
    assert.deepEqual(sortFn([2, 1]), [1, 2]);
    assert.deepEqual(sortFn([3, 1, 2]), [1, 2, 3]);
    assert.deepEqual(sortFn([1, 2, 3, 4, 5, 6]), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(sortFn([6, 5, 4, 3, 2, 1]), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(sortFn([1, 295, 3, 6, 8, 10, 10, 20, 0, 5]),
      [0, 1, 3, 5, 6, 8, 10, 10, 20, 295]);
    assert.deepEqual(sortFn(['a', 'b', 'abc']), ['a', 'abc', 'b']);
  },

  testSortWithComparisonFn: function (sortFn) {
    var compare = function (a, b) {
      if (a.length === b.length) return 0;
      return a.length < b.length ? -1 : 1;
    };
    assert.deepEqual(sortFn([], compare), []);
    assert.deepEqual(sortFn(['apple'], compare), ['apple']);
    assert.deepEqual(sortFn(['apple', 'banana'], compare),
      ['apple', 'banana']);
    assert.deepEqual(sortFn(['apple', 'banana', 'car'], compare),
      ['car', 'apple', 'banana']);
    assert.deepEqual(sortFn(['apple', 'banana', 'car', 'z'], compare),
      ['z', 'car', 'apple', 'banana']);

    var reverseSort = function (a, b) {
      if (a === b) return 0;
      return a < b ? 1 : -1;
    };
    assert.deepEqual(sortFn([1, 295, 3, 6, 8, 10, 10, 20, 0, 5],
        reverseSort),
      [295, 20, 10, 10, 8, 6, 5, 3, 1, 0]);
  }
};


