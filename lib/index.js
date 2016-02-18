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

  function get(n) {
    return getChild(namespace.data, splitName(n));
  }

  function all() {
    return namespace.data;
  }

  function set(n, v) {
    var ns = splitName(n);
    var n = ns.pop();
    var ret = (ns.length > 0 ? initChild(namespace.data, ns) : namespace.data);
    return ret[n] = v;
  }

  function merge(obj) {
    var keys = getLeafs(obj);
    var tmpNS = new Namespace();
    tmpNS.data = obj;
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      set(k, tmpNS.get(k));
    }
    return obj;
  }

  function has(n) {
    return (typeof get(n) !== 'undefined');
  }

  function del(n) {
    var ns = splitName(n);
    var n = ns.pop();
    var obj = (ns.length > 0 ? getChild(namespace.data, ns) : namespace.data);
    var exists = (obj[n] !== undefined);
    delete obj[n];
    return exists;
  }

  function push(n, v) {
    var data = get(n);
    if (data && !Array.isArray(data)) {
      throw new TypeError('fail to push item because namespace `' + n + '` is not an array');
    }
    if (!data) {
      set(n, data = []);
    }
    return data.push(v);
  }

  function pop(n) {
    var data = get(n);
    if (data) {
      if (!Array.isArray(data)) {
        throw new TypeError('fail to pop item because namespace `' + n + '` is not an array');
      }
      return data.pop();
    }
  }


  function namespace(n, v) {
    switch (arguments.length) {
    // namespace()
    case 0:
      return namespace.data;
    // namespace(x)
    case 1:
      if (n) {
        if (typeof n === 'object') {
          // namespace({a: 1, b: 2})
          return merge(n);
        } else {
          // namespace('name')
          return get(n);
        }
      } else {
        // namespace(undefined) or namespace(null) or namespace(false)
        return namespace.data;
      }
    // namespace(n, v)
    default:
      return set(n, v);
    }
  };


  namespace.data = {};
  namespace.get = get;
  namespace.all = all;
  namespace.set = set;
  namespace.merge = merge;
  namespace.has = has;
  namespace.delete = del;
  namespace.push = push;
  namespace.pop = pop;


  if (initData && typeof initData === 'object' && !Array.isArray(initData)) {
    merge(initData);
  }

  return namespace;
}


Namespace.utils = utils;
module.exports = exports = new Namespace();
exports.Namespace = Namespace;
exports.create = Namespace;
