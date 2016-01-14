/**
 * Namespace Utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

function splitName(n) {
  return String(n).trim().split('.');
}

function getProp(obj, n, initIt) {
  if (n in obj) {
    if (obj[n] && typeof obj[n] === 'object') {
      return obj[n];
    } else {
      throw new TypeError('fail to init because namespace ' + n + ' = ' + obj[n]);
    }
  } else {
    if (initIt) {
      return obj[n] = {};
    } else {
      return;
    }
  }
}

function getChild(data, ns) {
  if (ns.length === 1) {
    return getProp(data, ns[0], false);
  } else {
    var obj = data;
    for (var i = 1; i < ns.length; i++) {
      obj = getProp(obj, ns[i], false);
      if (obj === undefined) return obj;
    }
    return obj;
  }
}

function initChild(data, ns) {
  if (ns.length === 1) {
    return getProp(data, ns[0], true);
  } else {
    var obj = data;
    for (var i = 1; i < ns.length; i++) {
      obj = getProp(obj, ns[i], true);
    }
    return obj;
  }
}

function getLeafs(obj, seen) {
  seen = seen || [];
  var keys = [];
  for (var i in obj) {
    var c = obj[i];
    if (c) {
      if (typeof c === 'object') {
        if (seen.indexOf(c) !== -1) continue;
        seen.push(c);
        if (Array.isArray(c)) {
          keys.push(i);
        }
      } else {
        keys.push(i);
      }
      var childKeys = getLeafs(c, seen);
      for (var j = 0; j < childKeys.length; j++) {
        keys.push(i + '.' + childKeys[j]);
      }
    } else {
      keys.push(i);
    }
  }
  return keys;
}

exports.splitName = splitName;
exports.getProp = getProp;
exports.getChild = getChild;
exports.initChild = initChild;
exports.getLeafs = getLeafs;
