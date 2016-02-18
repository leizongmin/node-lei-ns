/**
 * Namespace Utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

function splitName(n) {
  return String(n || '').trim().split('.');
}

function getExtendibleLeaf(obj, n, initIt) {
  if (obj[n] !== undefined) {
    if (obj[n] && typeof obj[n] === 'object') {
      return obj[n];
    } else {
      return;
    }
  } else {
    if (initIt) {
      return obj[n] = {};
    } else {
      return;
    }
  }
}

function isFrozen(obj) {
  if (obj && typeof obj === 'object') {
    return Object.isFrozen(obj);
  } else {
    return false;
  }
}

function getChild(data, ns) {
  if (ns.length === 1) {
    return data[ns[0]];
  } else {
    var obj = data[ns[0]];
    if (obj === undefined) return obj;
    for (var i = 1, end = ns.length - 1; i < end; i++) {
      obj = getExtendibleLeaf(obj, ns[i], false);
      if (obj === undefined) return obj;
    }
    return obj[ns[i]];
  }
}

function initChild(data, ns) {
  if (ns.length === 1) {
    var ret = getExtendibleLeaf(data, ns[0], true);
    if (ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns[0] + ' = ' + data[ns[0]]);
    } else {
      return ret;
    }
  } else {
    var parent = data;
    if (isFrozen(parent)) {
      throw new TypeError("Can't add property " + ns[0] + ", object is not extensible");
    }
    var obj = data[ns[0]];
    if (obj === undefined) obj = data[ns[0]] = {};
    for (var i = 1; i < ns.length; i++) {
      var n = ns[i];
      var ret = getExtendibleLeaf(obj, n, true);
      if (ret === undefined) {
        throw new TypeError('fail to init because namespace ' + ns.join('.') + ' = ' + obj);
      } else {
        parent = obj;
        if (isFrozen(parent)) {
          throw new TypeError("Can't add property " + n + ", object is not extensible");
        }
        obj = ret;
        if (parent[n] === undefined) {
          throw new TypeError('fail to init because namespace ' + ns.slice(0, i).join('.') + ' = ' + parent);
        }
      }
    }
    return obj;
  }
}

function getLeafs(obj, seen) {
  seen = seen || [];
  var keys = [];
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
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
  }
  return keys;
}

exports.splitName = splitName;
exports.getExtendibleLeaf = getExtendibleLeaf;
exports.getChild = getChild;
exports.initChild = initChild;
exports.getLeafs = getLeafs;
