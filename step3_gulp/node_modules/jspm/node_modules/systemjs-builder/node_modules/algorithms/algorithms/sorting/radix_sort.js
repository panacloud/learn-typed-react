'use strict';

/**
 * Sorts an array of objects according to their 'key' property
 * Every object inside the array MUST have the 'key' property with
 * a integer value.
 *
 * Asymptotic Complexity: O(array.length * d), where 'd' represents
 * the amount of digits in the larger key of the array
 *
 * @param Array
 * @return Array
 */
var radixSort = function (array) {
  var max = maximumKey(array);
  var digitsMax = (max === 0 ? 1 :
    1 + Math.floor(Math.log(max) / Math.log(10))); // log base 10

  for (var i = 0; i < digitsMax; i++) {
    array = auxiliaryCountingSort(array, i);
  }

  return array;
};

/**
 * Auxiliary sorting method for RadixSort
 * Sorts an array of objects according to only one digit of
 * their 'key' property. The digit to be sorted is determined
 * by the 'mod' variable
 * Every object inside the array MUST have the 'key' property with
 * a integer value.
 *
 * Execution Time: (2 * array.length + 10)
 * Asymptotic Complexity: O(array.length)
 *
 * @param Array
 * @return Array
 */
var auxiliaryCountingSort = function (array, mod) {
  var length = array.length;
  var bucket = [];
  var i;

  for (i = 0; i < 10; i++) {
    bucket[i] = [];
  }

  for (i = 0; i < length; i++) {
    var digit = parseInt((array[i].key / Math.pow(10, mod)).toFixed(mod)) % 10;
    bucket[digit].push(array[i]);
  }

  var pointer = 0;

  for (i = 0; i < 10; i++) {
    var localLength = bucket[i].length;

    for (var j = 0; j < localLength; j++) {
      array[pointer++] = bucket[i][j];
    }
  }

  return array;
};

/**
 * Finds the maximum key from an array of objects
 *
 * Asymptotic Complexity: O(array.length)
 *
 * @param Array
 * @return Integer if array non-empty
 *         Undefined otherwise
 */
var maximumKey = function (a) {
  var max;
  for (var i = 1; i < a.length; i++) {
    if (max === undefined || a[i].key > max) {
      max = a[i].key;
    }
  }
  return max;
};

module.exports = radixSort;
