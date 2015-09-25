'use strict';


var Graph = require('../../data_structures/graph'),
    depthFirstSearch = require('../../algorithms/graph/depth_first_search');


/** Examine a graph and compute pair of end vertices of the existing Euler path.
 * Return pair of undefined values if there is no specific choice of end points.
 * Return value format: {start: START, finish: FINISH}.
 *
 * @param {Graph} Graph, must be connected and contain at least one vertex.
 * @return Object
 */
var eulerEndpoints = function (graph) {
  var rank = {};
  //     start     ->  rank = +1
  // middle points ->  rank =  0
  //    finish     ->  rank = -1

  // Initialize ranks to be outdegrees of vertices.
  graph.vertices.forEach(function (vertex) {
    rank[vertex] = graph.neighbors(vertex).length;
  });

  if (graph.directed) {
    // rank = outdegree - indegree
    graph.vertices.forEach(function (vertex) {
      graph.neighbors(vertex).forEach(function (neighbor) {
        rank[neighbor] -= 1;
      });
    });
  }
  else {
    // Compute ranks from vertex degree parity values.
    var startChosen = false;
    graph.vertices.forEach(function (vertex) {
      rank[vertex] %= 2;
      if (rank[vertex]) {
        if (startChosen) {
          rank[vertex] = -1;
        }
        startChosen = true;
      }
    });
  }

  var start, finish, v;

  graph.vertices.forEach(function (vertex) {
    if (rank[vertex] === 1) {
      if (start) {
        throw new Error('Duplicate start vertex.');
      }
      start = vertex;
    } else if (rank[vertex] === -1) {
      if (finish) {
        throw new Error('Duplicate finish vertex.');
      }
      finish = vertex;
    } else if (rank[vertex]) {
      throw new Error('Unexpected vertex degree for ' + vertex);
    } else if (!v) {
      v = vertex;
    }
  });

  if (!start && !finish) {
    start = finish = v;
  }

  return {start: start,
          finish: finish};
};


/**
 * Compute Euler path (either walk or tour, depending on the graph).
 * Euler path is a trail in a graph which visits every edge exactly once.
 * The procedure works both for directed and undirected graphs,
 *   although the details differ a bit.
 * The resulting array consists of exactly |E|+1 vertices.
 *
 * @param {Graph}
 * @return Array
 */
var eulerPath = function (graph) {
  if (!graph.vertices.size) {
    return [];
  }

  var endpoints = eulerEndpoints(graph);
  var route = [endpoints.finish];

  var seen = new Graph(graph.directed);
  graph.vertices.forEach(seen.addVertex.bind(seen));

  depthFirstSearch(graph, endpoints.start, {
    allowTraversal: function (vertex, neighbor) {
      return !seen.edge(vertex, neighbor);
    },
    beforeTraversal: function (vertex, neighbor) {
      seen.addEdge(vertex, neighbor);
    },
    afterTraversal: function (vertex) {
      route.push(vertex);
    }
  });

  graph.vertices.forEach(function (vertex) {
    if (seen.neighbors(vertex).length < graph.neighbors(vertex).length) {
      throw new Error('There is no euler path for a disconnected graph.');
    }
  });
  return route.reverse();
};


module.exports = eulerPath;
