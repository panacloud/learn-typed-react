'use strict';


var root = require('../../../'),
    eulerPath = root.Graph.eulerPath,
    Graph = root.DataStructures.Graph,
    assert = require('assert');


describe('Euler Path', function () {
  var verifyEulerPath = function (graph, trail) {
    var visited = new Graph(graph.directed);
    graph.vertices.forEach(visited.addVertex.bind(visited));

    trail.slice(1).reduce(function (previous, current) {
      assert(graph.edge(previous, current));
      assert(!visited.edge(previous, current));
      visited.addEdge(previous, current);
      return current;
    }, trail[0]);

    graph.vertices.forEach(function (vertex) {
      assert.equal(graph.neighbors(vertex).length,
                   visited.neighbors(vertex).length);
    });
  };

  var graphFromEdges = function (directed, edges) {
    var graph = new Graph(directed);
    edges.forEach(function (edge) {
      graph.addEdge(edge[0], edge[1]);
    });
    return graph;
  };

  it('should compute Euler tour over the undirected graph', function () {
    var graph = graphFromEdges(false, [
      [1, 2],
      [1, 5],
      [1, 7],
      [1, 8],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 5],
      [4, 6],
      [4, 9],
      [4, 10],
      [5, 6],
      [6, 9],
      [6, 10],
      [7, 8]
    ]);
    var trail = eulerPath(graph);
    verifyEulerPath(graph, trail);
    assert.equal(trail[0], trail.slice(-1)[0]);
  });

  it('should compute Euler walk over the undirected graph', function () {
    var graph = graphFromEdges(false, [
      [1, 2],
      [1, 5],
      [1, 7],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 5],
      [4, 6],
      [4, 9],
      [4, 10],
      [5, 6],
      [6, 9],
      [6, 10],
      [7, 8]
    ]);
    var trail = eulerPath(graph);
    verifyEulerPath(graph, trail);
    var endpoints = [trail[0], trail.slice(-1)[0]];
    endpoints.sort();
    assert.equal(endpoints[0], 1);
    assert.equal(endpoints[1], 8);
  });

  it('should compute Euler tour over the directed graph', function () {
    var graph = graphFromEdges(true, [
      [0, 1],
      [1, 2],
      [2, 0],
      [0, 3],
      [3, 4],
      [4, 0],
      [4, 1],
      [1, 5],
      [5, 6],
      [6, 4]
    ]);
    var trail = eulerPath(graph);
    verifyEulerPath(graph, trail);
    assert.equal(trail[0], trail.slice(-1)[0]);
  });

  it('should compute Euler walk over the directed graph', function () {
    var graph = graphFromEdges(true, [
      [5, 0],
      [0, 2],
      [2, 4],
      [4, 0],
      [1, 5],
      [3, 1],
      [5, 3]
    ]);
    var trail = eulerPath(graph);
    assert.deepEqual(trail, [5, 3, 1, 5, 0, 2, 4, 0]);
  });

  it('should return single-vertex-trail for an isolated vertex', function () {
    var graph = new Graph();
    graph.addVertex('loner');
    var trail = eulerPath(graph);
    assert.deepEqual(trail, ['loner']);
  });

  it('should return empty trail for an empty graph', function () {
    var graph = new Graph();
    var trail = eulerPath(graph);
    assert.deepEqual(trail, []);
  });

  it('should raise an error if there is no Euler path', function () {
    var graph = graphFromEdges(false, [[0, 1], [2, 3]]);
    assert.throws(eulerPath.bind(null, graph));

    graph = graphFromEdges(false, [
      [0, 1],
      [0, 2],
      [0, 3]
    ]);
    assert.throws(eulerPath.bind(null, graph));

    graph = graphFromEdges(true, [[0, 1], [0, 2]]);
    assert.throws(eulerPath.bind(null, graph));

    graph = graphFromEdges(true, [[1, 0], [2, 0]]);
    assert.throws(eulerPath.bind(null, graph));

    graph = graphFromEdges(true, [
      [0, 1],
      [2, 3],
      [3, 2]
    ]);
    assert.throws(eulerPath.bind(null, graph));

    graph = graphFromEdges(true, [
      [0, 1],
      [2, 3]
    ]);
    assert.throws(eulerPath.bind(null, graph));
  });
});
