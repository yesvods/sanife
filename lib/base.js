'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOwnProperty = exports.noop = exports.last = undefined;

var _type = require('./type');

var last = exports.last = function last(arr) {
  if (!_type.isArray) return undefined;
  return arr[arr.length - 1];
};

var noop = exports.noop = function noop() {};

var hasOwnProperty = exports.hasOwnProperty = Object.prototype.hasOwnProperty;