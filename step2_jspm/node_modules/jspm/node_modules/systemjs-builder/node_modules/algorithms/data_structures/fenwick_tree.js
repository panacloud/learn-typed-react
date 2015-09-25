'use strict';

/**
 * Fenwick Tree (Binary Indexed Tree)
 *
 * The fenwick tree is a tree in the sense it represents a structure where
 * the leafs are the original array values and each parent has the sum of its
 * two children. E.g., for an array [1, 2, 3, 4], we have:
 *
 *    10
 *  3    7
 * 1 2  3 4
 *
 * But some nodes aren't really important. In fact every right child isn't
 * needed to compute the prefix sum (as its value is just the parent's value
 * minus the left child), so we can store the tree in a compact array structure
 * like this:
 *
 * 1 3 3 10
 *
 * Here we assume all the operations will be on a 1-based array for two
 * reasons: (1) the bit operations become rather easy and (2) it's better to
 * reason about the range sum (prefix(b) - prefix(a-1)) on a 1-based array.
 */
function FenwickTree(length) {
  this._elements = new Array(length + 1);
  for (var i = 0; i < this._elements.length ; i++)
    this._elements[i] = 0;
}

/**
 * Adds value to the array at specified index in O(log n)
 */
FenwickTree.prototype.adjust = function (index, value) {
  /*
    This function goes up the tree adding the value to all parent nodes.

    In the array, to know where a index is in the tree, just look at where is
    the rightmost bit. 1 is a leaf, because the rightmost bit is at position 0.
    2 (10) is 1 level above the leafs. 4 (100) is 2 levels above the leafs.

    Going up the tree means pushing the rightmost bit far to the left. We do
    this by adding only the bit itself to the index. Eventually we skip
    some levels that aren't represented in the array. E.g. starting at 3 (11),
    it's imediate parent is 11b + 1b = 100b. We started at a leaf  and skipped
    the level-1 node, because it wasn't represented in the array
    (a right child).

    Note: (index&-index) finds the rightmost bit in index.
  */
  for (; index < this._elements.length ; index += (index&-index))
    this._elements[index] += value;
};

/**
* Returns the sum of all values up to specified index in O(log n)
*/
FenwickTree.prototype.prefixSum = function (index) {
  /*
    This function goes up the tree adding the required nodes to sum the prefix.

    The key here is to sum every node that isn't in the same subtree as an
    already seen node. In practice we proceed always getting a node's uncle
    (the sibling of the node's parent). So, if we start at the index 7, we must
    go to 6 (7's uncle), then to 4 (6's uncle), then we stop, because 4 has
    no uncle.

    Binary-wise, this is the same as erasing the rightmost bit of the index.
    E.g. 7 (111) -> 6 (110) -> 4 (100).

    Note: (index&-index) finds the rightmost bit in index.
  */

  var sum = 0;
  for (; index > 0 ; index -= (index&-index))
    sum += this._elements[index];
  return sum;
};

/**
* Returns the sum of all values between two indexes in O(log n)
*/
FenwickTree.prototype.rangeSum = function (fromIndex, toIndex) {
  return this.prefixSum(toIndex) - this.prefixSum(fromIndex - 1);
};

module.exports = FenwickTree;
