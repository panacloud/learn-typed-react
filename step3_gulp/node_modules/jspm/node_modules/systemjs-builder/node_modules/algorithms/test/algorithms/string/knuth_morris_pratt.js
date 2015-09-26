'use strict';

var knuthMorrisPratt = require('../../..').String.knuthMorrisPratt,
    assert = require('assert');

describe('Knuth-Morris-Pratt', function () {
  it('should verify if a pattern is contained in some text (or array)',
    function () {
      var text = 'A string matching algorithm wants to find the starting' +
        'index m in string S[] that matches the search word W[].The most' +
        ' straightforward algorithm is to look for a character match at ' +
        'successive values of the index m, the position in the string be' +
        'ing searched, i.e. S[m]. If the index m reaches the end of the ' +
        'string then there is no match, in which case the search is said' +
        'to "fail". At each position m the algorithm first checks for eq' +
        'uality of the first character in the searched for word, i.e. S[' +
        'm] =? W[0]. If a match is found, the algorithm tests the other ' +
        'characters in the searched for word by checking successive valu' +
        'es of the word position index, i. The algorithm retrieves the c' +
        'haracter W[i] in the searched for word and checks for equality ' +
        'of the expression S[m+i] =? W[i]. If all successive characters ' +
        'match in W at position m then a match is found at that position' +
        ' in the search string. (Wikipedia, 2014): https://en.wikipedia.' +
        'org/wiki/Knuth-Morris-Pratt_algorithm';
      var pattern = 'https://en.wikipedia.org/wiki/Knuth-Morris-Pratt_al' +
        'gorithm';

      assert.equal(knuthMorrisPratt(text, pattern), 915);

      pattern = '(https://en.wikipedia.org/wiki/Knuth-Morris-Pratt_algorithm';

      assert.equal(knuthMorrisPratt(text, pattern), text.length);


      var arrayText = [3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 4];
      var arrayPattern = [8, 9, 8];

      assert.equal(knuthMorrisPratt(arrayText, arrayPattern), 5);

      arrayPattern = [];

      assert.equal(knuthMorrisPratt(arrayText, arrayPattern), arrayText.length);
    });
});
