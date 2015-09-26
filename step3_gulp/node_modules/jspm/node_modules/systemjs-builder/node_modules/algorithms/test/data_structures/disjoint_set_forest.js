'use strict';

var DisjointSetForest = require('../..').DataStructures.DisjointSetForest,
    assert = require('assert');


describe('Disjoint Set Forest', function () {
  it('should decide if two elements belong to the same subset or not',
     function () {
        var forest = new DisjointSetForest();
        assert(!forest.sameSubset(1, 2));
        forest.merge(1, 2);
        assert(forest.sameSubset(1, 2));
        forest.merge(3, 4);
        assert(!forest.sameSubset(2, 4));
        forest.merge(1, 3);
        assert(forest.sameSubset(1, 2, 3, 4));
        assert(!forest.sameSubset(1, 5));
      });

  it('should maintain subset sizes', function () {
    var forest = new DisjointSetForest();
    var assertSizesCorrect = function (elements, size) {
      elements.forEach(function (element) {
        assert.equal(forest.size(element), size);
      });
    };
    assertSizesCorrect([0, 1, 2, 3, 4], 1);
    forest.merge(0, 1);
    assertSizesCorrect([0, 1], 2);
    forest.merge(0, 2);
    assertSizesCorrect([0, 1, 2], 3);
    forest.merge(2, 1);
    assertSizesCorrect([0, 1, 2], 3);
    forest.merge(3, 4);
    assertSizesCorrect([3, 4], 2);
    forest.merge(0, 4);
    assertSizesCorrect([0, 1, 2, 3, 4], 5);
  });

  it('should point all elements to the same root', function () {
    var forest = new DisjointSetForest();
    var assertSameRoot = function (element) {
      var root = forest.root(element);
      [].slice.call(arguments, 1).forEach(function (element) {
        assert.equal(forest.root(element), root);
      });
    };
    forest.merge(0, 1);
    assertSameRoot(0, 1);
    forest.merge(1, 2);
    assertSameRoot(0, 1, 2);
    forest.merge(1, 3, 4);
    assertSameRoot(0, 1, 2, 3, 4);
    forest.merge(0, 5);
    assertSameRoot(0, 1, 2, 3, 4, 5);
  });

  it('should not choose the root element outside the subset', function () {
    var forest = new DisjointSetForest();
    var assertInside = function (value, set) {
      return set.some(function (element) {
        return element === value;
      });
    };
    assert.equal(forest.root(0), 0);
    forest.merge(0, 1);
    assertInside(forest.root(0), [0, 1]);
    forest.merge(2, 3);
    assertInside(forest.root(2), [2, 3]);
    forest.merge(4, 5, 6);
    assertInside(forest.root(4), [4, 5, 6]);
    forest.merge(0, 1, 2, 5, 6);
    assertInside(forest.root(4), [0, 1, 2, 3, 4, 5, 6]);
  });
});
