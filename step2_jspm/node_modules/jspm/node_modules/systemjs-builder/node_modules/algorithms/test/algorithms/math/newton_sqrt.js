'use strict';

var math = require('../../..').Math,
    newtonSqrt = math.newtonSqrt,
    assert = require('assert');

describe('Newton square root', function () {
  it('should calculate the exact root of square numbers', function () {
    assert.strictEqual(newtonSqrt(0), 0);
    assert.strictEqual(newtonSqrt(1), 1);
    assert.strictEqual(newtonSqrt(4), 2);
    assert.strictEqual(newtonSqrt(9), 3);
    assert.strictEqual(newtonSqrt(16), 4);
    assert.strictEqual(newtonSqrt(25), 5);
    assert.strictEqual(newtonSqrt(36), 6);
    assert.strictEqual(newtonSqrt(49), 7);
    assert.strictEqual(newtonSqrt(64), 8);
    assert.strictEqual(newtonSqrt(81), 9);
    assert.strictEqual(newtonSqrt(100), 10);
  });

  it('should calculate an approximated root for every number',
    function () {
      for (var i = 0; i < 1000; i++) {
        var newton = newtonSqrt(i);
        var nativeJS = Math.sqrt(i);
        var difference = Math.abs(newton - nativeJS);
        assert(difference < 1e-6,
          'Square root of ' + i + ' should be ' + nativeJS +
          ' but got ' + newton + ' instead');
      }
    });

});
