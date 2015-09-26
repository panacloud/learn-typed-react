'use strict';

var math = require('../../..').Math,
    power = math.fastPower,
    assert = require('assert');


var assertApproximatelyEqual = function (a, b, eps) {
  eps = eps || 1e-12;
  assert(Math.abs(a - b) < eps);
};


var multiplyModulo = function (modulo) {
  return function (a, b) {
    return (a * b) % modulo;
  };
};


/**
 * This operation is isomorphic to addition in Z/3.
 *
 *   | a | b | c |
 * ---------------
 * a | a | b | c |
 * b | b | c | a |
 * c | c | a | b |
 * ---------------
 */
var abcMultiply = function (a, b) {
  var table = {
    a: {a: 'a', b: 'b', c: 'c'},
    b: {a: 'b', b: 'c', c: 'a'},
    c: {a: 'c', b: 'a', c: 'b'}
  };
  assert(table[a] && table[b]);
  return table[a][b];
};


describe('Fast Power', function () {
  it('should correctly raise numbers to positive integer powers', function () {
    assert.equal(power(2, 5), 32);
    assert.equal(power(32, 1), 32);
    assert.equal(power(3, 7), Math.pow(3, 7));
    assert.equal(power(4, 5), 1024);
    assertApproximatelyEqual(power(Math.PI, 100), Math.pow(Math.PI, 100));
    assert.equal(power(-5, 2), 25);
    assert.equal(power(-5, 3), -125);
    assert.equal(power(1, 10000), 1);
  });

  it('should raise an error if the power is not a nonnegative integer',
     function () {
        // It is not clear how to handle these cases
        // when custom multiplication is also supplied.
        assert.throws(power.bind(null, 7, -2));
        assert.throws(power.bind(null, 5, -1));
        assert.throws(power.bind(null, Math.PI, Math.E));
      });

  it('should accept custom multiplication functions', function () {
    // Math.pow is basically useless here.

    assert.equal(power(0, 0, multiplyModulo(5), 1), 1);
    assert.equal(power(2, 9, multiplyModulo(10)), 2);
    assert.equal(power(31, 100, multiplyModulo(17)), 13);
    assert.equal(power(5, 87654, multiplyModulo(100)), 25);
    assert.equal(power(12, 12, multiplyModulo(15)), 6);

    assert.equal(power('a', 0, abcMultiply, 'a'), 'a');
    assert.equal(power('c', 2, abcMultiply, 'a'), 'b');
    assert.equal(power('a', 0xaaaa, abcMultiply), 'a');
    assert.equal(power('b', 0xbbbb, abcMultiply), 'c');
    assert.equal(power('c', 0xcccc, abcMultiply), 'a');
  });

  it('should raise an error if the power is zero but no identity value given' +
     ' (custom multiplication)', function () {
        assert.throws(power.bind(null, 0, 0, multiplyModulo(5)));
        assert.throws(power.bind(null, 'a', 0, abcMultiply));
      });
});
