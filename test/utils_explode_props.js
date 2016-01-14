/**
 * Namespace Utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var assert = require('assert');
var utils = require('../lib/utils');

describe('explodeProps', function () {

  it('#1', function () {

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
    var ret = utils.explodeProps(data);
    console.log(ret);

    assert.deepEqual(ret, [ 'a', 'b', 'c.d', 'c.e.f.g', 'c.e.f.h', 'c.e.i', 'j', 'k' ]);

  });

});