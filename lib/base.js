'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOwnProperty = exports.noop = exports.isLast = exports.last = exports.first = undefined;

var _type = require('./type');

var first = exports.first = function first(arr) {
  if (!(0, _type.isArray)(arr)) return undefined;
  return arr[0];
};
var last = exports.last = function last(arr) {
  if (!(0, _type.isArray)(arr)) return undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiXSwibmFtZXMiOlsiZmlyc3QiLCJhcnIiLCJ1bmRlZmluZWQiLCJsYXN0IiwibGVuZ3RoIiwiaXNMYXN0IiwiaW5kZXgiLCJsZW4iLCJub29wIiwiaGFzT3duUHJvcGVydHkiLCJPYmplY3QiLCJwcm90b3R5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDTyxJQUFNQSx3QkFBUSxTQUFSQSxLQUFRLE1BQU87QUFDMUIsTUFBSSxDQUFDLG1CQUFRQyxHQUFSLENBQUwsRUFBbUIsT0FBT0MsU0FBUDtBQUNuQixTQUFPRCxJQUFJLENBQUosQ0FBUDtBQUNELENBSE07QUFJQSxJQUFNRSxzQkFBTyxTQUFQQSxJQUFPLE1BQU87QUFDekIsTUFBSSxDQUFDLG1CQUFRRixHQUFSLENBQUwsRUFBbUIsT0FBT0MsU0FBUDtBQUNuQixTQUFPRCxJQUFJQSxJQUFJRyxNQUFKLEdBQWEsQ0FBakIsQ0FBUDtBQUNELENBSE07QUFJQSxJQUFNQywwQkFBUyxTQUFUQSxNQUFTLENBQUNKLEdBQUQsRUFBTUssS0FBTixFQUFnQjtBQUNwQyxNQUFNQyxNQUFNTixJQUFJRyxNQUFoQjtBQUNBLE1BQUlHLFFBQVEsQ0FBUixJQUFhRCxVQUFVLENBQTNCLEVBQThCLE9BQU8sSUFBUDtBQUM5QixNQUFJQSxTQUFTQyxNQUFNLENBQW5CLEVBQXNCLE9BQU8sSUFBUDtBQUN0QixTQUFPLEtBQVA7QUFDRCxDQUxNO0FBTUEsSUFBTUMsc0JBQU8sU0FBUEEsSUFBTyxHQUFXLENBQUUsQ0FBMUI7QUFDQSxJQUFNQywwQ0FBaUJDLE9BQU9DLFNBQVAsQ0FBaUJGLGNBQXhDIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0FycmF5LCBpc1N0cmluZyB9IGZyb20gJy4vdHlwZSdcbmV4cG9ydCBjb25zdCBmaXJzdCA9IGFyciA9PiB7XG4gIGlmICghaXNBcnJheShhcnIpKSByZXR1cm4gdW5kZWZpbmVkXG4gIHJldHVybiBhcnJbMF1cbn1cbmV4cG9ydCBjb25zdCBsYXN0ID0gYXJyID0+IHtcbiAgaWYgKCFpc0FycmF5KGFycikpIHJldHVybiB1bmRlZmluZWRcbiAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV1cbn1cbmV4cG9ydCBjb25zdCBpc0xhc3QgPSAoYXJyLCBpbmRleCkgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGlmIChsZW4gPT09IDAgJiYgaW5kZXggPT09IDApIHJldHVybiB0cnVlXG4gIGlmIChpbmRleCA+PSBsZW4gLSAxKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gZmFsc2Vcbn1cbmV4cG9ydCBjb25zdCBub29wID0gZnVuY3Rpb24oKSB7fVxuZXhwb3J0IGNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuIl19