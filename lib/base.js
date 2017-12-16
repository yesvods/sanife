'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOwnProperty = exports.noop = exports.isLast = exports.last = exports.first = undefined;

var _type = require('./type');

var first = exports.first = function first(arr) {
  if (!_type.isArray) return undefined;
  return arr[0];
};

var last = exports.last = function last(arr) {
  if (!_type.isArray) return undefined;
  return arr[arr.length - 1];
};

var isLast = exports.isLast = function isLast(arr, index) {
  var len = arr.length;
  if (len === 0 && index === 0) return true;
  if (index >= len - 1) return true;
  return false;
};

var noop = exports.noop = function noop() {};

var hasOwnProperty = exports.hasOwnProperty = Object.prototype.hasOwnProperty;