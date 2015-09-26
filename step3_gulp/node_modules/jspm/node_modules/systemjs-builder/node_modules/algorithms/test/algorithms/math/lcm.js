'use strict';

var root = require('../../..'),
    lcm = root.Math.lcm,
    assert = require('assert');

describe('LCM', function () {
  it('should calculate the correct LCM between two numbers ' +
    'using Euclidean algorithm', function () {
      assert.equal(lcm(2, 3), 6);
      assert.equal(lcm(0, 1), 0);
      assert.equal(lcm(4, 9), 36);
      assert.equal(lcm(39, 81), 1053);
      assert.equal(lcm(10000000, 2), 10000000);
      assert.equal(lcm(35, 49), 245);
      assert.equal(lcm(7, 49), 49);
      assert.equal(lcm(7, 5), 35);
      assert.equal(lcm(0, 0), 0);
      assert.equal(lcm(0, 9), 0);
      assert.equal(lcm(0, -9), 0);
      assert.equal(lcm(-9, -18), 18);
      assert.equal(lcm(-7, 9), 63);
      assert.equal(lcm(-7, -9), 63);
    });

  it('should calculate the correct LCM between two numbers ' +
    'using the binary method', function () {
      var lcmb = lcm.binary;
      assert.equal(lcmb(2, 3), 6);
      assert.equal(lcmb(0, 1), 0);
      assert.equal(lcmb(4, 9), 36);
      assert.equal(lcmb(39, 81), 1053);
      assert.equal(lcmb(10000000, 2), 10000000);
      assert.equal(lcmb(35, 49), 245);
      assert.equal(lcmb(7, 49), 49);
      assert.equal(lcmb(7, 5), 35);
      assert.equal(lcmb(0, 0), 0);
      assert.equal(lcmb(0, 9), 0);
      assert.equal(lcmb(0, -9), 0);
      assert.equal(lcmb(-9, -18), 18);
      assert.equal(lcmb(-7, 9), 63);
      assert.equal(lcmb(-7, -9), 63);
    });
});
