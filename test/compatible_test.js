/**
 * Tests
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var should = require('should');
var ns = require('../');

describe('namespace', function () {

  it('一般情况', function () {
    should.equal(ns('a'), undefined);
    should.equal(ns('a.b'), undefined);
    should.equal(ns('a.b.c'), undefined);

    ns('a', {b: 123, c: 456}).should.eql({b: 123, c: 456});
    ns('a').should.eql({b: 123, c: 456});
    ns('a.b').should.equal(123);
    ns('a.c').should.equal(456);
    should.equal(ns('a.b.c.d'), undefined);

    ns('a.b', {e: 111}).should.eql({e: 111});
    ns('a.b').should.eql({e: 111});
    ns('a.b.e').should.equal(111);

    ns('c.d.e.f.g', 456).should.equal(456);
    ns('c').should.eql({d: {e: {f: {g: 456}}}});

    ns('c.d.e', 444).should.equal(444);
    ns('c').should.eql({d: {e: 444}});

    ns('').should.eql({a: {b: {e: 111}, c: 456}, c: {d: {e: 444 }}});
    ns().should.eql({a: {b: {e: 111}, c: 456}, c: {d: {e: 444 }}});

    ns({b: 456, d: 789, e: {f: 123}});
    ns().should.eql({a: {b: {e: 111}, c: 456}, b:456, c: {d: {e: 444 }}, d: 789, e: {f: 123}});

    console.log(ns.data);
  });

  it('不同方式创建', function () {
    var a = ns.Namespace();
    a('a.a', 123);
    var b = new ns.Namespace();
    b('a.a', 456);
    a('a.a').should.equal(123);
    b('a.a').should.equal(456);

    console.log(a.data);
    console.log(b.data);
  });

  it('指定初始化数据', function () {
    var data = {
      a: 123456,
      b: {
        c: 7890,
        e: 11111
      }
    };
    var a = new ns.Namespace(data);
    a().should.eql(data);
    a('a').should.equal(data.a);
    a('b').should.equal(data.b);
    a('b.c').should.equal(data.b.c);

    console.log(a.data);
  });

})