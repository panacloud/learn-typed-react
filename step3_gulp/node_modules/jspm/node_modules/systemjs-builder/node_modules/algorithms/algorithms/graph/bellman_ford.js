'use strict';

/**
 * Calculates the shortest paths in a graph to every node
 * from the node 'startNode' with Bellman-Ford's algorithm
 *
 * Worst Case Complexity: O(|V| * |E|), where |V| is the number of
 * vertices and |E| is the number of edges in the graph
 *
 * @param Object 'graph' An adjacency list representing the graph
 * @param String 'startNode' The starting node
 * @return Object the minimum distance to reach every vertice of
 *    the graph starting in 'startNode', or an empty object if there
 *    exists a Negative-Weighted Cycle in the graph
 */
var bellmanFord = function (graph, startNode) {
  var minDistance = {};
  var previousVertex = {};
  var edges = [];
  var adjacencyListSize = 0;

  // Add all the edges from the graph to the 'edges' array
  graph.vertices.forEach(function (s) {
    graph.neighbors(s).forEach(function (t) {
      edges.push({
        source: s,
        target: t,
        weight: graph.edge(s, t)
      });
    });

    minDistance[s] = Infinity;
    ++adjacencyListSize;
  });

  minDistance[startNode] = 0;

  var edgesSize = edges.length;
  var sourceDistance;
  var targetDistance;

  var iteration;
  for (iteration = 0; iteration < adjacencyListSize; ++iteration) {
    var somethingChanged = false;

    for (var j = 0; j < edgesSize; j++) {
      sourceDistance = minDistance[edges[j].source] + edges[j].weight;
      targetDistance = minDistance[edges[j].target];

      if (sourceDistance < targetDistance) {
        somethingChanged = true;
        minDistance[edges[j].target] = sourceDistance;
        previousVertex[edges[j].target] = edges[j].source;
      }
    }

    if (!somethingChanged) {
      // Early stop.
      break;
    }
  }

  // If the loop did not break early, then there is a negative-weighted cycle.
  if (iteration === adjacencyListSize) {
    // Empty 'distance' object indicates Negative-Weighted Cycle
    return {
      distance: {}
    };
  }

  return {
    distance: minDistance,
    previous: previousVertex
  };
};

module.exports = bellmanFord;
