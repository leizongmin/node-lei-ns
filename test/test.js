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

    console.log(ns.data);
  });

})