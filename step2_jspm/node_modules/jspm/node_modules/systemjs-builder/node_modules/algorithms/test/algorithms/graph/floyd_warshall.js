'use strict';

var root = require('../../../'),
    floydWarshall = root.Graph.floydWarshall,
    Graph = root.DataStructures.Graph,
    assert = require('assert');


describe('Floyd-Warshall Algorithm', function () {
  it('should compute all-pairs shortest paths in the graph', function () {
    var graph = new Graph();
    graph.addEdge('a', 'b', -2);
    graph.addEdge('b', 'c', -1);
    graph.addEdge('c', 'a', 4);
    graph.addEdge('c', 'x', 2);
    graph.addEdge('c', 'y', -3);
    graph.addEdge('z', 'x', 1);
    graph.addEdge('z', 'y', -4);

    var result = floydWarshall(graph);

    assert.deepEqual(result.distance, {'a': {'a': 0,
                                             'b': -2,
                                             'c': -3,
                                             'x': -1,
                                             'y': -6,
                                             'z': Infinity},
                                       'b': {'a': 3,
                                             'b': 0,
                                             'c': -1,
                                             'x': 1,
                                             'y': -4,
                                             'z': Infinity},
                                       'c': {'a': 4,
                                             'b': 2,
                                             'c': 0,
                                             'x': 2,
                                             'y': -3,
                                             'z': Infinity},
                                       'x': {'a': Infinity,
                                             'b': Infinity,
                                             'c': Infinity,
                                             'x': 0,
                                             'y': Infinity,
                                             'z': Infinity},
                                       'y': {'a': Infinity,
                                             'b': Infinity,
                                             'c': Infinity,
                                             'x': Infinity,
                                             'y': 0,
                                             'z': Infinity},
                                       'z': {'a': Infinity,
                                             'b': Infinity,
                                             'c': Infinity,
                                             'x': 1,
                                             'y': -4,
                                             'z': 0}});

    assert.equal(result.path('x', 'y'), null);
    assert.deepEqual(result.path('z', 'z'), ['z']);
    assert.deepEqual(result.path('c', 'a'), ['c', 'a']);
    assert.deepEqual(result.path('a', 'y'), ['a', 'b', 'c', 'y']);
  });

  it('should determine if the graph contains a negative-weighted cycle',
      function () {
        var graph = new Graph();
        graph.addEdge('a', 'b', -2);
        graph.addEdge('b', 'c', -1);
        graph.addEdge('c', 'y', -3);
        graph.addEdge('c', 'a', 2);

        assert.throws(floydWarshall.bind(null, graph));
      });
});
