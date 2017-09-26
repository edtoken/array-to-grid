'use strict';

var should = require('should');
var grid = require('../index');

describe('deep-extend', function() {

    it('should return empty rows', function() {
        var result = grid();
        result.should.be.empty();
    });

    it('should raise if elements is not array', function() {
        try {
            var result = grid(undefined);

            throw "raise should raise if elements is not array";

        } catch (e) {
            String(e).should.be.equal('Elements must be an Array');
        }

    });

    it('should calc element size full row', function() {
        var result = grid([{_size: 1}], 12);
        JSON.stringify(result).should.be.equal(JSON.stringify([[{_size: 1, _width: 12}]]))
    });

    it('should set default column size', function() {
        var input = [
            {},
            {},
            {},
            {}
        ];
        var output = [
            [{_size: 0.5, _width: 6}, {_size: 0.5, _width: 6}],
            [{_size: 0.5, _width: 6}, {_size: 0.5, _width: 6}]
        ];

        var result = grid(input, 12);
        JSON.stringify(result).should.be.equal(JSON.stringify(output))
    });

    it('should create three rows', function() {
        var input = [
            {_size: 1},
            {_size: 0.5},
            {_size: 0.4},
            {_size: 0.2}
        ];
        var output = [
            [{_size: 1, _width: 12}],
            [{_size: 0.5, _width: 6}, {_size: 0.4, _width: 4}],
            [{_size: 0.2, _width: 2}]
        ];

        var result = grid(input, 12);
        JSON.stringify(result).should.be.equal(JSON.stringify(output))
    });

});
