'use strict';

var FenwickTree = require('../..').DataStructures.FenwickTree,
    assert = require('assert');

describe('FenwickTree', function () {
  it('should allow prefix queries', function () {
    var tree = new FenwickTree(10);
    tree.adjust(5, 42);
    tree.adjust(7, 43);
    tree.adjust(9, 44);


    assert.equal(tree.prefixSum(0), 0);
    assert.equal(tree.prefixSum(1), 0);
    assert.equal(tree.prefixSum(2), 0);
    assert.equal(tree.prefixSum(3), 0);
    assert.equal(tree.prefixSum(4), 0);
    assert.equal(tree.prefixSum(5), 42);
    assert.equal(tree.prefixSum(6), 42);
    assert.equal(tree.prefixSum(7), 42 + 43);
    assert.equal(tree.prefixSum(8), 42 + 43);
    assert.equal(tree.prefixSum(9), 42 + 43 + 44);
    assert.equal(tree.prefixSum(10), 42 + 43 + 44);
  });

  it('should allow range queries', function () {
    var tree = new FenwickTree(10);
    tree.adjust(5, 42);
    tree.adjust(7, 43);
    tree.adjust(9, 44);


    assert.equal(tree.rangeSum(6, 10), 43 + 44);
    assert.equal(tree.rangeSum(5, 7), 42 + 43);
  });
});
