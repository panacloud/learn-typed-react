'use strict';

var root = require('../../../'),
    kruskal = root.Graph.kruskal,
    prim = root.Graph.prim,
    depthFirstSearch = root.Graph.depthFirstSearch,
    Graph = root.DataStructures.Graph,
    assert = require('assert');


describe('Minimum Spanning Tree', function () {

  /**
   * @param {Graph} graph - Undirected graph.
   * @return {number}
   */
  var numberOfConnectedComponents = function (graph) {
    assert(!graph.directed);
    var seen = {};
    var coverComponent = function (origin) {
      depthFirstSearch(graph, origin, {
        enterVertex: function (vertex) {
          seen[vertex] = true;
        }
      });
    };

    var count = 0;
    graph.vertices.forEach(function (vertex) {
      if (!seen[vertex]) {
        coverComponent(vertex);
        count++;
      }
    });
    return count;
  };


  /**
   * Test whether graph is a valid (undirected) forest.
   * In a forest #vertices = #edges + #components.
   *
   * @param {Graph} graph
   * @param {number} connectivity
   * @return {boolean}
   */
  var isForest = function (graph, connectivity) {
    if (graph.directed || numberOfConnectedComponents(graph) !== connectivity) {
      return false;
    }
    var numberOfEdges = 0;
    graph.vertices.forEach(function (vertex) {
      graph.neighbors(vertex).filter(
        function (neighbor) {
          if (vertex <= neighbor) {
            numberOfEdges++;
          }
        });
    });
    return graph.vertices.size === numberOfEdges + connectivity;
  };


  /**
   * Test whether two graphs share the same vertex set.
   *
   * @param {Graph} graph1
   * @param {Graph} graph2
   * @return {boolean}
   */
  var spans = function (graph1, graph2) {
    var span;
    if (graph1.vertices.size === graph2.vertices.size) {
      span = true;
      graph1.vertices.forEach(function (v) {
        if (!graph2.vertices.contains(v)) {
          span = false;
        }
      });
    } else {
      span = false;
    }
    return span;
  };


  /**
   * Sum up graph edge weights.
   *
   * @param {Graph} graph
   * @return {?number} Null if the graph contains no edges.
   */
  var graphCost = function (graph) {
    var noEdges = true;
    var total = 0;
    graph.vertices.forEach(function (vertex) {
      graph.neighbors(vertex).forEach(function (neighbor) {
        noEdges = false;
        total += graph.edge(vertex, neighbor);
      });
    });
    return noEdges ? null : graph.directed ? total : total / 2;
  };


  /**
   * Test whether one graph is the minimum spanning forest of the other.
   *
   * @param {Graph} suspect
   * @param {Graph} graph - Undirected graph.
   * @param {?number} minimumCost
   * @param {number} [connectivity=1]
   * @return {boolean}
   */
  var isMinimumSpanningForest = function (suspect, graph,
                                          minimumCost, connectivity) {
    assert(!graph.directed);
    return isForest(suspect, connectivity || 1) &&
      spans(suspect, graph) &&
      graphCost(suspect) === minimumCost;
  };


  var testMstAlgorithm = function (mst) {
    it('should find a minimum spanning tree', function () {
      var graph = new Graph(false);
      graph.addEdge(1, 2, 1);
      graph.addEdge(1, 4, 2);
      graph.addEdge(1, 5, 2);
      graph.addEdge(4, 2, 2);
      graph.addEdge(4, 5, 1);
      graph.addEdge(5, 6, 1);
      graph.addEdge(6, 4, 8);
      graph.addEdge(6, 3, 2);
      graph.addEdge(2, 3, 3);
      assert(isMinimumSpanningForest(mst(graph), graph, 7));

      // Change (4, 5) weight to 3.
      graph.addEdge(4, 5, +2);
      assert(isMinimumSpanningForest(mst(graph), graph, 8));

      // Force it go find another way to reach (6).
      graph.addEdge(4, 5, +5);
      graph.addEdge(6, 5, +7);
      assert(isMinimumSpanningForest(mst(graph), graph, 10));

      // It should find zero-cost MST.
      var clear = function (a, b) {
        graph.addEdge(a, b, -graph.edge(a, b));
      };
      clear(2, 1);
      clear(1, 5);
      clear(5, 6);
      clear(6, 4);
      clear(6, 3);
      assert(isMinimumSpanningForest(mst(graph), graph, 0));

      // But prefer a negative-cost one to it.
      graph.addEdge(2, 4, -102);
      assert(isMinimumSpanningForest(mst(graph), graph, -100));
    });

    it('should find a minimum spaning forest if the graph is not connected',
       function () {
          var graph = new Graph(false);
          graph.addVertex(1);
          graph.addVertex(2);
          graph.addVertex(3);
          assert(isMinimumSpanningForest(mst(graph), graph, null, 3));

          graph.addEdge(1, 2, 2);
          assert(isMinimumSpanningForest(mst(graph), graph, 2, 2));

          graph.addEdge(1, 3, 1);
          graph.addEdge(2, 3, -1);
          assert(isMinimumSpanningForest(mst(graph), graph, 0, 1));

          graph.addVertex(4);
          assert(isMinimumSpanningForest(mst(graph), graph, 0, 2));

          graph.addEdge(5, 6, 1);
          assert(isMinimumSpanningForest(mst(graph), graph, 1, 3));

          graph.addEdge(5, 4, -100);
          graph.addEdge(6, 4, -100);
          assert(isMinimumSpanningForest(mst(graph), graph, -200, 2));
        });

    it('should throw an error if the graph is directed', function () {
      var directedGraph = new Graph(true);
      directedGraph.addEdge('Rock', 'Hard Place');
      assert.throws(mst.bind(null, directedGraph));
    });
  };


  describe('#Kruskal\'s Algorithm', testMstAlgorithm.bind(null, kruskal));
  describe('#Prim\'s Algorithm', testMstAlgorithm.bind(null, prim));
});
