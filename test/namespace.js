/**
 * Namespace Tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const assert = require('assert');
const Namespace = require('../').Namespace;
const namespace = require('../');

describe('namespace', function () {

  it('ns(n, v)', function () {

    const ns = new Namespace();

    // get #not exists
    assert.deepEqual(ns('a'), undefined);
    assert.deepEqual(ns('b'), undefined);
    assert.deepEqual(ns('b.c'), undefined);
    assert.deepEqual(ns('b.d'), undefined);
    assert.deepEqual(ns('b.d.e'), undefined);

    // set
    assert.deepEqual(ns('a', 123), 123);
    assert.deepEqual(ns('b.c', 456), 456);
    assert.deepEqual(ns('e.f.g', 789), 789);
    assert.deepEqual(ns('h.i.j.k', { l: { m: { n: 111, o: 222 }}}), { l: { m: { n: 111, o: 222 }}});

    // get all
    assert.deepEqual(ns(), {
      a: 123,
      b: {
        c: 456,
      },
      e: {
        f: {
          g: 789,
        },
      },
      h: {
        i: {
          j: {
            k: {
              l: {
                m: {
                  n: 111,
                  o: 222,
                },
              },
            },
          },
        },
      },
    });
    assert.deepEqual(ns(), ns(''));
    assert.deepEqual(ns(), ns(false));
    assert.deepEqual(ns(), ns(null));
    assert.deepEqual(ns(), ns(undefined));

    // get
    assert.deepEqual(ns('a'), 123);
    assert.deepEqual(ns('b'), { c: 456 });
    assert.deepEqual(ns('b.c'), 456);
    assert.deepEqual(ns('e'), { f: { g: 789 }});
    assert.deepEqual(ns('e.f'), { g: 789 });
    assert.deepEqual(ns('e.f.g'), 789);
    assert.deepEqual(ns('h.i.j.k'), { l: { m: { n: 111, o: 222 }}});

    // get #not exists
    assert.deepEqual(ns('a.b'), undefined);
    assert.deepEqual(ns('a.b.c'), undefined);
    assert.deepEqual(ns('a.b.c.e'), undefined);

    // has
    assert.deepEqual(ns.has('a.b'), false);
    assert.deepEqual(ns.has('a.b.c'), false);
    assert.deepEqual(ns.has('a.b.c.e'), false);
    assert.deepEqual(ns.has('a'), true);
    assert.deepEqual(ns.has('b'), true);
    assert.deepEqual(ns.has('b.c'), true);
    assert.deepEqual(ns.has('e'), true);

    // set #fail
    assert.throws(function () {
      ns('a.b', 111);
    }, /fail to init/);
    assert.throws(function () {
      ns('a.b.c', 111);
    }, /fail to init/);
    assert.throws(function () {
      ns('b.c.d', 111);
    }, /fail to init/);
    assert.throws(function () {
      ns('b.c.d.e', 111);
    }, /fail to init/);

    // set #replace
    assert.deepEqual(ns('a', 321), 321);
    assert.deepEqual(ns('b.c', 654), 654);
    assert.deepEqual(ns('e.f', { a: 111, b: 222, c: 333 }), { a: 111, b: 222, c: 333 });
    assert.deepEqual(ns('a'), 321);
    assert.deepEqual(ns('b.c'), 654);
    assert.deepEqual(ns('e.f'), { a: 111, b: 222, c: 333 });

    // set #merge
    const setCombineData = {
      e: {
        f: {
          d: true,
          e: false,
          g: null,
        },
        h: {
          i: {
            j: 'aaa',
          },
          k: 'bbb',
        },
      },
    };
    assert.deepEqual(ns(setCombineData), setCombineData);
    assert.deepEqual(ns('e'), { f: { a: 111, b: 222, c: 333, d: true, e: false, g: null }, h: { i: { j: 'aaa' }, k: 'bbb' }});

  });


  it('get() & set() & delete() & has()', function () {

    const ns = new Namespace();

    // get #not exists
    assert.deepEqual(ns.get('a'), undefined);
    assert.deepEqual(ns.get('b'), undefined);
    assert.deepEqual(ns.get('b.c'), undefined);
    assert.deepEqual(ns.get('b.d'), undefined);
    assert.deepEqual(ns.get('b.d.e'), undefined);

    // set
    assert.deepEqual(ns.set('a', 123), 123);
    assert.deepEqual(ns.set('b.c', 456), 456);
    assert.deepEqual(ns.set('e.f.g', 789), 789);
    assert.deepEqual(ns.set('h.i.j.k', { l: { m: { n: 111, o: 222 }}}), { l: { m: { n: 111, o: 222 }}});

    // get all
    assert.deepEqual(ns.all(), {
      a: 123,
      b: {
        c: 456,
      },
      e: {
        f: {
          g: 789,
        },
      },
      h: {
        i: {
          j: {
            k: {
              l: {
                m: {
                  n: 111,
                  o: 222,
                },
              },
            },
          },
        },
      },
    });

    // get
    assert.deepEqual(ns.get('a'), 123);
    assert.deepEqual(ns.get('b'), { c: 456 });
    assert.deepEqual(ns.get('b.c'), 456);
    assert.deepEqual(ns.get('e'), { f: { g: 789 }});
    assert.deepEqual(ns.get('e.f'), { g: 789 });
    assert.deepEqual(ns.get('e.f.g'), 789);
    assert.deepEqual(ns.get('h.i.j.k'), { l: { m: { n: 111, o: 222 }}});

    // get #not exists
    assert.deepEqual(ns.get('a.b'), undefined);
    assert.deepEqual(ns.get('a.b.c'), undefined);
    assert.deepEqual(ns.get('a.b.c.e'), undefined);

    // set #fail
    assert.throws(function () {
      ns.set('a.b', 111);
    }, /fail to init/);
    assert.throws(function () {
      ns.set('a.b.c', 111);
    }, /fail to init/);
    assert.throws(function () {
      ns.set('b.c.d', 111);
    }, /fail to init/);
    assert.throws(function () {
      ns.set('b.c.d.e', 111);
    }, /fail to init/);

    // set #replace
    assert.deepEqual(ns.set('a', 321), 321);
    assert.deepEqual(ns.set('b.c', 654), 654);
    assert.deepEqual(ns.set('e.f', { a: 111, b: 222, c: 333 }), { a: 111, b: 222, c: 333 });
    assert.deepEqual(ns.get('a'), 321);
    assert.deepEqual(ns.get('b.c'), 654);
    assert.deepEqual(ns.get('e.f'), { a: 111, b: 222, c: 333 });

    // set #merge
    const setCombineData = {
      e: {
        f: {
          d: true,
          e: false,
          g: null,
        },
        h: {
          i: {
            j: 'aaa',
          },
          k: 'bbb',
        },
      },
    };
    assert.deepEqual(ns.merge(setCombineData), setCombineData);
    assert.deepEqual(ns.get('e'), { f: { a: 111, b: 222, c: 333, d: true, e: false, g: null }, h: { i: { j: 'aaa' }, k: 'bbb' }});

    assert.deepEqual(ns.merge({ m: { a: 123 }}), { m: { a: 123 }});
    assert.deepEqual(ns.merge({ m: { b: 456 }}), { m: { b: 456 }});
    assert.deepEqual(ns.merge({ m: { c: 789 }}), { m: { c: 789 }});
    assert.deepEqual(ns.get('m'), { a: 123, b: 456, c: 789 });

    assert.deepEqual(ns.merge({ m2: 'a' }), { m2: 'a' });
    assert.deepEqual(ns.get('m2'), 'a');

    // delete
    assert.deepEqual(ns.delete('e.f.d'), true);
    assert.deepEqual(ns.delete('e.f.d'), false);
    assert.deepEqual(ns.delete('e.f.h'), false);
    assert.deepEqual(ns.delete('e.h.i'), true);
    assert.deepEqual(ns.delete('e.h.i'), false);
    assert.deepEqual(ns.delete('e.h.j'), false);
    assert.deepEqual(ns.get('e'), { f: { a: 111, b: 222, c: 333, e: false, g: null }, h: { k: 'bbb' }});
    assert.deepEqual(ns.delete('e'), true);
    assert.deepEqual(ns.has('e'), false);
    assert.deepEqual(ns.delete('x'), false);

    // set #function
    const setFunctionData = function (a, b) { return a + b; };
    assert.equal(ns.set('x.function', setFunctionData), setFunctionData);
    assert.equal(ns.get('x.function'), setFunctionData);

    // set #array
    const setArrayData = [ 'a', 'b', 'c', 1, 2, 3 ];
    assert.equal(ns.set('x.array', setArrayData), setArrayData);
    assert.equal(ns.get('x.array'), setArrayData);

    // set #object
    const setObjectData = { a: 'a', b: 123, c: false };
    assert.equal(ns.set('x.object', setObjectData), setObjectData);
    assert.equal(ns.get('x.object'), setObjectData);

    // set #circular
    const setCircularData1 = { a: 123, b: 456 };
    const setCircularData2 = { a: true, b: false, c: setCircularData1 };
    setCircularData1.c = setCircularData2;
    assert.deepEqual(ns.set('x.circular', setCircularData1), setCircularData1);

    assert.deepEqual(ns.get('x'), {
      function: setFunctionData,
      array: setArrayData,
      object: setObjectData,
      circular: setCircularData1,
    });

    // merge #circular
    assert.deepEqual(ns.merge(process), process);
    assert.deepEqual(ns.get('version'), process.version);
    assert.deepEqual(ns.get('pid'), process.pid);
    assert.equal(ns.get('argv'), process.argv);

  });

  it('push() & pop()', function () {

    const ns = new Namespace();

    // push: not exists, auto init empty array
    ns.push('a.a', 123);
    ns.push('a.a', 456);
    assert.deepEqual(ns.get('a.a'), [ 123, 456 ]);

    // push: exists array
    ns.set('a.b', [ 456 ]);
    ns.push('a.b', 789);
    ns.push('a.b', 123);
    assert.deepEqual(ns.get('a.b'), [ 456, 789, 123 ]);

    // push: exists, but not an array
    assert.throws(function () {
      ns.set('a.c', { a: 123 });
      ns.push('a.c', 456);
    }, /fail.*push/);

    // pop: not exists, return undefined
    assert.equal(ns.pop('b.a'), undefined);
    assert.equal(ns.pop('b.b'), undefined);

    // pop: exists array
    ns.set('b.a', [ 123, 456, 789 ]);
    assert.equal(ns.pop('b.a'), 789);
    assert.equal(ns.pop('b.a'), 456);

    // pop: exists, but not an array
    assert.throws(function () {
      ns.set('b.b', { a: 123, b: 567 });
      ns.pop('b.b');
    }, /fail.*pop/);

  });

  it('lock() & lockAll()', function () {

    const ns = new Namespace();

    ns.set('a.a.a', 123);
    ns.set('a.a.b', 456);
    ns.set('a.b.c', 789);

    ns.lock('a.a');
    assert.throws(function () {
      ns.set('a.a.a', 111);
    }, /Cannot assign/);
    assert.throws(function () {
      ns.set('a.a.b', 111);
    }, /Cannot assign/);
    assert.throws(function () {
      ns.set('a.a.c', 111);
    }, /not extensible/);
    assert.throws(function () {
      ns.set('a.a.c.d', 111);
    }, /not extensible/);

    ns.set('a.b.c', 999);
    assert.deepEqual(ns.get('a.b.c'), 999);
    ns.set('a.c', 999);
    assert.deepEqual(ns.get('a.c'), 999);

    ns.lock('a.b');
    assert.throws(function () {
      ns.set('a.b.c', 111);
    }, /Cannot assign/);

    ns.lockAll();
    assert.throws(function () {
      ns.set('a.c', 111);
    }, /locked/);
    assert.throws(function () {
      ns.set('d.d', 111);
    }, /locked/);
    console.log(ns.all());

  });

  it('merge() & mergeTo()', function () {

    const ns = new Namespace();

    const data = { a: 123, b: 456 };

    ns.merge(data);
    assert.deepEqual(ns.all(), { a: 123, b: 456 });

    ns.mergeTo('c.c', data);
    assert.deepEqual(ns.get('c.c'), { a: 123, b: 456 });
    assert.deepEqual(ns.get('c'), { c: { a: 123, b: 456 }});

  });

  it('ns & new Namespace() & Namespace() & create() #initData', function () {

    const ns1 = namespace;
    ns1.set('random', Math.random());
    const ns2 = new namespace.Namespace({ random: Math.random() });
    // eslint-disable-next-line
    const ns3 = namespace.Namespace({ random: Math.random() });
    const ns4 = namespace.create({ random: Math.random() });

    assert.notEqual(ns1.get('random'), ns2.get('random'));
    assert.notEqual(ns1.get('random'), ns3.get('random'));
    assert.notEqual(ns1.get('random'), ns4.get('random'));
    assert.notEqual(ns2.get('random'), ns3.get('random'));
    assert.notEqual(ns2.get('random'), ns4.get('random'));
    assert.notEqual(ns3.get('random'), ns4.get('random'));

  });

});
