'use strict';

var PriorityQueue = require('../../data_structures/priority_queue'),
    Graph = require('../../data_structures/graph');


/**
 * Prim's minimum spanning tree (forest) algorithm.
 * Complexity: O(E * log(V)).
 *
 * @param {Graph} graph - Undirected graph.
 * @return {Graph} Minimum spanning tree or forest
 *   (depending on whether input graph is connected itself).
 */
var prim = function (graph) {
  if (graph.directed) {
    throw new Error('Can\'t build MST of a directed graph.');
  }

  var mst = new Graph(false);
  var parent = Object.create(null);

  var q = new PriorityQueue();
  graph.vertices.forEach(function (vertex) {
    q.insert(vertex, Infinity);
  });

  var relax = function (vertex, neighbor) {
    var weight = graph.edge(vertex, neighbor);
    if (weight < q.priority(neighbor)) {
      q.changePriority(neighbor, weight);
      parent[neighbor] = vertex;
    }
  };

  while (!q.isEmpty()) {
    var top = q.extract(true);
    var vertex = top.item,
        weight = top.priority;

    if (parent[vertex]) {
      mst.addEdge(parent[vertex], vertex, weight);
    }
    else {
      mst.addVertex(vertex);
    }

    graph.neighbors(vertex).forEach(relax.bind(null, vertex));
  }

  return mst;
};


module.exports = prim;
