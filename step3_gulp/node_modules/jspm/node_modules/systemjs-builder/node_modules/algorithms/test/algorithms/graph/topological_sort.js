'use strict';

var root = require('../../../'),
    topologicalSort = root.Graph.topologicalSort,
    Graph = root.DataStructures.Graph,
    assert = require('assert');

describe('Topological Sort', function () {
  it('should return a stack with the vertices ordered' +
    ' considering the dependencies', function () {

      var graph = new Graph();
      graph.addVertex('shoes');
      graph.addVertex('watch');
      graph.addVertex('underwear');
      graph.addVertex('socks');
      graph.addVertex('shirt');
      graph.addVertex('pants');
      graph.addVertex('belt');
      graph.addVertex('tie');
      graph.addVertex('jacket');
      
      graph.addEdge('shirt', 'belt');
      graph.addEdge('shirt', 'tie');
      graph.addEdge('shirt', 'jacket');

      graph.addEdge('socks', 'shoes');

      graph.addEdge('underwear', 'pants');
      graph.addEdge('underwear', 'shoes');

      graph.addEdge('pants', 'shoes');
      graph.addEdge('pants', 'belt');

      graph.addEdge('belt', 'jacket');

      graph.addEdge('tie', 'jacket');

      var stack = topologicalSort(graph);
      var a = [];
      while (!stack.isEmpty()) a.push(stack.pop());
      assert.deepEqual(a, [
        'shirt', 'socks', 'underwear', 'pants', 'shoes',
        'tie', 'watch', 'belt', 'jacket'
      ]);
    });
});
