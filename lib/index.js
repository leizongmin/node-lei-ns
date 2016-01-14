/**
 * Namespace
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var utils = require('./utils');

function Namespace(initData) {

  var splitName = utils.splitName;
  var getChild = utils.getChild;
  var initChild = utils.initChild;
  var getLeafs = utils.getLeafs;

  var data = {};

  if (initData && typeof initData === 'object') {
    setObject(initData);
  }

  function get(n) {
    return getChild(data, splitName(n));
  }

  function set(n, v) {
    var ns = splitName(n);
    var n = ns.pop();
    var ret = (ns.length > 0 ? initChild(data, ns) : data);
    return ret[n] = v;
  }

  function setObject(obj) {
    var keys = getLeafs(obj);
    var tmpNS = new Namespace(obj);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      set(k, tmpNS.get(k));
    }
  }

  function has(n) {
    return (typeof get(n) !== 'undefined');
  }


  function namespace(n, v) {
    switch (arguments.length) {
    // namespace()
    case 0:
      return data;
    // namespace(x)
    case 1:
      if (n) {
        if (typeof n === 'object') {
          // namespace({a: 1, b: 2})
          return setObject(n);
        } else {
          // namespace('name')
          return get(n);
        }
      } else {
        // namespace(undefined) or namespace(null) or namespace(false)
        return data;
      }
    // namespace(n, v)
    default:
      return set(n, v);
    }
  };

  namespace.data = data;
  namespace.get = get;
  namespace.set = set;
  namespace.setObject = setObject;
  namespace.has = has;

  return namespace;
}


Namespace.utils = utils;
module.exports = exports = new Namespace();
exports.Namespace = Namespace;
