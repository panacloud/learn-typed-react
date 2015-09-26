'use strict';

var MinHeap = require('./heap').MinHeap;

/**
 * Extends the MinHeap with the only difference that
 * the heap operations are performed based on the priority of the element
 * and not on the element itself
 */
function PriorityQueue(initialItems) {

  var self = this;
  MinHeap.call(this, function (a, b) {
    return self.priority(a) < self.priority(b) ? -1 : 1;
  });

  this._priority = {};

  initialItems = initialItems || {};
  Object.keys(initialItems).forEach(function (item) {
    self.insert(item, initialItems[item]);
  });
}

PriorityQueue.prototype = new MinHeap();

PriorityQueue.prototype.insert = function (item, priority) {
  if (this._priority[item] !== undefined) {
    return this.changePriority(item, priority);
  }
  this._priority[item] = priority;
  MinHeap.prototype.insert.call(this, item);
};

PriorityQueue.prototype.extract = function (withPriority) {
  var min = MinHeap.prototype.extract.call(this);
  return withPriority ?
    min && {item: min, priority: this._priority[min]} :
    min;
};

PriorityQueue.prototype.priority = function (item) {
  return this._priority[item];
};

PriorityQueue.prototype.changePriority = function (item, priority) {
  this._priority[item] = priority;
  this.heapify();
};

module.exports = PriorityQueue;
