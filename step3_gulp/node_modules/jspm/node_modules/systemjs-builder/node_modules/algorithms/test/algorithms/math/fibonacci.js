'use strict';

var math = require('../../..').Math,
    fib = math.fibonacci,
    assert = require('assert');

var testFibonacciSequence = function (fib) {
  assert.equal(0, fib(0));
  assert.equal(1, fib(1));
  assert.equal(1, fib(2));
  assert.equal(2, fib(3));
  assert.equal(3, fib(4));
  assert.equal(5, fib(5));
  assert.equal(8, fib(6));
  assert.equal(13, fib(7));
  assert.equal(21, fib(8));
  assert.equal(34, fib(9));
  assert.equal(55, fib(10));
  assert.equal(89, fib(11));
  assert.equal(144, fib(12));
};

describe('Fibonacci', function () {
  describe('#exponential()', function () {
    it('should return the right value for fibonacci sequence', function () {
      testFibonacciSequence(fib.exponential);
    });
  });

  describe('#linear()', function () {
    it('should return the right value for fibonacci sequence', function () {
      testFibonacciSequence(fib);
    });
  });

  describe('#withMemoization()', function () {
    it('should return the right value for fibonacci sequence', function () {
      testFibonacciSequence(fib.withMemoization);
    });
  });

  describe('#direct()', function () {
    it('should return the right value for fibonacci sequence', function () {
      testFibonacciSequence(fib.direct);
    });
  });

  describe('#logarithmic()', function () {
    it('should return the right value for fibonacci sequence', function () {
      testFibonacciSequence(fib.logarithmic);
    });
  });
});

