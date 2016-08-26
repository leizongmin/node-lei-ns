'use strict';

/**
 * Namespace benchmark
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const create = require('../').create;

const ns = create();

function time(title, fn) {
  const t = Date.now();
  fn();
  const s = Date.now();
  let spaces = '';
  const len = 32 - title.length;
  for (let i = 0; i < len; i++) {
    spaces += ' ';
  }
  console.log(`${ title } ${ spaces } spent ${ s - t }ms`);
}

const TIMES = 2000000;

console.log('');
console.log('读取 3层 -------');
ns.set('a.b.c', { x: 1 });
time('ns.get("a.b.c")', function () {
  for (let i = 0; i < TIMES; i++) {
    ns.get('a.b.c');
  }
});
time('all.a.b.c      ', function () {
  const all = ns.all();
  for (let i = 0; i < TIMES; i++) {
    all.a.b.c;
  }
});
console.log('');

console.log('读取 6层 -------');
ns.set('a.b.c.d.e.x', 123);
time('ns.get("a.b.c.d.e.x")', function () {
  for (let i = 0; i < TIMES; i++) {
    ns.get('a.b.c.d.e.x');
  }
});
time('all.a.b.c.d.e.x     ', function () {
  const all = ns.all();
  for (let i = 0; i < TIMES; i++) {
    all.a.b.c.d.e.x;
  }
});
console.log('');

console.log('读取 10层 -------');
ns.set('a.b.c.d.e.f.g.h.i.j', 123);
time('ns.get("a.b.c.d.e.f.g.h.i.j")', function () {
  for (let i = 0; i < TIMES; i++) {
    ns.get('a.b.c.d.e.f.g.h.i.j');
  }
});
time('all.a.b.c.d.e.f.g.h.i.j  ', function () {
  const all = ns.all();
  for (let i = 0; i < TIMES; i++) {
    all.a.b.c.d.e.f.g.h.i.j;
  }
});
console.log('');

console.log('写入 3层 -------');
time('ns.get("u.v.x")', function () {
  for (let i = 0; i < TIMES; i++) {
    ns.set('u.v.x', 123);
  }
});
time('all.u.v.x  ', function () {
  const all = ns.all();
  for (let i = 0; i < TIMES; i++) {
    all.u.v.x = 123;
  }
});
console.log('');

console.log('写入 6层 -------');
time('ns.get("u.v.w.x.y.x")', function () {
  for (let i = 0; i < TIMES; i++) {
    ns.set('u.v.w.x.y.x', 123);
  }
});
time('all.u.v.w.x.y.x  ', function () {
  const all = ns.all();
  for (let i = 0; i < TIMES; i++) {
    all.u.v.w.x.y.x = 123;
  }
});
console.log('');

console.log('写入 10层 -------');
time('ns.get("u.v.w.x.y.z.a.b.c.d")', function () {
  for (let i = 0; i < TIMES; i++) {
    ns.set('u.v.w.x.y.z.a.b.c.d', 123);
  }
});
time('all.u.v.w.x.y.z.a.b.c.d  ', function () {
  const all = ns.all();
  for (let i = 0; i < TIMES; i++) {
    all.u.v.w.x.y.z.a.b.c.d = 123;
  }
});
console.log('');
