'use strict';

var Queue = require('./queue');

/**
 * Stack (LIFO) using a Linked List as basis
 */
function Stack() {
  Queue.call(this);
}

/**
 * Use a Queue as prototype and just overwrite
 * the push method to insert at the 0 position
 * instead of the end of the queue
 */
Stack.prototype = new Queue();

/**
 * Adds element to the top of the stack
 */
Stack.prototype.push = function (e) {
  this._elements.add(e, 0);
};

module.exports = Stack;
