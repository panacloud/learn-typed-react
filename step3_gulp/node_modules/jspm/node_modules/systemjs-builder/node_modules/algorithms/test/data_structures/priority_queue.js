'use strict';

var PriorityQueue = require('../..').DataStructures.PriorityQueue,
    assert = require('assert');

describe('Min Priority Queue', function () {
  it('should always return the element with the lowest priority', function () {
    var q = new PriorityQueue();
    assert(q.isEmpty());
    q.insert('a', 10);
    q.insert('b', 2091);
    q.insert('c', 4);
    q.insert('d', 1);
    q.insert('e', 5);
    q.insert('f', 500);
    q.insert('g', 0);
    q.insert('h', 18);
    q.insert('i', 3);
    q.insert('j', 22);
    q.insert('k', 20);
    assert(!q.isEmpty());

    assert.equal(q.extract(), 'g');
    assert.equal(q.extract(), 'd');
    assert.equal(q.extract(), 'i');
    assert.equal(q.extract(), 'c');
    assert.equal(q.extract(), 'e');
    assert.equal(q.extract(), 'a');
    assert.equal(q.extract(), 'h');
    assert.equal(q.extract(), 'k');
    assert.equal(q.extract(), 'j');
    assert.equal(q.extract(), 'f');
    assert.equal(q.extract(), 'b');

    assert(q.isEmpty());
  });

  it('can receive a dictionary with item => priority in construction',
    function () {
      var q = new PriorityQueue({
        a: 10,
        b: 2091,
        c: 4,
        d: 1,
        e: 5
      });

      assert(!q.isEmpty());
      assert.equal(q.extract(), 'd');
      assert.equal(q.extract(), 'c');
      assert.equal(q.extract(), 'e');
      assert.equal(q.extract(), 'a');
      assert.equal(q.extract(), 'b');
    });

  it('should be possible to change the priority of an item', function () {
    var q = new PriorityQueue({
      a: 10,
      b: 2091,
      c: 4,
      d: 1,
      e: 5
    });

    assert(!q.isEmpty());

    q.changePriority('b', 0);
    q.changePriority('a', 1);
    q.changePriority('c', 50);
    q.changePriority('d', 1000);
    q.changePriority('e', 2);

    assert.equal(q.extract(), 'b');
    assert.equal(q.extract(), 'a');
    assert.equal(q.extract(), 'e');
    assert.equal(q.extract(), 'c');
    assert.equal(q.extract(), 'd');
    assert(q.isEmpty());
  });

  it('should just update the priority when trying to insert an element that ' +
      ' already exists', function () {
    var q = new PriorityQueue({
      a: 10,
      b: 2091,
      c: 4,
      d: 1,
      e: 5
    });

    assert(!q.isEmpty());

    q.insert('b', 0);
    q.insert('a', 1);
    q.insert('c', 50);
    q.insert('d', 1000);
    q.insert('e', 2);

    assert.equal(q.extract(), 'b');
    assert.equal(q.extract(), 'a');
    assert.equal(q.extract(), 'e');
    assert.equal(q.extract(), 'c');
    assert.equal(q.extract(), 'd');
    assert(q.isEmpty());
  });

});


