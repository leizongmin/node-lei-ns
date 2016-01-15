/**
 * Namespace Tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var assert = require('assert');
var Namespace = require('../').Namespace;
var namespace = require('../');

describe('namespace', function () {

  it('ns(n, v)', function () {

    var ns = new Namespace();

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
    assert.deepEqual(ns('h.i.j.k', {l: {m: {n: 111, o: 222}}}), {l: {m: {n: 111, o: 222}}});

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
    assert.deepEqual(ns('b'), {c: 456});
    assert.deepEqual(ns('b.c'), 456);
    assert.deepEqual(ns('e'), {f: {g: 789}});
    assert.deepEqual(ns('e.f'), {g: 789});
    assert.deepEqual(ns('e.f.g'), 789);
    assert.deepEqual(ns('h.i.j.k'), {l: {m: {n: 111, o: 222}}});

    // get #not exists
    assert.deepEqual(ns('a.b'), undefined);
    assert.deepEqual(ns('a.b.c'), undefined);
    assert.deepEqual(ns('a.b.c.e'), undefined);

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
    assert.deepEqual(ns('e.f', {a: 111, b: 222, c: 333}), {a: 111, b: 222, c: 333})
    assert.deepEqual(ns('a'), 321);
    assert.deepEqual(ns('b.c'), 654);
    assert.deepEqual(ns('e.f'), {a: 111, b: 222, c: 333});

    // set #merge
    var setCombineData = {
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
      }
    };
    assert.deepEqual(ns(setCombineData), setCombineData);
    assert.deepEqual(ns('e'), {f: {a: 111, b: 222, c: 333, d: true, e: false, g: null}, h: {i: {j: 'aaa'}, k: 'bbb'}});

  });


  it('get() & set() & delete() & has()', function () {

    var ns = new Namespace();

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
    assert.deepEqual(ns.set('h.i.j.k', {l: {m: {n: 111, o: 222}}}), {l: {m: {n: 111, o: 222}}});

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
    assert.deepEqual(ns.get('b'), {c: 456});
    assert.deepEqual(ns.get('b.c'), 456);
    assert.deepEqual(ns.get('e'), {f: {g: 789}});
    assert.deepEqual(ns.get('e.f'), {g: 789});
    assert.deepEqual(ns.get('e.f.g'), 789);
    assert.deepEqual(ns.get('h.i.j.k'), {l: {m: {n: 111, o: 222}}});

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
    assert.deepEqual(ns.set('e.f', {a: 111, b: 222, c: 333}), {a: 111, b: 222, c: 333})
    assert.deepEqual(ns.get('a'), 321);
    assert.deepEqual(ns.get('b.c'), 654);
    assert.deepEqual(ns.get('e.f'), {a: 111, b: 222, c: 333});

    // set #merge
    var setCombineData = {
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
      }
    };
    assert.deepEqual(ns.merge(setCombineData), setCombineData);
    assert.deepEqual(ns.get('e'), {f: {a: 111, b: 222, c: 333, d: true, e: false, g: null}, h: {i: {j: 'aaa'}, k: 'bbb'}});

    // delete
    assert.deepEqual(ns.delete('e.f.d'), true);
    assert.deepEqual(ns.delete('e.f.d'), false);
    assert.deepEqual(ns.delete('e.f.h'), false);
    assert.deepEqual(ns.delete('e.h.i'), true);
    assert.deepEqual(ns.delete('e.h.i'), false);
    assert.deepEqual(ns.delete('e.h.j'), false);
    assert.deepEqual(ns.get('e'), {f: {a: 111, b: 222, c: 333, e: false, g: null}, h: {k: 'bbb'}});

    // set #function
    var setFunctionData = function (a, b) { return a + b; };
    assert.equal(ns.set('x.function', setFunctionData), setFunctionData);
    assert.equal(ns.get('x.function'), setFunctionData);

    // set #array
    var setArrayData = ['a', 'b', 'c', 1, 2, 3];
    assert.equal(ns.set('x.array', setArrayData), setArrayData);
    assert.equal(ns.get('x.array'), setArrayData);

    // set #object
    var setObjectData = {a: 'a', b: 123, c: false};
    assert.equal(ns.set('x.object', setObjectData), setObjectData);
    assert.equal(ns.get('x.object'), setObjectData);

    // set #circular
    var setCircularData1 = {a: 123, b: 456};
    var setCircularData2 = {a: true, b: false, c: setCircularData1};
    setCircularData1.c = setCircularData2;
    assert.deepEqual(ns.set('x.circular', setCircularData1), setCircularData1);

    assert.deepEqual(ns.get('x'), {
      function: setFunctionData,
      array: setArrayData,
      object: setObjectData,
      circular: setCircularData1
    });

    // merge #circular
    assert.deepEqual(ns.merge(process), process);
    assert.deepEqual(ns.get('version'), process.version);
    assert.deepEqual(ns.get('pid'), process.pid);
    assert.equal(ns.get('argv'), process.argv);

  });

  it('ns & new Namespace() & Namespace() & create() #initData', function () {

    var ns1 = namespace;
    ns1.set('random', Math.random());
    var ns2 = new namespace.Namespace({random: Math.random()});
    var ns3 = namespace.Namespace({random: Math.random()});
    var ns4 = namespace.create({random: Math.random()});

    assert.notEqual(ns1.get('random'), ns2.get('random'));
    assert.notEqual(ns1.get('random'), ns3.get('random'));
    assert.notEqual(ns1.get('random'), ns4.get('random'));
    assert.notEqual(ns2.get('random'), ns3.get('random'));
    assert.notEqual(ns2.get('random'), ns4.get('random'));
    assert.notEqual(ns3.get('random'), ns4.get('random'));

  });

});
