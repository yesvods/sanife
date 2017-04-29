'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.contains = exports.pick = exports.set = exports.get = undefined;

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

var contains = exports.contains = function contains(obj, key) {
  if ((0, _type.isString)(obj) || (0, _type.isArray)(obj)) {
    return obj.indexOf(key) >= 0;
  }
  if ((0, _type.isPlainObject)(obj)) {
    return Object.keys(obj).indexOf(key) >= 0;
  }
  return false;
};

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

// export const urlMix = (url, defaultParams = {}, mergeParam = true) => {
//   if(!isUri(url)) return url
//   let index = url.split('?')
//   let queryObject = {}

//   if(index >= 0){
//     queryObject = url.slice(index+1).split('&').reduce((memo, x) => {
//       let arr = x.split('=')
//       let v = memo[arr[0]]
//       if(v && !mergeParam){
//         if(isArray(v)) v.push()
//         else memo[arr[0]] = [v, arr[1]]
//       }else {
//         memo[arr[0]] = arr[1]
//       }
//       return memo
//     }, {})
//   }

//   let params = {}

//   params = Object.keys(defaultParams).reduce((memo, key) => {
//     let v1 = defaultParams[key]
//     let v2 = queryObject[key]
//     if(isArray(v1) || isArray(v2)){
//       memo[key] = [].concat(v1, v2)
//     }else {
//       memo[key] = v1
//     }
//     return memo
//   }, queryObject)
// }