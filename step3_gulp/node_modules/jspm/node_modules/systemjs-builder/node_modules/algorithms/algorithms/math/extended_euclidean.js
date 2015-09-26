'use strict';

/**
 * Extended Euclidean algorithm to calculate the solve of
 *   ax + by = gcd(a, b)
 * gcd(a, b) is the greatest common divisor of integers a and b.
 *
 * @param Number
 * @param Number
 *
 * @return {Number, Number}
 */
var extEuclid = function (a, b) {
  var s = 0, oldS = 1;
  var t = 1, oldT = 0;
  var r = b, oldR = a;
  var quotient, temp;
  while (r !== 0) {
    quotient = Math.floor(oldR / r);

    temp = r;
    r = oldR - quotient * r;
    oldR = temp;

    temp = s;
    s = oldS - quotient * s;
    oldS = temp;

    temp = t;
    t = oldT - quotient * t;
    oldT = temp;
  }

  return {
    x: oldS,
    y: oldT
  };
};

module.exports = extEuclid;
