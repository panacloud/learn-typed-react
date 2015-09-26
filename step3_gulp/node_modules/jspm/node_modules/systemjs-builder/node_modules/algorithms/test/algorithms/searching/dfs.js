'use strict';

var root = require('../../..'),
    BST = root.DataStructures.BST,
    dfs = root.Search.dfs,
    assert = require('assert');

describe('Depth First Search', function () {
  var bst = new BST();
  bst.insert(4);
  bst.insert(8);
  bst.insert(10);
  bst.insert(2);
  bst.insert(1);
  bst.insert(3);
  bst.insert(0);
  bst.insert(5);
  bst.insert(100);

  var callbackGenerator = function (a) {
    return function (n) { a.push(n); };
  };

  it('should return the items sorted when retrieving in order', function () {
    var a = [];
    dfs(bst.root, callbackGenerator(a));
    assert.deepEqual(a, [0, 1, 2, 3, 4, 5, 8, 10, 100]);
  });

  it('should return parents before children when retrieving pre-order',
      function () {
        var a = [];
        dfs.preOrder(bst.root, callbackGenerator(a));
        assert.deepEqual(a, [4, 2, 1, 0, 3, 8, 5, 10, 100]);
      });

  it('should return children before parents when retrieving post-order',
      function () {
        var a = [];
        dfs.postOrder(bst.root, callbackGenerator(a));
        assert.deepEqual(a, [0, 1, 3, 2, 5, 100, 10, 8, 4]);
      });
});
