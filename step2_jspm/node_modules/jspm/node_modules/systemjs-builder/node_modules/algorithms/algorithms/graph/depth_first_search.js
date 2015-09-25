'use strict';


/**
 * @typedef {Object} Callbacks
 * @param {function(vertex: *, neighbor: *): boolean} allowTraversal -
 *   Determines whether DFS should traverse from the vertex to its neighbor
 *   (along the edge). By default prohibits visiting the same vertex again.
 * @param {function(vertex: *, neighbor: *)} beforeTraversal - Called before
 *   recursive DFS call.
 * @param {function(vertex: *, neighbor: *)} afterTraversal - Called after
 *   recursive DFS call.
 * @param {function(vertex: *)} enterVertex - Called when DFS enters the vertex.
 * @param {function(vertex: *)} leaveVertex - Called when DFS leaves the vertex.
 */


/**
 * Fill in missing callbacks.
 * @param {Callbacks} callbacks
 * @param {Array} seenVertices - Vertices already discovered,
 *   used by default allowTraversal implementation.
 * @return {Callbacks} The same object or new one (if null passed).
 */
var normalizeCallbacks = function (callbacks, seenVertices) {
  callbacks = callbacks || {};

  callbacks.allowTraversal = callbacks.allowTraversal || (function () {
    var seen = {};
    seenVertices.forEach(function (vertex) {
      seen[vertex] = true;
    });

    return function (vertex, neighbor) {
      // It should still be possible to redefine other callbacks,
      // so we better do all at once here.

      if (!seen[neighbor]) {
        seen[neighbor] = true;
        return true;
      }
      return false;
    };
  })();

  var noop = function () {};
  callbacks.beforeTraversal = callbacks.beforeTraversal || noop;
  callbacks.afterTraversal = callbacks.afterTraversal || noop;
  callbacks.enterVertex = callbacks.enterVertex || noop;
  callbacks.leaveVertex = callbacks.leaveVertex || noop;

  return callbacks;
};


/**
 * Run Depth-First Search from a start vertex.
 * Complexity (default implementation): O(V + E).
 *
 * @param {Graph} graph
 * @param {*} startVertex
 * @param {Callbacks} [callbacks]
 */
var depthFirstSearch = function (graph, startVertex, callbacks) {
  dfsLoop(graph, startVertex, normalizeCallbacks(callbacks, [startVertex]));
};


var dfsLoop = function dfsLoop(graph, vertex, callbacks) {
  callbacks.enterVertex(vertex);

  graph.neighbors(vertex).forEach(function (neighbor) {
    if (callbacks.allowTraversal(vertex, neighbor)) {
      callbacks.beforeTraversal(vertex, neighbor);
      dfsLoop(graph, neighbor, callbacks);
      callbacks.afterTraversal(vertex, neighbor);
    }
  });

  callbacks.leaveVertex(vertex);
};


module.exports = depthFirstSearch;
