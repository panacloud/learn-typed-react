'use strict';

var Graph = require('../..').DataStructures.Graph,
    assert = require('assert');

describe('Graph - Adjacency list', function () {
  it('should be directed by default', function () {
    var g = new Graph();
    assert(g.directed);

    g = new Graph(false);
    assert(!g.directed);

    g = new Graph(true);
    assert(g.directed);
  });

  it('should default weight 1 for edges', function () {
    var g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addEdge('a', 'b');
    assert.strictEqual(g.edge('a', 'b'), 1);
  });

  it('should create the vertex if an edge is inserted and vertex doesnt exist',
    function () {
      var g = new Graph();
      g.addEdge('a', 'b');
      assert.equal(g.vertices.size, 2);
      assert(g.vertices.contains('a'));
      assert(g.vertices.contains('b'));
    });

  it('should sum multiple edges between the same vertices', function () {
    var g = new Graph();
    g.addEdge('a', 'b', 10);
    assert.equal(g.edge('a', 'b'), 10);
    g.addEdge('a', 'b', 4);
    assert.equal(g.edge('a', 'b'), 14);
  });

  it('should have edges in both directions if undirected', function () {
    var g = new Graph(false);
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('b', 'a'), 10);
    assert.equal(g.edge('a', 'c'), 5);
    assert.equal(g.edge('c', 'a'), 5);
    assert.equal(g.edge('c', 'd'), 2);
    assert.equal(g.edge('d', 'c'), 2);

    assert.equal(g.edge('a', 'd'), undefined);
    g.addEdge('b', 'a', 2);
    assert.equal(g.edge('a', 'b'), 12);
    assert.equal(g.edge('b', 'a'), 12);
  });

  it('should respect direction of the edges in directed graphs', function () {
    var g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('b', 'a'), undefined);
    assert.equal(g.edge('a', 'c'), 5);
    assert.equal(g.edge('c', 'a'), undefined);
    assert.equal(g.edge('c', 'd'), 2);
    assert.equal(g.edge('d', 'c'), undefined);

    assert.equal(g.edge('a', 'd'), undefined);
    g.addEdge('b', 'a', 2);
    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('b', 'a'), 2);
  });

  it('should have a list of vertices', function () {
    var g = new Graph();
    assert.equal(g.vertices.size, 0);
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    assert.equal(g.vertices.size, 3);
    assert(g.vertices.contains('a'));
    assert(g.vertices.contains('b'));
    assert(g.vertices.contains('c'));
  });

  it('should not allow repeated vertices', function () {
    var g = new Graph();
    g.addVertex('a');
    assert.throws(function () {
      g.addVertex('a');
    });
  });

  it('should return a list of neighbors of a vertex', function () {
    var g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.deepEqual(g.neighbors('a'), ['b', 'c']);
    assert.deepEqual(g.neighbors('b'), []);
    assert.deepEqual(g.neighbors('c'), ['d']);
  });

  it('should return the weight of the edge', function () {
    var g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('a', 'c'), 5);
    assert.equal(g.edge('c', 'd'), 2);
  });

  it('should not "inherit" edges from Object.prototype', function () {
    var g = new Graph();
    g.addEdge('a', 'b');

    assert.ifError(g.edge('a', 'constructor'));
    assert.throws(g.edge.bind(g, 'valueOf', 'call'));
  });
});
