'use strict';

var root = require('../../../'),
    breadthFirstSearch = root.Graph.breadthFirstSearch,
    Graph = root.DataStructures.Graph,
    assert = require('assert');


describe('Breadth-First Search', function () {
  var graph;

  before(function () {
    graph = new Graph();
    graph.addEdge(1, 2);
    graph.addEdge(1, 5);
    graph.addEdge(5, 2);
    graph.addEdge(2, 6);
    graph.addEdge(6, 1);
    graph.addEdge(6, 3);
    graph.addEdge(3, 2);
    graph.addEdge(2, 4);
    graph.addEdge('alpha', 'omega');
  });

  it('should visit reachable vertices in a breadth-first manner', function () {
    var enter = [], leave = [];
    var lastEntered = null;
    var traversed = 0;

    breadthFirstSearch(graph, 1);

    breadthFirstSearch(graph, 1, {
      enterVertex: function (vertex) {
        enter.push(vertex);
        lastEntered = vertex;
      },
      leaveVertex: function (vertex) {
        assert.equal(lastEntered, vertex);
        leave.push(vertex);
      },
      onTraversal: function () {
        traversed += 1;
      }
    });

    assert.equal(traversed, 5); // #edges in a spanning tree.
    assert.deepEqual(enter, leave);
    assert.equal(enter.length, 6);

    assert.equal(enter[0], 1);
    assert.deepEqual(enter.slice(1, 3).sort(), [2, 5]);
    assert.deepEqual(enter.slice(3, 5).sort(), [4, 6]);
    assert.equal(enter[5], 3);
  });

  it('should allow user-defined allowTraversal rules', function () {
    var seen = new Graph(graph.directed);
    graph.vertices.forEach(seen.addVertex.bind(seen));
    var indegrees = {1: -1}, outdegrees = {};

    // Edge-centric BFS.
    breadthFirstSearch(graph, 1, {
      allowTraversal: function (vertex, neighbor) {
        if (!seen.edge(vertex, neighbor)) {
          seen.addEdge(vertex, neighbor);
          outdegrees[vertex] = (outdegrees[vertex] || 0) + 1;
          return true;
        }
        else {
          return false;
        }
      },
      enterVertex: function (vertex) {
        indegrees[vertex] = (indegrees[vertex] || 0) + 1;
        outdegrees[vertex] = outdegrees[vertex] || 0;
      }
    });

    assert.deepEqual(indegrees, {
      1: 1,
      2: 3,
      3: 1,
      4: 1,
      5: 1,
      6: 1
    });
    assert.deepEqual(outdegrees, {
      1: 2,
      2: 2,
      3: 1,
      4: 0,
      5: 1,
      6: 2
    });
  });
});
