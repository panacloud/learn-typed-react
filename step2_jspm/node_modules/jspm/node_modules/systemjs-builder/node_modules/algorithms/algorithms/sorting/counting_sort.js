'use strict';

/**
 * Sorts an array of objects according to their 'key' property
 * Every object inside the array MUST have the 'key' property with
 * a integer value.
 *
 * Execution Time: (3 * array.length - 1)
 * Asymptotic Complexity: O(array.length + maximumKey)
 *
 * @param Array
 * @return Array
 */
var countingSort = function (array) {
  var max = maximumKey(array);
  var auxiliaryArray = [];
  var length = array.length;
  var i;

  for (i = 0; i < length; i++) {
    var position = array[i].key;

    if (auxiliaryArray[position] === undefined) {
      auxiliaryArray[position] = [];
    }

    auxiliaryArray[position].push(array[i]);
  }

  array = [];
  var pointer = 0;

  for (i = 0; i <= max; i++) {
    if (auxiliaryArray[i] !== undefined) {
      var localLength = auxiliaryArray[i].length;

      for (var j = 0; j < localLength; j++) {
        array[pointer++] = auxiliaryArray[i][j];
      }
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
 * @return Integer
 */
var maximumKey = function (array) {
  var max = array[0].key;
  var length = array.length;

  for (var i = 1; i < length; i++) {
    if (array[i].key > max) {
      max = array[i].key;
    }
  }

  return max;
};

module.exports = countingSort;
