'use strict';

var math = require('../../..').Math,
    fisherYates = math.fisherYates,
    assert = require('assert');

describe('Fisher-Yates', function () {
  it('should shuffle the elements in the array in-place', function () {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    fisherYates(a);
    assert.notDeepEqual(a, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  describe('should be able to be used as Array.suffle', function () {
    var a = [1, 2, 3, 4, 5];
    assert.equal(a.shuffle, undefined);
    /* eslint-disable no-extend-native */
    Array.prototype.shuffle = function () {
      fisherYates(this);
    };
    /* eslint-enable no-extend-native */
    a.shuffle();
    assert.notDeepEqual(a, [1, 2, 3, 4, 5]);
  });
});

