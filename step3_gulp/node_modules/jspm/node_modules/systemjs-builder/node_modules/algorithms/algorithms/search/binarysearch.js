'use strict';

/**
  * Binary Search finds elements in sorted arrays in logarithmic
  * time (O(lg n))
  *
  * @param Array
  * @param Number|String
  *
  * @return Boolean
  */
var binarySearch = function (sortedArray, element) {
  var init = 0,
      end = sortedArray.length - 1;

  while (end >= init) {
    var m = ((end - init) >> 1) + init;
    if (sortedArray[m] === element) return m;

    if (sortedArray[m] < element) init = m + 1;
    else end = m - 1;
  }

  return -1;
};

module.exports = binarySearch;
