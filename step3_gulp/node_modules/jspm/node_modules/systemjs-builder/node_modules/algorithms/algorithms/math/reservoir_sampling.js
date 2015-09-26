'use strict';


/**
 * Sample random elements from the array using reservoir algorithm.
 *
 * @param {Array} array
 * @param {number} sampleSize
 * @return {Array}
 */
var reservoirSampling = function (array, sampleSize) {
  if (sampleSize > array.length) {
    throw new Error('Sample size exceeds the total number of elements.');
  }
  var reservoir = array.slice(0, sampleSize);
  for (var i = sampleSize; i < array.length; ++i) {
    var j = Math.floor(Math.random() * (i + 1));
    if (j < sampleSize) {
      reservoir[j] = array[i];
    }
  }
  return reservoir;
};


module.exports = reservoirSampling;
