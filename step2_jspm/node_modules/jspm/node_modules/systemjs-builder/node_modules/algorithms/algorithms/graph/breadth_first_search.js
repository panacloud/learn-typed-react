'use strict';

var Queue = require('../../data_structures/queue');


/**
 * @typedef {Object} Callbacks
 * @param {function(vertex: *, neighbor: *): boolean} allowTraversal -
 *   Determines whether BFS should traverse from the vertex to its neighbor
 *   (along the edge). By default prohibits visiting the same vertex again.
 * @param {function(vertex: *, neighbor: *)} onTraversal - Called when BFS
 *   follows the edge (and puts its head into the queue).
 * @param {function(vertex: *)} enterVertex - Called when BFS enters the vertex.
 * @param {function(vertex: *)} leaveVertex - Called when BFS leaves the vertex.
 */


/**
 * Fill in missing callbacks.
 *
 * @param {Callbacks} callbacks
 * @param {Array} seenVertices - Vertices already discovered,
 *   used by default allowTraversal implementation.
 * @return {Callbacks} The same object or new one (if null passed).
 */
var normalizeCallbacks = function (callbacks, seenVertices) {
  callbacks = callbacks || {};

  callbacks.allowTraversal = callbacks.allowTraversal || (function () {
    var seen = seenVertices.reduce(function (seen, vertex) {
      seen[vertex] = true;
      return seen;
    }, {});

    return function (vertex, neighbor) {
      if (!seen[neighbor]) {
        seen[neighbor] = true;
        return true;
      }
      else {
        return false;
      }
    };
  })();

  var noop = function () {};
  callbacks.onTraversal = callbacks.onTraversal || noop;
  callbacks.enterVertex = callbacks.enterVertex || noop;
  callbacks.leaveVertex = callbacks.leaveVertex || noop;

  return callbacks;
};


/**
 * Run Breadth-First Search from a start vertex.
 * Complexity (default implementation): O(V + E).
 *
 * @param {Graph} graph
 * @param {*} startVertex
 * @param {Callbacks} [callbacks]
 */
var breadthFirstSearch = function (graph, startVertex, callbacks) {
  var vertexQueue = new Queue();
  vertexQueue.push(startVertex);
  callbacks = normalizeCallbacks(callbacks, [startVertex]);

  var vertex;
  var enqueue = function (neighbor) {
    if (callbacks.allowTraversal(vertex, neighbor)) {
      callbacks.onTraversal(vertex, neighbor);
      vertexQueue.push(neighbor);
    }
  };

  while (!vertexQueue.isEmpty()) {
    vertex = vertexQueue.pop();
    callbacks.enterVertex(vertex);
    graph.neighbors(vertex).forEach(enqueue);
    callbacks.leaveVertex(vertex);
  }
};


module.exports = breadthFirstSearch;
