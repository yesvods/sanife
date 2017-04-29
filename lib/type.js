'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = exports.isDOMNode = exports.isUri = exports.isUndefined = exports.isPlainObject = exports.isObject = exports.isFunction = exports.isArray = exports.isNumber = exports.isString = exports.isType = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

/**
 * isType
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
var isType = exports.isType = function isType(type) {
  return function (obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == type;
  };
};
/**
 * isString 
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
var isString = exports.isString = function isString(obj) {
  return isType('string')(obj);
};
var isNumber = exports.isNumber = function isNumber(obj) {
  return isType('number')(obj);
};
var isArray = exports.isArray = function isArray(obj) {
  return isType('object')(obj) && !!obj.slice;
};
var isFunction = exports.isFunction = function isFunction(obj) {
  return isType('function')(obj);
};
var isObject = exports.isObject = function isObject(obj) {
  return isType('object')(obj);
};
var isPlainObject = exports.isPlainObject = function isPlainObject(obj) {
  return isType('object')(obj) && !isArray(obj);
};
var isUndefined = exports.isUndefined = function isUndefined(obj) {
  return isType('undefined')(obj);
};

var isUri = exports.isUri = function () {
  var reg = /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return function (url) {
    return reg.test(url);
  };
}();

var isDOMNode = exports.isDOMNode = function isDOMNode(n) {
  return !!n.nodeName;
};
var isEmpty = exports.isEmpty = function isEmpty(value) {
  if (!value) return true;
  if (isArray(value)) return !value.length;
  if (isPlainObject(value)) {
    for (var key in value) {
      if (_base.hasOwnProperty.call(value, key)) {
        return false;
      }
    }
  }
  return true;
};