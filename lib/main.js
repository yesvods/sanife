'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlMix = exports.remove = exports.contains = exports.pick = exports.set = exports.get = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _type = require('./type');

var _base = require('./base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  path = path.replace(/\[|\]/g, '.');

  var pathArray = path.split('.').filter(function (p) {
    return p;
  });
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
  path = path.replace(/\[|\]/g, '.');

  var pathArray = path.split('.').filter(function (p) {
    return p;
  });
  var p = void 0;
  var v = obj;

  for (var i = 0; i < pathArray.length; i++) {
    var _p = pathArray[i];
    _p = +_p == _p ? +_p : _p;
    var np = pathArray[i + 1];
    np = +np == np ? +np : np;

    if (i >= pathArray.length - 1) {
      v[_p] = value;
    } else if ((0, _type.isUndefined)(v[_p])) {
      if ((0, _type.isNumber)(np)) {
        v[_p] = [];
      } else {
        v[_p] = {};
      }
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
    return (0, _keys2.default)(obj).indexOf(key) >= 0;
  }
  return false;
};

/**
 * remove the subString from String
 * remove the item from Array
 * @param  {Object | Array} value
 * @param  {String} keys
 * @return {String}
 */
var remove = exports.remove = function remove(value, keys) {
  keys = [].concat(keys);
  if ((0, _type.isString)(value)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        value = value.replace(new RegExp(key, 'g'), '');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else if ((0, _type.isArray)(value)) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(keys), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _key = _step2.value;

        var index = value.indexOf(_key);
        if (index >= 0) value.splice(index, 1);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
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

  if (!(0, _type.isString)(url)) return '';
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

  params = (0, _keys2.default)(extraParams).reduce(function (memo, key) {
    var v1 = extraParams[key];
    var v2 = queryObject[key];
    if (mergeParam && v1 && v2) {
      memo[key] = [].concat(v1, v2);
    } else {
      memo[key] = v1;
    }
    return memo;
  }, queryObject);

  var queryStr = (0, _keys2.default)(params).map(function (key) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZ2V0Iiwib2JqIiwicGF0aCIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsInJlcGxhY2UiLCJwYXRoQXJyYXkiLCJzcGxpdCIsImZpbHRlciIsInAiLCJ2Iiwic2hpZnQiLCJzZXQiLCJ2YWx1ZSIsImkiLCJsZW5ndGgiLCJucCIsInBpY2siLCJrZXlzIiwibWFwIiwia2V5IiwicmVkdWNlIiwibWVtbyIsIm8iLCJjb250YWlucyIsImluZGV4T2YiLCJyZW1vdmUiLCJjb25jYXQiLCJSZWdFeHAiLCJpbmRleCIsInNwbGljZSIsInVybE1peCIsInVybCIsImV4dHJhUGFyYW1zIiwibWVyZ2VQYXJhbSIsInF1ZXJ5T2JqZWN0IiwicHVyZVVybCIsInNsaWNlIiwieCIsImFyciIsInB1c2giLCJwYXJhbXMiLCJ2MSIsInYyIiwicXVlcnlTdHIiLCJzIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBVUE7Ozs7QUFFQTs7Ozs7O0FBTU8sSUFBTUEsb0JBQU0sU0FBTkEsR0FBTSxDQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBWUMsWUFBWixFQUE2QjtBQUM5QyxNQUFJLENBQUMseUJBQWNGLEdBQWQsQ0FBRCxJQUF1QixDQUFDLG1CQUFRQSxHQUFSLENBQTVCLEVBQTBDLE9BQU9HLFNBQVA7QUFDMUMsTUFBSSxDQUFDRixJQUFMLEVBQVcsT0FBT0QsR0FBUDtBQUNYO0FBQ0FDLFNBQU9BLEtBQUtHLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLEdBQXZCLENBQVA7O0FBRUEsTUFBSUMsWUFBWUosS0FBS0ssS0FBTCxDQUFXLEdBQVgsRUFBZ0JDLE1BQWhCLENBQXVCO0FBQUEsV0FBS0MsQ0FBTDtBQUFBLEdBQXZCLENBQWhCO0FBQ0EsTUFBSUEsVUFBSjtBQUNBLE1BQUlDLElBQUlULEdBQVI7QUFDQSxTQUFRUSxJQUFJSCxVQUFVSyxLQUFWLEVBQVosRUFBZ0M7QUFDOUJELFFBQUlBLEVBQUVELENB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QUNELEtBRkQsTUFFTztBQUNMckIsV0FBS0YsR0FBTCxJQUFZc0IsRUFBWjtBQUNEO0FBQ0QsV0FBT3BCLElBQVA7QUFDRCxHQVRRLEVBU05hLFdBVE0sQ0FBVDs7QUFXQSxNQUFJUyxXQUFXLG9CQUFZSCxNQUFaLEVBQ1p0QixHQURZLENBQ1IsZUFBTztBQUNWLFFBQUlULElBQUkrQixPQUFPckIsR0FBUCxDQUFSO0FBQ0EsUUFBSXlCLElBQUksRUFBUjtBQUNBLFFBQUksbUJBQVFuQyxDQUFSLENBQUosRUFBZ0I7QUFDZG1DLFVBQUluQyxFQUFFUyxHQUFGLENBQU07QUFBQSxlQUFRQyxHQUFSLFNBQWVrQixDQUFmO0FBQUEsT0FBTixFQUEwQlEsSUFBMUIsQ0FBK0IsR0FBL0IsQ0FBSjtBQUNELEtBRkQsTUFFTztBQUNMRCxVQUFPekIsR0FBUCxTQUFjVixDQUFkO0FBQ0Q7QUFDRCxXQUFPbUMsQ0FBUDtBQUNELEdBVlksRUFXWkMsSUFYWSxDQVdQLEdBWE8sQ0FBZjs7QUFhQSxTQUFVVixPQUFWLFNBQXFCUSxRQUFyQjtBQUNELENBbERNIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc1VyaSxcbiAgaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0FycmF5LFxuICBpc051bWJlcixcbiAgaXNOdW1iZXJTdHIsXG4gIGlzU3RyaW5nLFxufSBmcm9tICcuL3R5cGUnXG5pbXBvcnQgeyBsYXN0LCBpc0xhc3QgfSBmcm9tICcuL2Jhc2UnXG5cbi8qKlxuICogZ2V0IGF0dHJpYnV0ZSBmcm9tIHBhdGgsIHJldHVybiB1bmRlZmluZWQgd2hlbiBubyBzdWNoIHBhdGhcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGggbGlrZTogJ2EuYi5jLjAuZSdcbiAqIEByZXR1cm4ge2FueX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldCA9IChvYmosIHBhdGgsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICBpZiAoIWlzUGxhaW5PYmplY3Qob2JqKSAmJiAhaXNBcnJheShvYmopKSByZXR1cm4gdW5kZWZpbmVkXG4gIGlmICghcGF0aCkgcmV0dXJuIG9ialxuICAvL2NvbXBhdGlibGUgd2l0aCBsb2Rhc2ggc3R5bGVcbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFxbfFxcXS9nLCAnLicpXG5cbiAgbGV0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoJy4nKS5maWx0ZXIocCA9PiBwKVxuICBsZXQgcFxuICBsZXQgdiA9IG9ialxuICB3aGlsZSAoKHAgPSBwYXRoQXJyYXkuc2hpZnQoKSkpIHtcbiAgICB2ID0gdltwXVxuICAgIGlmIChpc1VuZGVmaW5lZCh2KSkgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICB9XG4gIHJldHVybiB2XG59XG5cbmV4cG9ydCBjb25zdCBzZXQgPSAob2JqLCBwYXRoLCB2YWx1ZSkgPT4ge1xuICBpZiAoIWlzUGxhaW5PYmplY3Qob2JqKSkgcmV0dXJuIHVuZGVmaW5lZFxuXG4gIC8vY29tcGF0aWJsZSB3aXRoIGxvZGFzaCBzdHlsZVxuICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXFt8XFxdL2csICcuJylcblxuICBsZXQgcGF0aEFycmF5ID0gcGF0aC5zcGxpdCgnLicpLmZpbHRlcihwID0+IHApXG4gIGxldCBwXG4gIGxldCB2ID0gb2JqXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgcCA9IHBhdGhBcnJheVtpXVxuICAgIHAgPSArcCA9PSBwID8gK3AgOiBwXG4gICAgbGV0IG5wID0gcGF0aEFycmF5W2kgKyAxXVxuICAgIG5wID0gK25wID09IG5wID8gK25wIDogbnBcblxuICAgIGlmIChpID49IHBhdGhBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICB2W3BdID0gdmFsdWVcbiAgICB9IGVsc2UgaWYgKGlzVW5kZWZpbmVkKHZbcF0pKSB7XG4gICAgICBpZiAoaXNOdW1iZXIobnApKSB7XG4gICAgICAgIHZbcF0gPSBbXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdltwXSA9IHt9XG4gICAgICB9XG4gICAgfVxuICAgIHYgPSB2W3BdXG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbi8qKlxuICogUGljayB2YWx1ZXMgZnJvbSBPYmplY3QgYnkga2V5c1xuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSAge0FycmF5fSBrZXlzXG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICB2YWx1ZXMgcGlja2VkIGJ5IHByb3ZpZGVkIGtleXNcbiAqIHBpY2soe2E6IDEsIGI6IDJ9LCAnYScpID0+IHthOiAxfVxuICovXG5leHBvcnQgY29uc3QgcGljayA9IChvYmosIGtleXMpID0+IHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KG9iaikgfHwgIWlzQXJyYXkoa2V5cykpIHJldHVybiBvYmpcbiAgcmV0dXJuIGtleXNcbiAgICAubWFwKHBhdGggPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBnZXQob2JqLCBwYXRoKVxuICAgICAgY29uc3Qga2V5ID0gbGFzdChwYXRoLnNwbGl0KCcuJykpXG4gICAgICByZXR1cm4geyBrZXksIHZhbHVlIH1cbiAgICB9KVxuICAgIC5yZWR1Y2UoKG1lbW8sIG8pID0+IHtcbiAgICAgIG1lbW9bby5rZXldID0gby52YWx1ZVxuICAgICAgcmV0dXJuIG1lbW9cbiAgICB9LCB7fSlcbn1cblxuLyoqXG4gKiB3aGV0aGVyIGtleSBpbiBPYmplY3Qgb3IgQXJyYXlcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGtleVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIGNvbnRhaW5zKFsxLDJdLCAxKSA9PiB0cnVlXG4gKiBjb250YWlucyh7YTogMSwgYjogMn0sICdhJykgPT4gdHJ1ZVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSAob2JqLCBrZXkpID0+IHtcbiAgaWYgKGlzU3RyaW5nKG9iaikgfHwgaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5pbmRleE9mKGtleSkgPj0gMFxuICB9XG4gIGlmIChpc1BsYWluT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5pbmRleE9mKGtleSkgPj0gMFxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIHJlbW92ZSB0aGUgc3ViU3RyaW5nIGZyb20gU3RyaW5nXG4gKiByZW1vdmUgdGhlIGl0ZW0gZnJvbSBBcnJheVxuICogQHBhcmFtICB7T2JqZWN0IHwgQXJyYXl9IHZhbHVlXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGtleXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZSA9ICh2YWx1ZSwga2V5cykgPT4ge1xuICBrZXlzID0gW10uY29uY2F0KGtleXMpXG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5LCAnZycpLCAnJylcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgaW5kZXggPSB2YWx1ZS5pbmRleE9mKGtleSlcbiAgICAgIGlmIChpbmRleCA+PSAwKSB2YWx1ZS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG4vLyBleHBvcnQgY29uc3QgcXVpY2tNZXJnZSA9IChhLCBiKSA9PiB7XG4vLyAgIGEgPSBhIHx8IHt9O1xuLy8gICBmb3IgKHZhciBpIGluIGIpIHtcbi8vICAgICBpZiAoaXNQbGFpbk9iamVjdChiW2ldKSkge1xuLy8gICAgICAgYVtpXSA9IHF1aWNrTWVyZ2UoYVtpXSwgYltpXSk7XG4vLyAgICAgfSBlbHNlIGlmKGlzQXJyYXkoYltpXSkpe1xuLy8gICAgICAgYVtpXSA9IFtdLmNvbmNhdChhW2ldLCBiW2ldKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgYVtpXSA9IGJbaV1cbi8vICAgICB9XG4vLyAgIH1cbi8vICAgcmV0dXJuIGE7XG4vLyB9XG5cbi8vIGV4cG9ydCBjb25zdCBtZXJnZSA9ICguLi5hcmdzKSA9PiB7XG4vLyAgIHJldHVybiBhcmdzLnJlZHVjZSgobWVtbywgbmV4dCkgPT4ge1xuLy8gICAgIHJldHVybiBxdWlja01lcmdlKG1lbW8sIG5leHQpXG4vLyAgIH0pXG4vLyB9XG5cbi8qKlxuICogbWl4IGV4dHJhIHBhcmFtIHdpdGggZXhpc3RpbmcgdXJsXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICB1cmwgICAgICAgICB2YWxpZGF0ZSB1cmxcbiAqIEBwYXJhbSAge09iamVjdH0gIGV4dHJhUGFyYW1zIGV4dHJhIHBhcmFtXG4gKiBAcGFyYW0gIHtCb29sZWFufSBtZXJnZVBhcmFtXG4gKiAgICB3aGV0aGVyIG1lcmdlIHBhcmFtcyBpbnRvIGFuIGFycmF5IG9yIGp1c3Qgb3ZlcnJpZGVcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICAgICAgIG5ldyB1cmxcbiAqL1xuZXhwb3J0IGNvbnN0IHVybE1peCA9ICh1cmwsIGV4dHJhUGFyYW1zID0ge30sIG1lcmdlUGFyYW0gPSBmYWxzZSkgPT4ge1xuICBpZiAoIWlzU3RyaW5nKHVybCkpIHJldHVybiAnJ1xuICBsZXQgaW5kZXggPSB1cmwuaW5kZXhPZignPycpXG4gIGxldCBxdWVyeU9iamVjdCA9IHt9XG4gIGxldCBwdXJlVXJsID0gdXJsLnNsaWNlKDAsIGluZGV4KVxuXG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgcXVlcnlPYmplY3QgPSB1cmxcbiAgICAgIC5zbGljZShpbmRleCArIDEpXG4gICAgICAuc3BsaXQoJyYnKVxuICAgICAgLnJlZHVjZSgobWVtbywgeCkgPT4ge1xuICAgICAgICBsZXQgYXJyID0geC5zcGxpdCgnPScpXG4gICAgICAgIGxldCB2ID0gbWVtb1thcnJbMF1dXG4gICAgICAgIGlmICh2ICYmICFtZXJnZVBhcmFtKSB7XG4gICAgICAgICAgaWYgKGlzQXJyYXkodikpIHYucHVzaChhcnJbMV0pXG4gICAgICAgICAgZWxzZSBtZW1vW2FyclswXV0gPSBbdiwgYXJyWzFdXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbW9bYXJyWzBdXSA9IGFyclsxXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZW1vXG4gICAgICB9LCB7fSlcbiAgfVxuXG4gIGxldCBwYXJhbXMgPSB7fVxuXG4gIHBhcmFtcyA9IE9iamVjdC5rZXlzKGV4dHJhUGFyYW1zKS5yZWR1Y2UoKG1lbW8sIGtleSkgPT4ge1xuICAgIGxldCB2MSA9IGV4dHJhUGFyYW1zW2tleV1cbiAgICBsZXQgdjIgPSBxdWVyeU9iamVjdFtrZXldXG4gICAgaWYgKG1lcmdlUGFyYW0gJiYgdjEgJiYgdjIpIHtcbiAgICAgIG1lbW9ba2V5XSA9IFtdLmNvbmNhdCh2MSwgdjIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1lbW9ba2V5XSA9IHYxXG4gICAgfVxuICAgIHJldHVybiBtZW1vXG4gIH0sIHF1ZXJ5T2JqZWN0KVxuXG4gIGxldCBxdWVyeVN0ciA9IE9iamVjdC5rZXlzKHBhcmFtcylcbiAgICAubWFwKGtleSA9PiB7XG4gICAgICBsZXQgdiA9IHBhcmFtc1trZXldXG4gICAgICBsZXQgcyA9ICcnXG4gICAgICBpZiAoaXNBcnJheSh2KSkge1xuICAgICAgICBzID0gdi5tYXAoeCA9PiBgJHtrZXl9PSR7eH1gKS5qb2luKCcmJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSBgJHtrZXl9PSR7dn1gXG4gICAgICB9XG4gICAgICByZXR1cm4gc1xuICAgIH0pXG4gICAgLmpvaW4oJyYnKVxuXG4gIHJldHVybiBgJHtwdXJlVXJsfT8ke3F1ZXJ5U3RyfWBcbn1cbiJdfQ==