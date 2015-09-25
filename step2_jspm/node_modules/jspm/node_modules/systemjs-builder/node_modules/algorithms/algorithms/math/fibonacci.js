'use strict';

/**
 * Different implementations of the Fibonacci sequence
 */

var power = require('./fast_power');

/**
  * Regular fibonacci implementation following the definition:
  * Fib(0) = 0
  * Fib(1) = 1
  * Fib(n) = Fib(n-1) + Fib(n-2)
  *
  * @param Number
  * @return Number
  */
var fibExponential = function (n) {
  return n < 2 ? n : fibExponential(n - 1) + fibExponential(n - 2);
};

/**
  * O(n) in time, O(1) in space and doesn't use recursion
  *
  * @param Number
  * @return Number
  */
var fibLinear = function (n) {
  var fibNMinus2 = 0,
      fibNMinus1 = 1,
      fib = n;
  for (var i = 1; i < n; i++) {
    fib = fibNMinus1 + fibNMinus2;
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fib;
  }
  return fib;
};

/**
  * Implementation with memoization, O(n) in time, O(n) in space
  *
  * @param Number
  * @return Number
  */
var fibWithMemoization = (function () {
  var cache = [0, 1];

  var fib = function (n) {
    if (cache[n] === undefined) {
      cache[n] = fib(n - 1) + fib(n - 2);
    }
    return cache[n];
  };

  return fib;
})();

/**
  * Implementation using Binet's formula with the rounding trick.
  * O(1) in time, O(1) in space
  *
  * @param Number
  * @return Number
  */
var fibDirect = function (number) {
  var phi = (1 + Math.sqrt(5)) / 2;
  return Math.floor(Math.pow(phi, number) / Math.sqrt(5) + 0.5);
};

/**
  * Implementation based on matrix exponentiation.
  * O(log(n)) in time, O(1) in space
  *
  * @param Number
  * @return Number
  */
var fibLogarithmic = function (number) {
  // Transforms [f_1, f_0] to [f_2, f_1] and so on.
  var nextFib = [[1, 1], [1, 0]];

  var matrixMultiply = function (a, b) {
    return [[a[0][0] * b[0][0] + a[0][1] * b[1][0],
             a[0][0] * b[0][1] + a[0][1] * b[1][1]],
            [a[1][0] * b[0][0] + a[1][1] * b[1][0],
             a[1][0] * b[0][1] + a[1][1] * b[1][1]]];
  };

  var transform = power(nextFib, number, matrixMultiply, [[1, 0], [0, 1]]);

  // [f_n, f_{n-1}] = Transform * [f_0, f_{-1}] = Transform * [0, 1]
  // Hence the result is the first row of Transform multiplied by [0, 1],
  // which is the same as transform[0][1].
  return transform[0][1];
};

// Use fibLinear as the default implementation
fibLinear.exponential = fibExponential;
fibLinear.withMemoization = fibWithMemoization;
fibLinear.direct = fibDirect;
fibLinear.logarithmic = fibLogarithmic;
module.exports = fibLinear;
