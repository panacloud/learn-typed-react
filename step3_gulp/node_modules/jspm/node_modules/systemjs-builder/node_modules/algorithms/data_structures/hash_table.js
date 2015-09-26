'use strict';

var LinkedList = require('./linked_list');

function HashTable(initialCapacity) {
  this._table = new Array(initialCapacity || 64);
  this._items = 0;

  Object.defineProperty(this, 'capacity', {
    get: function () {
      return this._table.length;
    }
  });

  Object.defineProperty(this, 'size', {
    get: function () {
      return this._items;
    }
  });
}

/**
 * (Same algorithm as Java's String.hashCode)
 * Returns a hash code for this string. The hash code for a String object is
 * computed as: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using int arithmetic, where s[i] is the ith character of the string,
 * n is the length of the string, and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 */
HashTable.prototype.hash = function (s) {
  if (typeof s !== 'string') s = JSON.stringify(s);
  var hash = 0;
  for (var i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash &= hash; // Keep it a 32bit int
  }
  return hash;
};

HashTable.prototype.get = function (key) {
  var i = this._position(key);
  var node;
  if ((node = this._findInList(this._table[i], key))) {
    return node.value.v;
  }
};

HashTable.prototype.put = function (key, value) {
  var i = this._position(key);
  if (!this._table[i]) {
    // Hashing with chaining
    this._table[i] = new LinkedList();
  }
  var item = {k: key, v: value};

  var node = this._findInList(this._table[i], key);
  if (node) {
    // if the key already exists in the list, replace
    // by the current item
    node.value = item;
  } else {
    this._table[i].add(item);
    this._items++;

    if (this._items === this.capacity) this._increaseCapacity();
  }
};

HashTable.prototype.del = function (key) {
  var i = this._position(key);
  var node;

  if ((node = this._findInList(this._table[i], key))) {
    this._table[i].delNode(node);
    this._items--;
  }
};

HashTable.prototype._position = function (key) {
  return Math.abs(this.hash(key)) % this.capacity;
};

HashTable.prototype._findInList = function (list, key) {
  var node = list && list.head;
  while (node) {
    if (node.value.k === key) return node;
    node = node.next;
  }
};

HashTable.prototype._increaseCapacity = function () {
  var oldTable = this._table;
  this._table = new Array(2 * this.capacity);
  this._items = 0;

  for (var i = 0; i < oldTable.length; i++) {
    var node = oldTable[i] && oldTable[i].head;
    while (node) {
      this.put(node.value.k, node.value.v);
      node = node.next;
    }
  }
};

HashTable.prototype.forEach = function (fn) {
  var applyFunction = function (linkedList) {
    linkedList.forEach(function (elem) {
      fn(elem.k, elem.v);
    });
  };

  for (var i = 0; i < this._table.length; i++) {
    if (this._table[i]) {
      applyFunction(this._table[i]);
    }
  }
};

module.exports = HashTable;
