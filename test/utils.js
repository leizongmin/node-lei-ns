/**
 * Namespace Tests
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

  it('#getExtendibleLeaf', function () {

    var a = {b: 1, c: {d: 123}};
    assert.deepEqual(utils.getExtendibleLeaf(a, 'a', true), {});
    assert.deepEqual(utils.getExtendibleLeaf(a, 'b', true), undefined);
    assert.deepEqual(utils.getExtendibleLeaf(a, 'c', true), {d: 123});

    var b = {b: 1, c: {d: 123}};
    assert.deepEqual(utils.getExtendibleLeaf(b, 'a', false), undefined);
    assert.deepEqual(utils.getExtendibleLeaf(b, 'b', false), undefined);
    assert.deepEqual(utils.getExtendibleLeaf(b, 'c', false), {d: 123});

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
    assert.deepEqual(a, {b: 1, c: {d: 123}, e: {f: {g: 456, h: {i: {j: 789}}}}});

    var b = {};
    assert.deepEqual(utils.getChild(b, utils.splitName('a')), undefined);
    assert.deepEqual(utils.getChild(b, utils.splitName('a.b')), undefined);
    assert.deepEqual(utils.getChild(b, utils.splitName('a.b.c')), undefined);
    assert.deepEqual(b, {});

    var c = {a: 123};
    assert.deepEqual(utils.getChild(c, utils.splitName('a')), 123);
    assert.deepEqual(utils.getChild(c, utils.splitName('a.d')), undefined);
    assert.deepEqual(utils.getChild(c, utils.splitName('a.d.e')), undefined);
    assert.deepEqual(c, {a: 123});

  });

  it('#initChild', function () {

    var a = {b: 1, c: {d: 123}, e: {f: {g: 456, h: {i: {j: 789}}}}};
    assert.deepEqual(utils.initChild(a, utils.splitName('')), {});
    assert.deepEqual(utils.initChild(a, utils.splitName('x')), {});
    assert.throws(function () {
      utils.initChild(a, utils.splitName('b'));
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('c')), {d: 123});
    assert.throws(function () {
      utils.initChild(a, utils.splitName('c.d'));
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('c.x')), {});
    assert.deepEqual(utils.initChild(a, utils.splitName('e')), {f: {g: 456, h: {i: {j: 789}}}});
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f')), {g: 456, h: {i: {j: 789}}});
    assert.throws(function () {
      assert.deepEqual(utils.initChild(a, utils.splitName('e.f.g')), 456);
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h')), {i: {j: 789}});
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h.i')), {j: 789});
    assert.throws(function () {
      assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h.i.j')), 789);
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h.x')), {});
    assert.deepEqual(a, {'': {}, b: 1, c: {d: 123, x: {}}, e: {f: {g: 456, h: {i: {j: 789}, x: {}}}}, x: {}});

    var b = {};
    assert.deepEqual(utils.initChild(b, utils.splitName('a')), {});
    assert.deepEqual(utils.initChild(b, utils.splitName('a.b')), {});
    assert.deepEqual(utils.initChild(b, utils.splitName('a.b.c')), {});
    assert.deepEqual(b, {a: {b: {c: {}}}});

    var c = {a: 123};
    assert.throws(function () {
      utils.initChild(c, utils.splitName('a'));
    }, /fail to init/);
    assert.throws(function () {
      utils.initChild(c, utils.splitName('a.d'));
    }, /fail to init/);
    assert.throws(function () {
      utils.initChild(c, utils.splitName('a.d.e'));
    }, /fail to init/);
    assert.deepEqual(c, {a: 123});

  });

});