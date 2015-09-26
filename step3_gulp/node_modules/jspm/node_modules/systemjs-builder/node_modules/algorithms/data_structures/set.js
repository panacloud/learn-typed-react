'use strict';

var HashTable = require('./hash_table');

/**
 * Typical representation of a mathematical set
 * No restriction on element types
 *   i.e. set.add(1,'a', "b", { "foo" : "bar" })
 */
var HashSet = function () {
  this._elements = new HashTable(arguments.length);
  this.add.apply(this, arguments);

  Object.defineProperty(this, 'size', {
    get: function () {
      return this._elements.size;
    }
  });
};

HashSet.prototype.add = function () {
  for (var i = 0; i < arguments.length; i++) {
    this._elements.put(arguments[i], true);
  }
  return this;
};

HashSet.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i++) {
    this._elements.del(arguments[i]);
  }
  return this;
};

HashSet.prototype.contains = function (e) {
  return this._elements.get(e) !== undefined;
};

HashSet.prototype.forEach = function (fn) {
  this._elements.forEach(fn);
};

module.exports = HashSet;
