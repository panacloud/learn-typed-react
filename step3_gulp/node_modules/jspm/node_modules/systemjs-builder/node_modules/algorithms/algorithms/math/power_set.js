/**
 * Iterative and recursive implementations of power set
 */

'use strict';

/**
 * Iterative power set calculation
 */
var powerSetIterative = function (array) {

  if (array.length === 0) {
    return [];
  }

  var powerSet = [];
  var cache = [];
  var i;

  for (i = 0; i < array.length; i++) {
    cache[i] = true;
  }

  for (i = 0; i < Math.pow(2, array.length); i++) {

    powerSet.push([]);

    for (var j = 0; j < array.length; j++) {

      if (i % Math.pow(2, j) === 0) {
        cache[j] = !cache[j];
      }

      if (cache[j]) {
        powerSet[i].push(array[j]);
      }

    }
  }

  return powerSet;
};

/**
 * Recursive power set calculation
 */
var powerSetRecursive = function (array) {
  if (array.length === 0) {
    return [];
  } else if (array.length === 1) {
    return [ [], [ array[0] ] ];
  } else {
    var powerSet = [];
    var firstElem = array[0];

    array.splice(0, 1);

    powerSetRecursive(array).forEach(function (elem) {
      powerSet.push(elem);
      var withFirstElem = [ firstElem ];
      withFirstElem.push.apply(withFirstElem, elem);
      powerSet.push(withFirstElem);
    });

    return powerSet;
  }
};

// Use powerSetIterative as the default implementation
var powerSet = powerSetIterative;
powerSet.recursive = powerSetRecursive;
module.exports = powerSet;
