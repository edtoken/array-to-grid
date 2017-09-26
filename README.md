# Array to Grid
Creating a Grid from an Array of elements

[![Build Status](https://api.travis-ci.org/edtoken/array-to-grid.svg?branch=master)](https://travis-ci.org/edtoken/array-to-grid)

[![NPM](https://nodei.co/npm/array-to-grid.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/array-to-grid/)

[![NPM](https://nodei.co/npm-dl/array-to-grid.png?height=3)](https://nodei.co/npm/array-to-grid/)



input
``` 
[
    {_size: 1, ...}, 
    {_size: 0.5, ...}, 
    {_size: 0.4, ...}, 
    {_size: 0.2, ...}
]
```

output
``` 
[
    [{_size: 1, _width: 12, ...}],
    [{_size: 0.5, _width: 6, ...}, {_size: 0.4, _width: 6, ...}],
    [{_size: 0.2, _width: 2, ...}]
]
```

## Install
```
npm install array-to-grid --save
```

## Usage

### Properties
* `  arrayToGrid.defaultColumnSize  ` default column *_size* value
* `  arrayToGrid.defaultRowSize  ` sum of width for 1 row

### Arguments
```
/**
 * @param {Array} elements - The array of elements for grid
 * @param {Integer} [rowSize=12] rowSize - Row size, default 12 (for example bootstrap grid size is 12)
 * @param {Integer} [columnSize=0.5] columnSize - Column size, default 0.5 ( 1/2 of row )
 * Returns a new array
 */
 
arrayToGrid(elements:Array, rowSize:Integer, columnSize:Integer) 
```

### Make a Form
```
/**
 * Сreate a grid for the form
 * Use Bootstrap classNames
 */
 
var arrayToGrid = require('array-to-grid');

var elements = [
    {_size: 1, name: 'fullname'},
    {_size: 0.5, name: 'email'},
    {_size: 0.5, name: 'password'}
];

var rows = arrayToGrid(elements, 12);

var fields = rows.map((row, indx) => {
    return (<div className='row'>
        {row.elements.map((el, elIndx) => {
            return (<div className={'col-xs-' + el._width}>
                <input name={el.name}/>
            </div>)
        })}
    </div>)
});

```

### Make a page blocks
```
import React, {Component} from 'react';
import arrayToGrid from 'array-to-grid';

arrayToGrid.defaultColumnSize = 0.3;
arrayToGrid.defaultRowSize = 12;

const widgets = [
    {_size: 1, data: {title: 'widget-1'}},
    {data: {title: 'widget-2'}},
    {_size: 0.1, data: {title: 'widget-3'}},
    {_size: 0.9, data: {title: 'widget-4'}},
    {data: {title: 'widget-5'}},
    {_size: 0.5, data: {title: 'widget-6'}},
    {_size: 0.3, data: {title: 'widget-7'}},
    {_size: 0.3, data: {title: 'widget-8'}},
    {_size: 0.7, data: {title: 'widget-9'}},
    {_size: 0.9, data: {title: 'widget-10'}},
    {_size: 0.1, data: {title: 'widget-11'}},
];

class Widget extends Component {

    render() {
        return (<span className={this.props.className}>
    <h2>Column</h2>
        <h1>{this.props.title}</h1>
        <h2>{this.props._size}</h2>
        </span>);
    }
}

class Page extends Component {

    render() {
        let renderedWidgets = widgets.filter(w => (!w._size || w._size > 0.5));
        let widgetsGrid = arrayToGrid(renderedWidgets, 12);

        return (<div>
            {widgetsGrid.map((row, rowIndx) => {
                return (<div
                    className='row'
                    key={['row', rowIndx, row.length].join('.')}>
                    
                    <h1>Row</h1>
                    
                    {row.map((el, colIndx) => (
                        <Widget key={['col', rowIndx, colIndx].join('.')}
                                className={'col-xs-' + el._size}
                                title={el.title}
                                _size={el._size}/>)
                    )}
                </div>)
            })}
        </div>)
    }
}
```

## Unit testing
```
npm test
```

## Changelog
[CHANGELOG.md](./CHANGELOG.md)

## License
[MIT](https://github.com/edtoken/array-to-grid/blob/master/LICENSE)
