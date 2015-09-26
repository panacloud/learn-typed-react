'use strict';

/**
 * Newton's method to calculate square root
 *
 * @param Number n - the number which the square root should be calculated
 * @param Number tolerance - The error margin accepted (Default 1e-7)
 * @param Number maxIterations - The max number of iterations (Default 1e7)
 */
var sqrt = function (n, tolerance, maxIterations) {
  tolerance = tolerance || 1e-7;
  maxIterations = maxIterations || 1e7;

  var upperBound = n;
  var lowerBound = 0;

  var i = 0;
  var square, x;
  do {
    i++;
    x = (upperBound - lowerBound) / 2 + lowerBound;
    square = x * x;
    if (square < n) lowerBound = x;
    else upperBound = x;
  } while (Math.abs(square - n) > tolerance && i < maxIterations);

  // Checks if the number is a perfect square to return the exact root
  var roundX = Math.round(x);
  if (roundX * roundX === n) x = roundX;

  return x;
};

module.exports = sqrt;
