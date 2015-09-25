'use strict';

var hamming = require('../../..').String.hamming,
    assert = require('assert');


describe('Hamming distance', function () {
  it('should raise an error if the inputs are not equal lengths', function () {
    assert.throws(function () {
      hamming('abcde', '1234');
    });
  });

  it('should return the correct the correct distances', function () {
    var inputs = [
      { a: 'karolin', b: 'kathrin', expected: 3 },
      { a: 'karolin', b: 'kerstin', expected: 3 },
      { a: '1011101', b: '1001001', expected: 2 },
      { a: '2173896', b: '2233796', expected: 3 },
      { a: '1111111111', b: '0000000000', expected: 10 },
      { a: '', b: '', expected: 0}
    ];

    inputs.forEach(function (val) {
      assert.equal(hamming(val.a, val.b), val.expected);
    });
  });

});
