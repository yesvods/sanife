'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = exports.isDOMNode = exports.isUri = exports.isNumberStr = exports.isPlainObject = exports.isUndefined = exports.isObject = exports.isBoolean = exports.isFunction = exports.isArray = exports.isNumber = exports.isString = exports.isType = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _base = require('./base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * isType
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
var isType = exports.isType = function isType(type) {
  return function (obj) {
    return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) == type;
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
  return obj instanceof Array;
};
var isFunction = exports.isFunction = function isFunction(obj) {
  return isType('function')(obj);
};
var isBoolean = exports.isBoolean = function isBoolean(obj) {
  return isType('boolean')(obj);
};
var isObject = exports.isObject = function isObject(obj) {
  return isType('object')(obj);
};
var isUndefined = exports.isUndefined = function isUndefined(obj) {
  return isType('undefined')(obj);
};
var isPlainObject = exports.isPlainObject = function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' || obj === null) return false;

  var proto = obj;
  while ((0, _getPrototypeOf2.default)(proto) !== null) {
    proto = (0, _getPrototypeOf2.default)(proto);
  }

  return (0, _getPrototypeOf2.default)(obj) === proto;
};

var isNumberStr = exports.isNumberStr = function isNumberStr(obj) {
  return +obj == obj;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGUuanMiXSwibmFtZXMiOlsiaXNUeXBlIiwib2JqIiwidHlwZSIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc0FycmF5IiwiQXJyYXkiLCJpc0Z1bmN0aW9uIiwiaXNCb29sZWFuIiwiaXNPYmplY3QiLCJpc1VuZGVmaW5lZCIsImlzUGxhaW5PYmplY3QiLCJwcm90byIsImlzTnVtYmVyU3RyIiwiaXNVcmkiLCJyZWciLCJ0ZXN0IiwidXJsIiwiaXNET01Ob2RlIiwibiIsIm5vZGVOYW1lIiwiaXNFbXB0eSIsInZhbHVlIiwibGVuZ3RoIiwia2V5IiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7QUFLTyxJQUFNQSwwQkFBUyxTQUFUQSxNQUFTO0FBQUEsU0FBUTtBQUFBLFdBQU8sUUFBT0MsR0FBUCx1REFBT0EsR0FBUCxNQUFjQyxJQUFyQjtBQUFBLEdBQVI7QUFBQSxDQUFmOztBQUVQOzs7OztBQUtPLElBQU1DLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPSCxPQUFPLFFBQVAsRUFBaUJDLEdBQWpCLENBQVA7QUFBQSxDQUFqQjtBQUNBLElBQU1HLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPSixPQUFPLFFBQVAsRUFBaUJDLEdBQWpCLENBQVA7QUFBQSxDQUFqQjtBQUNBLElBQU1JLDRCQUFVLFNBQVZBLE9BQVU7QUFBQSxTQUFPSixlQUFlSyxLQUF0QjtBQUFBLENBQWhCO0FBQ0EsSUFBTUMsa0NBQWEsU0FBYkEsVUFBYTtBQUFBLFNBQU9QLE9BQU8sVUFBUCxFQUFtQkMsR0FBbkIsQ0FBUDtBQUFBLENBQW5CO0FBQ0EsSUFBTU8sZ0NBQVksU0FBWkEsU0FBWTtBQUFBLFNBQU9SLE9BQU8sU0FBUCxFQUFrQkMsR0FBbEIsQ0FBUDtBQUFBLENBQWxCO0FBQ0EsSUFBTVEsOEJBQVcsU0FBWEEsUUFBVztBQUFBLFNBQU9ULE9BQU8sUUFBUCxFQUFpQkMsR0FBakIsQ0FBUDtBQUFBLENBQWpCO0FBQ0EsSUFBTVMsb0NBQWMsU0FBZEEsV0FBYztBQUFBLFNBQU9WLE9BQU8sV0FBUCxFQUFvQkMsR0FBcEIsQ0FBUDtBQUFBLENBQXBCO0FBQ0EsSUFBTVUsd0NBQWdCLFNBQWhCQSxhQUFnQixNQUFPO0FBQ2xDLE1BQUksUUFBT1YsR0FBUCx1REFBT0EsR0FBUCxPQUFlLFFBQWYsSUFBMkJBLFFBQVEsSUFBdkMsRUFBNkMsT0FBTyxLQUFQOztBQUU3QyxNQUFJVyxRQUFRWCxHQUFaO0FBQ0EsU0FBTyw4QkFBc0JXLEtBQXRCLE1BQWlDLElBQXhDLEVBQThDO0FBQzVDQSxZQUFRLDhCQUFzQkEsS0FBdEIsQ0FBUjtBQUNEOztBQUVELFNBQU8sOEJBQXNCWCxHQUF0QixNQUErQlcsS0FBdEM7QUFDRCxDQVRNOztBQVdBLElBQU1DLG9DQUFjLFNBQWRBLFdBQWM7QUFBQSxTQUFPLENBQUNaLEdBQUQsSUFBUUEsR0FBZjtBQUFBLENBQXBCOztBQUVBLElBQU1hLHdCQUFTLFlBQU07QUFDMUIsTUFBTUMsTUFBTSxnR0FBWjtBQUNBLFNBQU87QUFBQSxXQUFPQSxJQUFJQyxJQUFKLENBQVNDLEdBQVQsQ0FBUDtBQUFBLEdBQVA7QUFDRCxDQUhvQixFQUFkOztBQUtBLElBQU1DLGdDQUFZLFNBQVpBLFNBQVk7QUFBQSxTQUFLLENBQUMsQ0FBQ0MsRUFBRUMsUUFBVDtBQUFBLENBQWxCO0FBQ0EsSUFBTUMsNEJBQVUsU0FBVkEsT0FBVSxRQUFTO0FBQzlCLE1BQUksQ0FBQ0MsS0FBTCxFQUFZLE9BQU8sSUFBUDtBQUNaLE1BQUlqQixRQUFRaUIsS0FBUixDQUFKLEVBQW9CLE9BQU8sQ0FBQ0EsTUFBTUMsTUFBZDtBQUNwQixNQUFJWixjQUFjVyxLQUFkLENBQUosRUFBMEI7QUFDeEIsU0FBSyxJQUFNRSxHQUFYLElBQWtCRixLQUFsQixFQUF5QjtBQUN2QixVQUFJLHFCQUFlRyxJQUFmLENBQW9CSCxLQUFwQixFQUEyQkUsR0FBM0IsQ0FBSixFQUFxQztBQUNuQyxlQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxTQUFPLElBQVA7QUFDRCxDQVhNIiwiZmlsZSI6InR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYXNPd25Qcm9wZXJ0eSB9IGZyb20gJy4vYmFzZSdcblxuLyoqXG4gKiBpc1R5cGVcbiAqIEBwYXJhbSAge1t0eXBlXX0gdHlwZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgaXNUeXBlID0gdHlwZSA9PiBvYmogPT4gdHlwZW9mIG9iaiA9PSB0eXBlXG5cbi8qKlxuICogaXNTdHJpbmdcbiAqIEBwYXJhbSAge1t0eXBlXX0gb2JqIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gb2JqID0+IGlzVHlwZSgnc3RyaW5nJykob2JqKVxuZXhwb3J0IGNvbnN0IGlzTnVtYmVyID0gb2JqID0+IGlzVHlwZSgnbnVtYmVyJykob2JqKVxuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBvYmogPT4gb2JqIGluc3RhbmNlb2YgQXJyYXlcbmV4cG9ydCBjb25zdCBpc0Z1bmN0aW9uID0gb2JqID0+IGlzVHlwZSgnZnVuY3Rpb24nKShvYmopXG5leHBvcnQgY29uc3QgaXNCb29sZWFuID0gb2JqID0+IGlzVHlwZSgnYm9vbGVhbicpKG9iailcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IG9iaiA9PiBpc1R5cGUoJ29iamVjdCcpKG9iailcbmV4cG9ydCBjb25zdCBpc1VuZGVmaW5lZCA9IG9iaiA9PiBpc1R5cGUoJ3VuZGVmaW5lZCcpKG9iailcbmV4cG9ydCBjb25zdCBpc1BsYWluT2JqZWN0ID0gb2JqID0+IHtcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cbiAgbGV0IHByb3RvID0gb2JqXG4gIHdoaWxlIChPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pICE9PSBudWxsKSB7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pXG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IHByb3RvXG59XG5cbmV4cG9ydCBjb25zdCBpc051bWJlclN0ciA9IG9iaiA9PiArb2JqID09IG9ialxuXG5leHBvcnQgY29uc3QgaXNVcmkgPSAoKCkgPT4ge1xuICBjb25zdCByZWcgPSAvKGh0dHBzPzopP1xcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezIsMjU2fVxcLlthLXpdezIsNn1cXGIoWy1hLXpBLVowLTlAOiVfXFwrLn4jPyYvLz1dKikvXG4gIHJldHVybiB1cmwgPT4gcmVnLnRlc3QodXJsKVxufSkoKVxuXG5leHBvcnQgY29uc3QgaXNET01Ob2RlID0gbiA9PiAhIW4ubm9kZU5hbWVcbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gdmFsdWUgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gdHJ1ZVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHJldHVybiAhdmFsdWUubGVuZ3RoXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cbiJdfQ==