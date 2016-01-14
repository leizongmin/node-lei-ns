/**
 * Namespace Utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var assert = require('assert');
var utils = require('../lib/utils');

describe('utils', function () {

  it('#getLeafs', function () {

    var data = {
      a: 123,
      b: true,
      c: {
        d: false,
        e: {
          f: {
            g: 0,
            h: function () {}
          },
          i: 111
        }
      },
      j: 0,
      k: [],
    };
    var ret = utils.getLeafs(data);
    //console.log(ret);

    assert.deepEqual(ret, [ 'a', 'b', 'c.d', 'c.e.f.g', 'c.e.f.h', 'c.e.i', 'j', 'k' ]);

  });

  it('#splitName', function () {

    assert.deepEqual(utils.splitName(), ['']);
    assert.deepEqual(utils.splitName(undefined), ['']);
    assert.deepEqual(utils.splitName(null), ['']);
    assert.deepEqual(utils.splitName(false), ['']);

    assert.deepEqual(utils.splitName('a'), ['a']);
    assert.deepEqual(utils.splitName('a.b'), ['a', 'b']);
    assert.deepEqual(utils.splitName('a.b.c'), ['a', 'b', 'c']);
    assert.deepEqual(utils.splitName('a..c'), ['a', '', 'c']);
    assert.deepEqual(utils.splitName('..'), ['', '', '']);

  });

  it('#getProp', function () {

    var a = {b: 1, c: {d: 123}};
    assert.deepEqual(utils.getProp(a, 'a', true), {});
    assert.throws(function () {
      utils.getProp(a, 'b', true);
    }, /fail to init/);
    assert.deepEqual(utils.getProp(a, 'c', true), {d: 123});

    var b = {b: 1, c: {d: 123}};
    assert.deepEqual(utils.getProp(b, 'a', false), undefined);
    assert.throws(function () {
      utils.getProp(b, 'b', false);
    }, /fail to init/);
    assert.deepEqual(utils.getProp(b, 'c', false), {d: 123});

  });

  it('#getChild', function () {

    var a = {b: 1, c: {d: 123}, e: {f: {g: 456, h: {i: {j: 789}}}}};
    assert.deepEqual(utils.getChild(a, utils.splitName('')), undefined);
    assert.deepEqual(utils.getChild(a, utils.splitName('x')), undefined);
    assert.deepEqual(utils.getChild(a, utils.splitName('b')), 1);
    assert.deepEqual(utils.getChild(a, utils.splitName('c')), {d: 123});
    assert.deepEqual(utils.getChild(a, utils.splitName('c.d')), 123);
    assert.deepEqual(utils.getChild(a, utils.splitName('c.x')), undefined);
    assert.deepEqual(utils.getChild(a, utils.splitName('e')), {f: {g: 456, h: {i: {j: 789}}}});
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f')), {g: 456, h: {i: {j: 789}}});
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.g')), 456);
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h')), {i: {j: 789}});
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h.i')), {j: 789});
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h.i.j')), 789);
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h.x')), undefined);

  });

});