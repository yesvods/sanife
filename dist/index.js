'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * isType
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
var isType = function (type) { return function (obj) { return typeof obj == type; }; };
/**
 * isString 
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
var isString = function (obj) { return isType('string')(obj); };
var isNumber = function (obj) { return isType('number')(obj); };
var isArray = function (obj) { return isType('object')(obj) && !!obj.slice; };
var isFunction = function (obj) { return isType('function')(obj); };
var isPlainObject = function (obj) { return isType('object')(obj) && !isArray(obj); };
var isUndefined = function (obj) { return isType('undefined')(obj); };

var isUri = (function () {
  var reg = /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return function (url) { return reg.test(url); }
})();

var last = function (arr) {
  if(!isArray) { return undefined }
  return arr[arr.length-1]
};

var has = function (o, item) {
  if(isArray(o) || isString(o)){
    return o.indexOf(item) >=0
  }
  return false
};

/**
 * get attribute from path, return undefined when no such path
 * @param  {Object} obj  
 * @param  {String} path like: 'a.b.c.0.e'
 * @return {any}
 */
var get = function (obj, path) {
  if(!isPlainObject(obj) && !isArray(obj)) { return undefined }
  if(!path) { return obj }
  //compatible with lodash get
  path = path.replace(/\[|\]\./g, '.');
  var pathArray = path.split('.');
  var p;
  var v = obj;
  while((p = pathArray.shift())){
    v = v[p];
    if(isUndefined(v)) { return v }
  }
  return v
};

var pick = function (obj, keys) {
  if(!isPlainObject(obj) || !isArray(keys)) { return obj }
  return keys.map(function (path) {
    var value = get(obj, path);
    var key = last(path.split('.'));
    return {key: key, value: value}
  }).reduce(function (memo, o) {
    memo[o.key] = o.value;
    return memo
  }, {})
};

var contains = function (obj, key) {
  if(isString(obj) || isArray(obj)){
    return obj.indexOf(key) >=0
  }
  if(isPlainObject(obj)){
    return Object.keys(obj).indexOf(key) >=0
  }
  return false
};

exports.isType = isType;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isPlainObject = isPlainObject;
exports.isUndefined = isUndefined;
exports.isUri = isUri;
exports.last = last;
exports.has = has;
exports.get = get;
exports.pick = pick;
exports.contains = contains;
