'use strict';

var directory = '../../../algorithms/string/';
var filename = 'longest_common_substring';
var longestCommonSubstring = require(directory + filename),
    assert = require('assert');

describe('Longest common substring', function () {
  it('should return the longest common substring of two strings', function () {
    assert.equal('', longestCommonSubstring('', ''));
    assert.equal('', longestCommonSubstring('', 'aaa'));
    assert.equal('', longestCommonSubstring('aaa', ''));
    assert.equal('aaa', longestCommonSubstring('aaa', 'aaa'));
    assert.equal('xun', longestCommonSubstring('xunmjyauz', 'mzjawxun'));
    assert.equal('xun', longestCommonSubstring('jyaxunmuz', 'mzjawxun'));
    assert.equal('xun', longestCommonSubstring('jyamuzxun', 'mzjawxun'));
  });
});
