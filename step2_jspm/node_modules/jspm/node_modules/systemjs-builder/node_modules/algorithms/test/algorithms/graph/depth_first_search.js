'use strict';

var root = require('../../../'),
    depthFirstSearch = root.Graph.depthFirstSearch,
    Graph = root.DataStructures.Graph,
    assert = require('assert');

describe('Depth First Search Algorithm', function () {

  var graph;
  before(function () {
    graph = new Graph(true);
    graph.addEdge('one', 'three');
    graph.addEdge('one', 'four');
    graph.addEdge('four', 'two');
    graph.addEdge('two', 'one');
    graph.addEdge('three', 'one');
    graph.addEdge('five', 'six');
  });

  it('should visit only the nodes reachable from the start node (inclusive)',
    function () {
      var enter = [], leave = [];
      var numEdgeTails = 0, numEdgeHeads = 0;

      depthFirstSearch(graph, 'one');

      var dfsCallbacks = {
        enterVertex: [].push.bind(enter),
        leaveVertex: [].push.bind(leave),
        beforeTraversal: function () {
          numEdgeHeads += 1;
        },
        afterTraversal: function () {
          numEdgeTails += 1;
        }
      };

      depthFirstSearch(graph, 'one', dfsCallbacks);
      assert.deepEqual(enter, ['one', 'three', 'four', 'two']);
      assert.deepEqual(leave, ['three', 'two', 'four', 'one']);
      assert.equal(numEdgeTails, numEdgeHeads);
      assert.equal(numEdgeHeads, 3);

      enter.splice(0, 4);
      leave.splice(0, 4);
      depthFirstSearch(graph, 'five', dfsCallbacks);
      assert.deepEqual(enter, ['five', 'six']);
      assert.deepEqual(leave, ['six', 'five']);
      assert.equal(numEdgeTails, numEdgeHeads);
      assert.equal(numEdgeHeads, 4);
    }
  );

  it('should allow user-defined allowTraversal rules', function () {
    var seen = new Graph(graph.directed);
    graph.vertices.forEach(seen.addVertex.bind(seen));
    var path = ['one'];

    // Edge-centric DFS.
    depthFirstSearch(graph, path[0], {
      allowTraversal: function (vertex, neighbor) {
        return !seen.edge(vertex, neighbor);
      },
      beforeTraversal: function (vertex, neighbor) {
        seen.addEdge(vertex, neighbor);
        path.push(neighbor);
      }
    });

    assert.deepEqual(path, ['one', 'three', 'one', 'four', 'two', 'one']);
  });
});
