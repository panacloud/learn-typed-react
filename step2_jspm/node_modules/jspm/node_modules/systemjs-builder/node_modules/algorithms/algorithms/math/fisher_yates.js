'use strict';

/**
 * Fisher-Yates shuffles the elements in an array
 * in O(n)
 */
var fisherYates = function (a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
};

module.exports = fisherYates;
