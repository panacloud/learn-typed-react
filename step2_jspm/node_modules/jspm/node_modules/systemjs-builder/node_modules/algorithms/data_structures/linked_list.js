'use strict';

/**
 * Doubly-linked list
 */
function LinkedList() {

  this._length = 0;
  this.head = null;
  this.tail = null;

  // Read-only length property
  Object.defineProperty(this, 'length', {
    get: function () {
      return this._length;
    }.bind(this)
  });
}

/**
 * A linked list node
 */
function Node(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

/**
 * Whether the list is empty
 *
 * @return Boolean
 */
LinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};

/**
 * Adds the element to the end of the list or to the desired index
 *
 * @param { Object } n
 * @param { Number } index
 */
LinkedList.prototype.add = function (n, index) {
  if (index > this.length || index < 0) {
    throw new Error('Index out of bounds');
  }

  var node = new Node(n);

  if (index !== undefined && index < this.length) {
    var prevNode,
        nextNode;

    if (index === 0) {
      // Insert in the beginning
      nextNode = this.head;
      this.head = node;
    } else {
      nextNode = this.getNode(index);
      prevNode = nextNode.prev;
      prevNode.next = node;
      node.prev = prevNode;
    }
    nextNode.prev = node;
    node.next = nextNode;
  } else {
    // Insert at the end
    if (!this.head) this.head = node;

    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
  }

  this._length++;
};

/**
 * Return the value associated to the Node on the given index
 *
 * @param { Number } index
 * @return misc
 */
LinkedList.prototype.get = function (index) {
  return this.getNode(index).value;
};

/**
 * O(n) get
 *
 * @param { Number } index
 * @return Node
 */
LinkedList.prototype.getNode = function (index) {
  if (index >= this.length || index < 0) {
    throw new Error('Index out of bounds');
  }

  var node = this.head;
  for (var i = 1; i <= index; i++) {
    node = node.next;
  }

  return node;
};

/**
 * Delete the element in the indexth position
 *
 * @param { Number } index
 */
LinkedList.prototype.del = function (index) {
  if (index >= this.length || index < 0) {
    throw new Error('Index out of bounds');
  }

  this.delNode(this.getNode(index));
};

LinkedList.prototype.delNode = function (node) {
  if (node === this.tail) {
    // node is the last element
    this.tail = node.prev;
  } else {
    node.next.prev = node.prev;
  }
  if (node === this.head) {
    // node is the first element
    this.head = node.next;
  } else {
    node.prev.next = node.next;
  }

  this._length--;
};

/**
 * Performs the fn function with each element in the list
 */
LinkedList.prototype.forEach = function (fn) {
  var node = this.head;
  while (node) {
    fn(node.value);
    node = node.next;
  }
};

module.exports = LinkedList;
