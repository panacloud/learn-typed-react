'use strict';

var math = require('../../..').Math,
    extEuclid = math.extendedEuclidean,
    assert = require('assert');

describe('extEuclid', function () {
  it('should calculate the solve to Bézout\'s identity', function () {
    var solve = extEuclid(1, 0);
    assert.equal(solve.x, 1);
    assert.equal(solve.y, 0);

    solve = extEuclid(25, 35);
    assert.equal(solve.x, 3);
    assert.equal(solve.y, -2);

    solve = extEuclid(-55, 22);
    assert.equal(solve.x, 1);
    assert.equal(solve.y, 3);
  });
});
