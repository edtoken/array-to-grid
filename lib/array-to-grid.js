/*!
 * @description Recursive object extending
 * @author Eduard Titov <editied@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Eduard Titov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';


/**
 * Will create an array (rows) based on an array (elements)
 *
 * Returns a new array
 */
var arrayToGrid = module.exports = function(elements, rowSize, columnSize) {
	if (arguments.length === 0) {
		return []
	}

	if (Object.prototype.toString.call(elements) !== '[object Array]') {
		throw "Elements must be an Array";
	}

	rowSize = rowSize || arrayToGrid.defaultRowSize;
	columnSize = columnSize || arrayToGrid.defaultColumnSize;

	var rows = [];
	var row = [];
	var rowElementsSumScale = 0;


	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		var elementScale = element._scale !== undefined ? element._scale : (elements[i]._scale = columnSize, columnSize);
		element._size = Math.floor(rowSize * elementScale);

		if (rowElementsSumScale + elementScale > 1) {
			rows.push(row);
			row = [element];
			rowElementsSumScale = elementScale;
			continue;
		}

		row.push(element);
		rowElementsSumScale += elementScale;
	}

	if (row.length) {
		rows.push(row);
	}

	return rows;

};

arrayToGrid.prototype.defaultColumnSize = 0.5;
arrayToGrid.prototype.defaultRowSize = 12;