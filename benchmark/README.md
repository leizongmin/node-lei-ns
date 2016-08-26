# Benchmark

Run **5,000,000** times test, the first result is operate in this module,
the second result is operate in object attributes.

+ Read: 80x slow
+ Write: 250x slow

```
Read (depth=3, times=5,000,000)
ns.get("a.b.c")                   spent 669ms
all.a.b.c                         spent 13ms

Read (depth=6, times=5,000,000)
ns.get("a.b.c.d.e.x")             spent 854ms
all.a.b.c.d.e.x                   spent 11ms

Read (depth=10, times=5,000,000)
ns.get("a.b.c.d.e.f.g.h.i.j")     spent 1103ms
all.a.b.c.d.e.f.g.h.i.j           spent 12ms

Write (depth=3, times=5,000,000)
ns.get("u.v.x")                   spent 2133ms
all.u.v.x                         spent 11ms

Write (depth=6, times=5,000,000)
ns.get("u.v.w.x.y.x")             spent 3495ms
all.u.v.w.x.y.x                   spent 14ms

Write (depth=10, times=5,000,000)
ns.get("u.v.w.x.y.z.a.b.c.d")     spent 4260ms
all.u.v.w.x.y.z.a.b.c.d           spent 10ms
```
