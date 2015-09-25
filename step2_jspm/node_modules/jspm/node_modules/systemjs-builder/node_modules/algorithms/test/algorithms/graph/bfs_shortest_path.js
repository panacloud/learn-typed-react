'use strict';

var root = require('../../../'),
    bfsShortestPath = root.Graph.bfsShortestPath,
    Graph = root.DataStructures.Graph,
    assert = require('assert');


describe('BFS Shortest Path Algorithm', function () {
  it('should return the shortest paths to all nodes from a given origin',
     function () {
        var graph = new Graph();
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(0, 2);
        graph.addEdge(2, 3);
        graph.addEdge(3, 6);
        graph.addEdge(6, 2);
        graph.addEdge(6, 0);
        graph.addEdge(0, 4);
        graph.addEdge(4, 6);
        graph.addEdge(4, 5);
        graph.addEdge(5, 0);
        graph.addEdge('a', 'b');

        var shortestPath = bfsShortestPath(graph, 0);

        assert.deepEqual(shortestPath.distance, {
          0: 0,
          1: 1,
          2: 1,
          3: 2,
          4: 1,
          5: 2,
          6: 2
        });
        assert.deepEqual(shortestPath.previous, {
          1: 0,
          2: 0,
          3: 2,
          4: 0,
          5: 4,
          6: 4
        });
      });
});
