'use strict';

var rabinKarp = require('../../..').String.rabinKarp,
    assert = require('assert');

var rabinKarpEqualsToIndexOf = function (a, b) {
  assert.equal(rabinKarp(a, b), a.indexOf(b));
};

describe('Karp-Rabin', function () {
  it('should verify if a string is contained in another string',
    function () {
      rabinKarpEqualsToIndexOf('', '');
      rabinKarpEqualsToIndexOf('a', 'b');
      rabinKarpEqualsToIndexOf('b', 'a');

      rabinKarpEqualsToIndexOf('super test', 's');
      rabinKarpEqualsToIndexOf('super test', 'super');
      rabinKarpEqualsToIndexOf('super test', 'super test');
      rabinKarpEqualsToIndexOf('super test', 'test');
      rabinKarpEqualsToIndexOf('super test', ' tes');
      rabinKarpEqualsToIndexOf('super test x', 'x');
    });
});
