/**
 * Namespace
 *
 * @author 老雷<leizongmin@gmail.com>
 */


/**
 * 创建一个命名空间
 *
 * @return {Function}
 */
function Namespace () {
  // 命名空间的数据
  var namespaceData = namespace.data = {};
  /**
   * 读取或设置命名空间，并返回当前命名空间
   *
   * @param {String} ns
   * @param {Object} val
   */
  function namespace (ns, val) {
    
    // 命名空间为空表示直接返回顶级
    if (arguments.length === 0 || ns.length < 1) return namespaceData;

    var _ns = ns.split('.');
    if (arguments.length === 1) {
      // 取值
      var info = getChildValue(namespaceData, _ns);
      if (info[0]) {
        return info[1];
      } else {
        return undefined;
      }
    } else {
      // 设置值
      if (_ns.length === 1) {
        return namespaceData[ns] = val;
      } else {
        var last = _ns.pop();
        var info = getChildValue(namespaceData, _ns);
        if (!info[0]) {
          // 命名空间不存在，需要创建
          createChilds(info[1], info[2]);
          return namespace(ns, val);
        } else {
          return info[1][last] = val;
        }
      }
    }
  };

  return namespace;
};

/**
 * 取对象的属性
 *
 * @param {Object} obj   对象
 * @param {Array} childs 属性名数组
 * @return {Array} 成功返回: [true, 属性值]
 *                 失败返回: [false, 最后一个存在的属性值, 剩余未匹配的属性名数组]
 */
function getChildValue (obj, childs) {
  if (childs && childs.length > 0) {
    for (var i = 0, len = childs.length; i < len; i++) {
      var c = obj[childs[i]];
      if (obj && typeof(c) !== 'undefined') {
        obj = c;
      } else {
        return [false, obj, childs.slice(i)];
      }
    }
  }
  return [true, obj];
}

/**
 * 创建子属性
 *
 * @param {Object} obj
 * @param {Array} childs
 */
function createChilds (obj, childs) {
  if (childs && childs.length > 0) {
    for (var i = 0, len = childs.length; i < len; i++) {
      obj[childs[i]] = {};
      obj = obj[childs[i]];
    }
  }
  return obj;
}

exports = module.exports = Namespace();
exports.Namespace = Namespace;
