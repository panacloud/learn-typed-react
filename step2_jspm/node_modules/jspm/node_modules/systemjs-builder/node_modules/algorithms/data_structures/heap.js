'use strict';
var Comparator = require('../util/comparator');

/**
 * Basic Heap structure
 */
function MinHeap(compareFn) {
  this._elements = [null];
  this._comparator = new Comparator(compareFn);

  Object.defineProperty(this, 'n', {
    get: function () {
      return this._elements.length - 1;
    }.bind(this)
  });
}

MinHeap.prototype._swap = function (a, b) {
  var tmp = this._elements[a];
  this._elements[a] = this._elements[b];
  this._elements[b] = tmp;
};

MinHeap.prototype.isEmpty = function () {
  return this.n === 0;
};

MinHeap.prototype.insert = function (e) {
  this._elements.push(e);
  this._siftUp();
};

MinHeap.prototype.extract = function () {
  var element = this._elements[1];

  // Get the one from the bottom in insert it on top
  // If this isn't already the last element
  var last = this._elements.pop();
  if (this.n) {
    this._elements[1] = last;
    this._siftDown();
  }

  return element;
};

/**
 * Sift up the last element
 * O(lg n)
 */
MinHeap.prototype._siftUp = function () {
  var i, parent;

  for (i = this.n;
      i > 1 && (parent = i >> 1) && this._comparator.greaterThan(
        this._elements[parent], this._elements[i]);
      i = parent) {
    this._swap(parent, i);
  }
};

/**
 * Sifts down the first element
 * O(lg n)
 */
MinHeap.prototype._siftDown = function (i) {
  var c;
  for (i = i || 1; (c = i << 1) <= this.n; i = c) {
    // checks which is the smaller child to compare with
    if (c + 1 <= this.n && this._comparator.lessThan(
          this._elements[c + 1], this._elements[c]))
      // use the right child if it's lower than the left one
      c++;
    if (this._comparator.lessThan(this._elements[i],
          this._elements[c]))
      break;
    this._swap(i, c);
  }
};

MinHeap.prototype.heapify = function (a) {
  if (a) {
    this._elements = a;
    this._elements.unshift(null);
  }

  for (var i = this.n >> 1; i > 0; i--) {
    this._siftDown(i);
  }
};

MinHeap.prototype.forEach = function (fn) {
  // A copy is necessary in order to perform extract(),
  // get the items in sorted order and then restore the original
  // this._elements array
  var elementsCopy = [];
  var i;

  for (i = 0; i < this._elements.length; i++) {
    elementsCopy.push(this._elements[i]);
  }

  for (i = this.n; i > 0; i--) {
    fn(this.extract());
  }

  this._elements = elementsCopy;
};

/**
 * Max Heap, keeps the highest element always on top
 *
 * To avoid code repetition, the Min Heap is used just with
 * a reverse comparator;
 */
function MaxHeap(compareFn) {

  MinHeap.call(this, compareFn);
  this._comparator.reverse();
}

MaxHeap.prototype = new MinHeap();

module.exports = {
  MinHeap: MinHeap,
  MaxHeap: MaxHeap
};
