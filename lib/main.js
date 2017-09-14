'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlMix = exports.remove = exports.contains = exports.pick = exports.set = exports.get = undefined;

var _type = require('./type');

var _base = require('./base');

/**
 * get attribute from path, return undefined when no such path
 * @param  {Object} obj  
 * @param  {String} path like: 'a.b.c.0.e'
 * @return {any}
 */
var get = exports.get = function get(obj, path, defaultValue) {
  if (!(0, _type.isPlainObject)(obj) && !(0, _type.isArray)(obj)) return undefined;
  if (!path) return obj;
  //compatible with lodash style
  path = path.replace(/\[|\]\./g, '.');

  var pathArray = path.split('.');
  var p = void 0;
  var v = obj;
  while (p = pathArray.shift()) {
    v = v[p];
    if ((0, _type.isUndefined)(v)) return defaultValue;
  }
  return v;
};

var set = exports.set = function set(obj, path, value) {
  if (!(0, _type.isPlainObject)(obj)) return undefined;

  //compatible with lodash style
  path = path.replace(/\[|\]\./g, '.');

  var pathArray = path.split('.');
  var p = void 0;
  var v = obj;

  for (var i = 0; i < pathArray.length; i++) {
    var _p = pathArray[i];
    if (i >= pathArray.length - 1) {
      v[_p] = value;
    } else {
      if ((0, _type.isUndefined)(v[_p])) v[_p] = {};
    }
    v = v[_p];
  }
  return obj;
};

/**
 * Pick values from Object by keys
 * @param  {Object} obj  
 * @param  {Array} keys 
 * @return {Array}      values picked by provided keys
 * pick({a: 1, b: 2}, 'a') => {a: 1}
 */
var pick = exports.pick = function pick(obj, keys) {
  if (!(0, _type.isPlainObject)(obj) || !(0, _type.isArray)(keys)) return obj;
  return keys.map(function (path) {
    var value = get(obj, path);
    var key = (0, _base.last)(path.split('.'));
    return { key: key, value: value };
  }).reduce(function (memo, o) {
    memo[o.key] = o.value;
    return memo;
  }, {});
};

/**
 * whether key in Object or Array
 * @param  {Object} obj 
 * @param  {String} key 
 * @return {Boolean}
 * contains([1,2], 1) => true
 * contains({a: 1, b: 2}, 'a') => true    
 */
var contains = exports.contains = function contains(obj, key) {
  if ((0, _type.isString)(obj) || (0, _type.isArray)(obj)) {
    return obj.indexOf(key) >= 0;
  }
  if ((0, _type.isPlainObject)(obj)) {
    return Object.keys(obj).indexOf(key) >= 0;
  }
  return false;
};

/**
 * remove the subString from String
 * remove the item from Array
 * @param  {Object | Array} value 
 * @param  {String} key   
 * @return {String}
 */
var remove = exports.remove = function remove(value, key) {
  if ((0, _type.isString)(value)) {
    var index = value.indexOf(key);
    if (index >= 0) {
      return value.slice(0, index) + value.slice(key.length + index);
    }
  }
  if ((0, _type.isArray)(value)) {
    var _index = value.indexOf(key);
    if (_index >= 0) value.splice(_index, 1);
    return value;
  }
  return value;
};

// export const quickMerge = (a, b) => {
//   a = a || {};
//   for (var i in b) {
//     if (isPlainObject(b[i])) {
//       a[i] = quickMerge(a[i], b[i]);
//     } else if(isArray(b[i])){
//       a[i] = [].concat(a[i], b[i]);
//     } else {
//       a[i] = b[i]
//     }
//   }
//   return a;
// }

// export const merge = (...args) => {
//   return args.reduce((memo, next) => {
//     return quickMerge(memo, next)
//   })
// }

/**
 * mix extra param with existing url
 * @param  {String}  url         validate url
 * @param  {Object}  extraParams extra param
 * @param  {Boolean} mergeParam  
 *    whether merge params into an array or just override
 * @return {String}              new url
 */
var urlMix = exports.urlMix = function urlMix(url) {
  var extraParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var mergeParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!(0, _type.isUri)(url)) return url;
  var index = url.indexOf('?');
  var queryObject = {};
  var pureUrl = url.slice(0, index);

  if (index >= 0) {
    queryObject = url.slice(index + 1).split('&').reduce(function (memo, x) {
      var arr = x.split('=');
      var v = memo[arr[0]];
      if (v && !mergeParam) {
        if ((0, _type.isArray)(v)) v.push(arr[1]);else memo[arr[0]] = [v, arr[1]];
      } else {
        memo[arr[0]] = arr[1];
      }
      return memo;
    }, {});
  }

  var params = {};

  params = Object.keys(extraParams).reduce(function (memo, key) {
    var v1 = extraParams[key];
    var v2 = queryObject[key];
    if (mergeParam && v1 && v2) {
      memo[key] = [].concat(v1, v2);
    } else {
      memo[key] = v1;
    }
    return memo;
  }, queryObject);

  var queryStr = Object.keys(params).map(function (key) {
    var v = params[key];
    var s = '';
    if ((0, _type.isArray)(v)) {
      s = v.map(function (x) {
        return key + '=' + x;
      }).join('&');
    } else {
      s = key + '=' + v;
    }
    return s;
  }).join('&');

  return pureUrl + '?' + queryStr;
};