'use strict';

/**
 * Namespace
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const utils = require('./utils');

function Namespace(initData) {

  const splitName = utils.splitName;
  const getChild = utils.getChild;
  const initChild = utils.initChild;
  const getLeafs = utils.getLeafs;

  function get(n) {
    return getChild(namespace.data, splitName(n));
  }

  function all() {
    return namespace.data;
  }

  function set(n, v) {
    if (namespace.__isLocked) {
      throw new Error('fail to change namespace `' + n + '` because it has been locked');
    }
    const ns = splitName(n);
    // eslint-disable-next-line
    n = ns.pop();
    const ret = (ns.length > 0 ? initChild(namespace.data, ns) : namespace.data);
    ret[n] = v;
    return v;
  }

  function _mergeTo(prefix, obj) {
    const keys = getLeafs(obj);
    const tmpNS = new Namespace();
    tmpNS.data = obj;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      set(prefix + k, tmpNS.get(k));
    }
    return obj;
  }

  function merge(obj) {
    return _mergeTo('', obj);
  }

  function mergeTo(n, obj) {
    return _mergeTo(n + '.', obj);
  }

  function has(n) {
    return (typeof get(n) !== 'undefined');
  }

  function del(n) {
    const ns = splitName(n);
    // eslint-disable-next-line
    n = ns.pop();
    const obj = (ns.length > 0 ? getChild(namespace.data, ns) : namespace.data);
    const exists = (obj[n] !== undefined);
    delete obj[n];
    return exists;
  }

  function push(n, v) {
    let data = get(n);
    if (data && !Array.isArray(data)) {
      throw new TypeError('fail to push item because namespace `' + n + '` is not an array');
    }
    if (!data) {
      set(n, data = []);
    }
    return data.push(v);
  }

  function pop(n) {
    const data = get(n);
    if (data) {
      if (!Array.isArray(data)) {
        throw new TypeError('fail to pop item because namespace `' + n + '` is not an array');
      }
      return data.pop();
    }
  }

  function lock(n) {
    return Object.freeze(get(n));
  }

  function lockAll() {
    const data = all();
    for (const i in data) {
      lock(i);
    }
    namespace.__isLocked = true;
    return Object.freeze(data);
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
        }
        // namespace('name')
        return get(n);
      }
      // namespace(undefined) or namespace(null) or namespace(false)
      return namespace.data;
    // namespace(n, v)
    default:
      return set(n, v);
    }
  }


  namespace.data = {};
  namespace.get = get;
  namespace.all = all;
  namespace.set = set;
  namespace.merge = merge;
  namespace.mergeTo = mergeTo;
  namespace.has = has;
  namespace.delete = del;
  namespace.push = push;
  namespace.pop = pop;
  namespace.lock = lock;
  namespace.lockAll = lockAll;


  if (initData && typeof initData === 'object' && !Array.isArray(initData)) {
    merge(initData);
  }

  return namespace;
}


Namespace.utils = utils;
module.exports = exports = new Namespace();
exports.Namespace = Namespace;
exports.create = Namespace;
