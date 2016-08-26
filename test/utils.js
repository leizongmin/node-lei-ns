'use strict';

/**
 * Namespace Tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const assert = require('assert');
const utils = require('../lib/utils');

describe('utils', function () {

  it('#getLeafs', function () {

    assert.deepEqual(utils.getLeafs({
      a: 123,
      b: true,
      c: {
        d: false,
        e: {
          f: {
            g: 0,
            h() {},
          },
          i: 111,
        },
        x: null,
      },
      j: 0,
      k: [],
      l: {
        m: 'aaa',
        n: 'bbb',
      },
    }), [ 'a', 'b', 'c.d', 'c.e.f.g', 'c.e.f.h', 'c.e.i', 'c.x', 'j', 'k', 'l.m', 'l.n' ]);

  });

  it('#splitName', function () {

    assert.deepEqual(utils.splitName('a'), [ 'a' ]);
    assert.deepEqual(utils.splitName('a.b'), [ 'a', 'b' ]);
    assert.deepEqual(utils.splitName('a.b.c'), [ 'a', 'b', 'c' ]);
    assert.deepEqual(utils.splitName('a..c'), [ 'a', '', 'c' ]);
    assert.deepEqual(utils.splitName('..'), [ '', '', '' ]);

  });

  it('#getExtendibleLeaf', function () {

    const a = { b: 1, c: { d: 123 }};
    assert.deepEqual(utils.getExtendibleLeaf(a, 'a', true), {});
    assert.deepEqual(utils.getExtendibleLeaf(a, 'b', true), undefined);
    assert.deepEqual(utils.getExtendibleLeaf(a, 'c', true), { d: 123 });

    const b = { b: 1, c: { d: 123 }};
    assert.deepEqual(utils.getExtendibleLeaf(b, 'a', false), undefined);
    assert.deepEqual(utils.getExtendibleLeaf(b, 'b', false), undefined);
    assert.deepEqual(utils.getExtendibleLeaf(b, 'c', false), { d: 123 });

  });

  it('#getChild', function () {

    const a = { b: 1, c: { d: 123 }, e: { f: { g: 456, h: { i: { j: 789 }}}}};
    assert.deepEqual(utils.getChild(a, utils.splitName('')), undefined);
    assert.deepEqual(utils.getChild(a, utils.splitName('x')), undefined);
    assert.deepEqual(utils.getChild(a, utils.splitName('b')), 1);
    assert.deepEqual(utils.getChild(a, utils.splitName('c')), { d: 123 });
    assert.deepEqual(utils.getChild(a, utils.splitName('c.d')), 123);
    assert.deepEqual(utils.getChild(a, utils.splitName('c.x')), undefined);
    assert.deepEqual(utils.getChild(a, utils.splitName('e')), { f: { g: 456, h: { i: { j: 789 }}}});
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f')), { g: 456, h: { i: { j: 789 }}});
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.g')), 456);
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h')), { i: { j: 789 }});
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h.i')), { j: 789 });
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h.i.j')), 789);
    assert.deepEqual(utils.getChild(a, utils.splitName('e.f.h.x')), undefined);
    assert.deepEqual(a, { b: 1, c: { d: 123 }, e: { f: { g: 456, h: { i: { j: 789 }}}}});

    const b = {};
    assert.deepEqual(utils.getChild(b, utils.splitName('a')), undefined);
    assert.deepEqual(utils.getChild(b, utils.splitName('a.b')), undefined);
    assert.deepEqual(utils.getChild(b, utils.splitName('a.b.c')), undefined);
    assert.deepEqual(b, {});

    const c = { a: 123 };
    assert.deepEqual(utils.getChild(c, utils.splitName('a')), 123);
    assert.deepEqual(utils.getChild(c, utils.splitName('a.d')), undefined);
    assert.deepEqual(utils.getChild(c, utils.splitName('a.d.e')), undefined);
    assert.deepEqual(c, { a: 123 });

  });

  it('#initChild', function () {

    const a = { b: 1, c: { d: 123 }, e: { f: { g: 456, h: { i: { j: 789 }}}}};
    assert.deepEqual(utils.initChild(a, utils.splitName('')), {});
    assert.deepEqual(utils.initChild(a, utils.splitName('x')), {});
    assert.throws(function () {
      utils.initChild(a, utils.splitName('b'));
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('c')), { d: 123 });
    assert.throws(function () {
      utils.initChild(a, utils.splitName('c.d'));
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('c.x')), {});
    assert.deepEqual(utils.initChild(a, utils.splitName('e')), { f: { g: 456, h: { i: { j: 789 }}}});
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f')), { g: 456, h: { i: { j: 789 }}});
    assert.throws(function () {
      assert.deepEqual(utils.initChild(a, utils.splitName('e.f.g')), 456);
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h')), { i: { j: 789 }});
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h.i')), { j: 789 });
    assert.throws(function () {
      assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h.i.j')), 789);
    }, /fail to init/);
    assert.deepEqual(utils.initChild(a, utils.splitName('e.f.h.x')), {});
    assert.deepEqual(a, { '': {}, b: 1, c: { d: 123, x: {}}, e: { f: { g: 456, h: { i: { j: 789 }, x: {}}}}, x: {}});

    const b = {};
    assert.deepEqual(utils.initChild(b, utils.splitName('a')), {});
    assert.deepEqual(utils.initChild(b, utils.splitName('a.b')), {});
    assert.deepEqual(utils.initChild(b, utils.splitName('a.b.c')), {});
    assert.deepEqual(b, { a: { b: { c: {}}}});

    const c = { a: 123 };
    assert.throws(function () {
      utils.initChild(c, utils.splitName('a'));
    }, /fail to init/);
    assert.throws(function () {
      utils.initChild(c, utils.splitName('a.d'));
    }, /Cannot (assign|create)/);
    assert.throws(function () {
      utils.initChild(c, utils.splitName('a.d.e'));
    }, /Cannot (assign|create)/);
    assert.deepEqual(c, { a: 123 });

    const d = { a: 123 };
    Object.freeze(d);
    assert.throws(function () {
      utils.initChild(d, utils.splitName('a.b'));
    }, /not extensible/);

  });

});
