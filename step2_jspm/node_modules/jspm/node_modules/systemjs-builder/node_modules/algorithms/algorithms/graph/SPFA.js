'use strict';

/**
 * Calculates the shortest paths in a graph to every node from the node s
 * with SPFA(Shortest Path Faster Algorithm) algorithm
 *
 * @param {Object} graph An adjacency list representing the graph
 * @param {string} start the starting node
 *
 */
function spfa(graph, s) {
  var distance = {};
  var previous = {};
  var queue = {};
  var isInQue = {};
  var cnt = {};
  var head = 0;
  var tail = 1;
  // initialize
  distance[s] = 0;
  queue[0] = s;
  isInQue[s] = true;
  cnt[s] = 1;
  graph.vertices.forEach(function (v) {
    if (v !== s) {
      distance[v] = Infinity;
      isInQue[v] = false;
      cnt[v] = 0;
    }
  });

  var currNode;
  while (head !== tail) {
    currNode = queue[head++];
    isInQue[currNode] = false;
    var neighbors = graph.neighbors(currNode);
    for (var i = 0; i < neighbors.length; i++) {
      var v = neighbors[i];
      // relaxation
      var newDistance = distance[currNode] + graph.edge(currNode, v);
      if (newDistance < distance[v]) {
        distance[v] = newDistance;
        previous[v] = currNode;
        if (!isInQue[v]) {
          queue[tail++] = v;
          isInQue[v] = true;
          cnt[v]++;
          if (cnt[v] > graph.vertices.size)
            // indicates negative-weighted cycle
            return {
              distance: {}
            };
        }
      }
    }
  }

  return {
    distance: distance,
    previous: previous
  };
}

module.exports = spfa;
