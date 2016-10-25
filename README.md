[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/lei-ns.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lei-ns
[travis-image]: https://img.shields.io/travis/leizongmin/node-lei-ns.svg?style=flat-square
[travis-url]: https://travis-ci.org/leizongmin/node-lei-ns
[coveralls-image]: https://img.shields.io/coveralls/leizongmin/node-lei-ns.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/leizongmin/node-lei-ns?branch=master
[david-image]: https://img.shields.io/david/leizongmin/node-lei-ns.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/node-lei-ns
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/lei-ns.svg?style=flat-square
[download-url]: https://npmjs.org/package/lei-ns
[license-image]: https://img.shields.io/npm/l/lei-ns.svg

# lei-ns

Organizing your code without writing wired variable constructs and helper objects


## Installation

```bash
$ npm install lei-ns --save
```


## Usage

```javascript
'use strict';

const createNamespace = require('lei-ns').create;

// you can specified a object when createNamespace()
const ns = createNamespace({a: {b: 123}});

// merge an object
ns.merge({a: {c: 456}, d: 789});
// get all data
console.log(ns.all());
// => { a: { b: 123, c: 456 }, d: 789 }

// get data
console.log(ns.get('a'));
// => { b: 123, c: 456 }
console.log(ns.get('a.c'));
// => 456

// set data
ns.set('a.d', 321);
// ns.get('a') => { b: 123, c: 456, d: 321 }
ns.set('e.f.g.h.i', true);
// ns.all() => { a: { b: 123, c: 456, d: 321 }, d: 789, { e: { f: { g: { h:  { i: true } } } } } }

// if has specified namespace (value !== undefine)
console.log(ns.has('a'));
// => true
console.log(ns.has('a.a'));
// => false

// delete
ns.delete('a.b');
// => true
// ns.get('a') => { c: 456, d: 321 }
ns.delete('a.b');
// => false (because a.b does not exists now)
```

### Reference

+ `get(path)` - returns value by specified `path`, if `path` does not exist returns `undefined`
+ `has(path)` - returns `true` if the value of passing `path` isn't `undefined`
+ `set(path, value)` - define new `value` by specified `score`
+ `delete(path)` - delete specified `path`
+ `merge(object)` - merge an `object` to the `root path`
+ `mergeTo(path, object)` - merge an `object` to the specified `path`
+ `push(path, value)` - push an item to the specified `path`
+ `pop(path, value)` - pop an item from the specified `path`
+ `all()` - returns the value of `root path`
+ `lock(path)` - lock the specified `path`, prevents all changes
+ `lockAll()` - lock the `root path`, prevents all changes


## License

```
Copyright (c) 2013-2016 Zongmin Lei <leizongmin@gmail.com>
http://ucdok.com

The MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```