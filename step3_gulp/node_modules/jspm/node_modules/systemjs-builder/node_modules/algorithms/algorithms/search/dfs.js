'use strict';

/**
 * Depth first search for trees
 * (in order)
 */
var inOrder = function (node, callback) {
  if (node) {
    inOrder(node.left, callback);
    callback(node.value);
    inOrder(node.right, callback);
  }
};

/**
 * Pre order
 */
var preOrder = function (node, callback) {
  if (node) {
    callback(node.value);
    preOrder(node.left, callback);
    preOrder(node.right, callback);
  }
};

/**
 * Post order
 */
var postOrder = function (node, callback) {
  if (node) {
    postOrder(node.left, callback);
    postOrder(node.right, callback);
    callback(node.value);
  }
};

// Set inOrder as the default implementation
inOrder.preOrder = preOrder;
inOrder.postOrder = postOrder;
module.exports = inOrder;
