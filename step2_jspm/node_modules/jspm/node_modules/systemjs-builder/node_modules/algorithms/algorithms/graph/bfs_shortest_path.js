'use strict';

var breadthFirstSearch = require('./breadth_first_search');


/**
 * Shortest-path algorithm based on Breadth-First Search.
 * Works solely on graphs with equal edge weights (but works fast).
 * Complexity: O(V + E).
 *
 * @param {Graph} graph
 * @param {string} source
 * @return {{distance: Object.<string, number>,
 *           previous: Object.<string, string>}}
 */
var bfsShortestPath = function (graph, source) {
  var distance = {}, previous = {};
  distance[source] = 0;

  breadthFirstSearch(graph, source, {
    onTraversal: function (vertex, neighbor) {
      distance[neighbor] = distance[vertex] + 1;
      previous[neighbor] = vertex;
    }
  });

  return {
    distance: distance,
    previous: previous
  };
};


module.exports = bfsShortestPath;
