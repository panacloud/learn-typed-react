'use strict';


/**
 * Floyd-Warshall algorithm.
 * Compute all-pairs shortest paths (a path for each pair of vertices).
 * Complexity: O(V^3).
 *
 * @param {Graph} graph
 * @return {{distance, path}}
 */
var floydWarshall = function (graph) {

  // Fill in the distances with initial values:
  //   - 0 if source == destination;
  //   - edge(source, destination) if there is a direct edge;
  //   - +inf otherwise.
  var distance = Object.create(null);
  graph.vertices.forEach(function (src) {
    distance[src] = Object.create(null);
    graph.vertices.forEach(function (dest) {
      if (src === dest) {
        distance[src][dest] = 0;
      } else if (graph.edge(src, dest) !== undefined) {
        distance[src][dest] = graph.edge(src, dest);
      } else {
        distance[src][dest] = Infinity;
      }
    });
  });

  // Internal vertex with the largest index along the shortest path.
  // Needed for path reconstruction.
  var middleVertex = Object.create(null);
  graph.vertices.forEach(function (vertex) {
    middleVertex[vertex] = Object.create(null);
  });

  graph.vertices.forEach(function (middle) {
    graph.vertices.forEach(function (src) {
      graph.vertices.forEach(function (dest) {
        var dist = distance[src][middle] + distance[middle][dest];
        if (dist < distance[src][dest]) {
          distance[src][dest] = dist;
          middleVertex[src][dest] = middle;
        }
      });
    });
  });

  // Check for a negative-weighted cycle.
  graph.vertices.forEach(function (vertex) {
    if (distance[vertex][vertex] < 0) {
      // Negative-weighted cycle found.
      throw new Error('The graph contains a negative-weighted cycle!');
    }
  });

  /**
   * Reconstruct the shortest path for a given pair of end vertices.
   * Complexity: O(L), L - length of the path (number of edges).
   *
   * @param {string} srce
   * @param {string} dest
   * @return {?string[]} Null if destination is unreachable.
   */
  var path = function (src, dest) {
    if (!Number.isFinite(distance[src][dest])) {
      // dest unreachable.
      return null;
    }

    var path = [src];

    if (src !== dest) {
      (function pushInOrder(src, dest) {
        if (middleVertex[src][dest] === undefined) {
          path.push(dest);
        } else {
          var middle = middleVertex[src][dest];
          pushInOrder(src, middle);
          pushInOrder(middle, dest);
        }
      })(src, dest);
    }

    return path;
  };

  return {
    distance: distance,
    path: path
  };
};


module.exports = floydWarshall;
