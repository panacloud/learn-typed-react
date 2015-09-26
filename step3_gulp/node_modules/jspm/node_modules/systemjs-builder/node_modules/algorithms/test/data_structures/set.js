'use strict';

var HashSet = require('../..').DataStructures.Set,
    assert = require('assert');

describe('HashSet', function () {
  it('should start empty', function () {
    var s = new HashSet();
    assert.equal(s.size, 0);
  });

  it('should add all initial arguments', function () {
    var s = new HashSet(1, 2, 3);
    assert.equal(s.size, 3);
    assert(s.contains(1));
    assert(s.contains(2));
    assert(s.contains(3));

  });

  it('should add all arguments', function () {
    var s = new HashSet(1, 2, 3);
    assert.equal(s.size, 3);
    s.add(4, 5, 6);
    assert.equal(s.size, 6);
    assert(s.contains(1));
    assert(s.contains(2));
    assert(s.contains(3));
    assert(s.contains(4));
    assert(s.contains(5));
    assert(s.contains(6));
  });

  it('should remove all arguments', function () {
    var s = new HashSet(1, 2, 3);
    assert.equal(s.size, 3);
    s.remove(1, 3);
    assert.equal(s.size, 1);
    assert(!s.contains(1));
    assert(!s.contains(3));
    assert(s.contains(2));
  });

  it('should do nothing when trying to remove an element that doesn\'t exist',
    function () {
      var s = new HashSet(1, 2, 3);
      assert.equal(s.size, 3);
      s.remove(4);
      assert.equal(s.size, 3);
      assert(s.contains(1));
      assert(s.contains(2));
      assert(s.contains(3));
    });

  it('should only contain its elements', function () {
    var s = new HashSet(1, 2, 3);
    assert(s.contains(1));
    assert(!s.contains(4));
  });

  it('should perform a function to all elements with forEach', function () {
    var s = new HashSet();
    s.add(1, 2, 3);

    var total = 0;
    s.forEach(function (elem) {
      total += elem;
    });

    assert.equal(total, 6);
  });
});


