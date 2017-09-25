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
		var result = grid([{_scale: 1}], 12);
		JSON.stringify(result).should.be.equal(JSON.stringify([[{_scale: 1, _size: 12}]]))
	});

	it('should create three rows', function() {
		let input = [
			{_scale: 1},
			{_scale: 0.5},
			{_scale: 0.4},
			{_scale: 0.2},
		];
		let output = [
			[{_scale: 1, _size: 12}],
			[{_scale: 0.5, _size: 6}, {_scale: 0.4, _size: 4}],
			[{_scale: 0.2, _size: 2}]
		];

		var result = grid(input, 12);
		JSON.stringify(result).should.be.equal(JSON.stringify(output))
	});

});
