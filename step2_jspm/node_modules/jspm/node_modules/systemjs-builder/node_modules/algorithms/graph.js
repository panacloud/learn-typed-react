'use strict';

// Graph algorithms
module.exports = {
  topologicalSort: require('./algorithms/graph/topological_sort'),
  dijkstra: require('./algorithms/graph/dijkstra'),
  SPFA: require('./algorithms/graph/SPFA'),
  bellmanFord: require('./algorithms/graph/bellman_ford'),
  eulerPath: require('./algorithms/graph/euler_path'),
  depthFirstSearch: require('./algorithms/graph/depth_first_search'),
  kruskal: require('./algorithms/graph/kruskal'),
  breadthFirstSearch: require('./algorithms/graph/breadth_first_search'),
  bfsShortestPath: require('./algorithms/graph/bfs_shortest_path'),
  prim: require('./algorithms/graph/prim'),
  floydWarshall: require('./algorithms/graph/floyd_warshall')
};
