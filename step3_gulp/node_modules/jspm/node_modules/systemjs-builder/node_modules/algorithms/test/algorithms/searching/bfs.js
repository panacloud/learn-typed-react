'use strict';

var root = require('../../..'),
    BST = root.DataStructures.BST,
    bfs = root.Search.bfs,
    assert = require('assert');

describe('Breadth First Search', function () {

  var bst = new BST();
  /**
   *            4
   *       2          8
   *    1     3    5     10
   *  0    2.5               100
   */
  bst.insert(4);
  bst.insert(8);
  bst.insert(10);
  bst.insert(2);
  bst.insert(1);
  bst.insert(3);
  bst.insert(0);
  bst.insert(5);
  bst.insert(100);
  bst.insert(2.5);

  var callbackGenerator = function (a) {
    return function (n) { a.push(n); };
  };

  it('should return the items by level', function () {
    var a = [];
    bfs(bst.root, callbackGenerator(a));
    assert.deepEqual(a, [4, 2, 8, 1, 3, 5, 10, 0, 2.5, 100]);
  });
});
