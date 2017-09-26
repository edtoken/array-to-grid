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
 * this software and associated documentation files (the 'Software'), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
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
 * @param {Array} elements - The array of elements for grid
 * @param {Integer} [rowSize=12] rowSize - Row size, default 12 (for example bootstrap grid size is 12)
 * @param {Integer} [columnSize=0.5] columnSize - Column size, default 0.5 ( 1/2 of row )
 * Returns a new array
 */
var arrayToGrid = module.exports = function(elements, rowSize, columnSize) {
    if (arguments.length === 0) {
        return [];
    }

    if (Object.prototype.toString.call(elements) !== '[object Array]') {
        throw 'Elements must be an Array';
    }

    rowSize = rowSize || arrayToGrid.defaultRowSize;
    columnSize = columnSize || arrayToGrid.defaultColumnSize;

    var rows = [];
    var row = [];
    var rowElementsSumSize = 0;

    for (var i = 0; i < elements.length; i++) {

        var element = elements[i];
        var elementScale = element._size !== undefined ? element._size : (elements[i]._size = columnSize, columnSize);

        element._width = Math.floor(rowSize * elementScale);

        if (rowElementsSumSize + elementScale > 1) {
            rows.push(row);
            row = [element];
            rowElementsSumSize = elementScale;
            continue;
        }

        row.push(element);
        rowElementsSumSize += elementScale;
    }

    if (row.length) {
        rows.push(row);
    }

    return rows;

};

arrayToGrid.defaultColumnSize = 0.5;
arrayToGrid.defaultRowSize = 12;
