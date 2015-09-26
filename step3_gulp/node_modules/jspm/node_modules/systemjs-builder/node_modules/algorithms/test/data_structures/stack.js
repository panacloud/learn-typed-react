'use strict';

var Stack = require('../..').DataStructures.Stack,
    assert = require('assert');

describe('Stack', function () {
  it('should start empty', function () {
    var s = new Stack();
    assert(s.isEmpty());
    assert.equal(s.length, 0);
  });

  it('should implement a LIFO logic', function () {
    var s = new Stack();
    s.push(1);
    s.push(2);
    s.push(3);
    assert.equal(s.length, 3);
    assert.equal(s.pop(), 3);
    assert.equal(s.pop(), 2);
    assert.equal(s.pop(), 1);
    assert(s.isEmpty());
    assert.throws(function () { s.pop(); }, Error);
  });

  it('should allow me to peek at the top element in' +
    ' the stack without popping it', function () {
      var s = new Stack();
      s.push(1);
      s.push(2);
      s.push(3);
      assert.equal(s.peek(), 3);
      assert.equal(s.peek(), 3);
      s.pop();
      assert.equal(s.peek(), 2);
    });

});


