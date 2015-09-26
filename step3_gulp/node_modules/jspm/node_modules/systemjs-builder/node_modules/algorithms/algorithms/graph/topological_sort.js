'use strict';

var Stack = require('../../data_structures/stack'),
    depthFirstSearch = require('../../algorithms/graph/depth_first_search');

/**
 * Sorts the edges of the DAG topologically
 *
 *  (node1) -> (node2) -> (node4)
 *     \-> (node3)^
 *
 * Meaning that:
 * - "node2" and "node3" depend on "node1"
 * - "node4" depend on node2
 * - "node2" depend on "node3"
 *
 * @param {Graph}
 * @return Stack
 */
var topologicalSort = function (graph) {
  var stack = new Stack();
  var firstHit = {};
  var time = 0;

  graph.vertices.forEach(function (node) {
    if (!firstHit[node]) {
      depthFirstSearch(graph, node, {
        allowTraversal: function (node, neighbor) {
          return !firstHit[neighbor];
        },
        enterVertex: function (node) {
          firstHit[node] = ++time;
        },
        leaveVertex: function (node) {
          stack.push(node);
        }
      });
    }
  });

  return stack;
};

module.exports = topologicalSort;
