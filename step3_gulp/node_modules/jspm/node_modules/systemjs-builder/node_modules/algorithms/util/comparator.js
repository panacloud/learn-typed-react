'use strict';

/**
 * Initialize the comparator object with a compare function
 *
 * If the function is not passed, it will use the default
 * compare signs (<, > and ==)
 *
 * @param { Function } compareFn
 */
function Comparator(compareFn) {
  if (compareFn) {
    this.compare = compareFn;
  }
}

/**
 * Default implementation for the compare function
 */
Comparator.prototype.compare = function (a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};

Comparator.prototype.lessThan = function (a, b) {
  return this.compare(a, b) < 0;
};

Comparator.prototype.lessThanOrEqual = function (a, b) {
  return this.lessThan(a, b) || this.equal(a, b);
};

Comparator.prototype.greaterThan = function (a, b) {
  return this.compare(a, b) > 0;
};

Comparator.prototype.greaterThanOrEqual = function (a, b) {
  return this.greaterThan(a, b) || this.equal(a, b);
};

Comparator.prototype.equal = function (a, b) {
  return this.compare(a, b) === 0;
};

/**
 * Reverse the comparison function to use the opposite logic, e.g:
 * this.compare(a, b) => 1
 * this.reverse();
 * this.compare(a, b) => -1
 */
Comparator.prototype.reverse = function () {
  var originalCompareFn = this.compare;
  this.compare = function (a, b) {
    return originalCompareFn(b, a);
  };
};

module.exports = Comparator;
