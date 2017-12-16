import {
  isUri,
  isObject,
  isPlainObject,
  isUndefined,
  isArray,
  isNumber,
  isNumberStr,
  isString,
} from './type'
import { last, isLast } from './base'

/**
 * get attribute from path, return undefined when no such path
 * @param  {Object} obj
 * @param  {String} path like: 'a.b.c.0.e'
 * @return {any}
 */
export const get = (obj, path, defaultValue) => {
  if (!isPlainObject(obj) && !isArray(obj)) return undefined
  if (!path) return obj
  //compatible with lodash style
  path = path.replace(/\[|\]/g, '.')

  let pathArray = path.split('.').filter(p => p)
  let p
  let v = obj
  while ((p = pathArray.shift())) {
    v = v[p]
    if (isUndefined(v)) return defaultValue
  }
  return v
}

export const set = (obj, path, value) => {
  if (!isPlainObject(obj)) return undefined

  //compatible with lodash style
  path = path.replace(/\[|\]/g, '.')

  let pathArray = path.split('.').filter(p => p)
  let p
  let v = obj

  for (let i = 0; i < pathArray.length; i++) {
    let p = pathArray[i]
    p = +p == p ? +p : p
    let np = pathArray[i + 1]
    np = +np == np ? +np : np

    if (i >= pathArray.length - 1) {
      v[p] = value
    } else if (isUndefined(v[p])) {
      if (isNumber(np)) {
        v[p] = []
      } else {
        v[p] = {}
      }
    }
    v = v[p]
  }

  return obj
}

/**
 * Pick values from Object by keys
 * @param  {Object} obj
 * @param  {Array} keys
 * @return {Array}      values picked by provided keys
 * pick({a: 1, b: 2}, 'a') => {a: 1}
 */
export const pick = (obj, keys) => {
  if (!isPlainObject(obj) || !isArray(keys)) return obj
  return keys
    .map(path => {
      const value = get(obj, path)
      const key = last(path.split('.'))
      return { key, value }
    })
    .reduce((memo, o) => {
      memo[o.key] = o.value
      return memo
    }, {})
}

/**
 * whether key in Object or Array
 * @param  {Object} obj
 * @param  {String} key
 * @return {Boolean}
 * contains([1,2], 1) => true
 * contains({a: 1, b: 2}, 'a') => true
 */
export const contains = (obj, key) => {
  if (isString(obj) || isArray(obj)) {
    return obj.indexOf(key) >= 0
  }
  if (isPlainObject(obj)) {
    return Object.keys(obj).indexOf(key) >= 0
  }
  return false
}

/**
 * remove the subString from String
 * remove the item from Array
 * @param  {Object | Array} value
 * @param  {String} keys
 * @return {String}
 */
export const remove = (value, keys) => {
  keys = [].concat(keys)
  if (isString(value)) {
    for (let key of keys) {
      value = value.replace(new RegExp(key, 'g'), '')
    }
  } else if (isArray(value)) {
    for (let key of keys) {
      const index = value.indexOf(key)
      if (index >= 0) value.splice(index, 1)
    }
  }
  return value
}

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
export const urlMix = (url, extraParams = {}, mergeParam = false) => {
  if (!isString(url)) return ''
  let index = url.indexOf('?')
  let queryObject = {}
  let pureUrl = url.slice(0, index)

  if (index >= 0) {
    queryObject = url
      .slice(index + 1)
      .split('&')
      .reduce((memo, x) => {
        let arr = x.split('=')
        let v = memo[arr[0]]
        if (v && !mergeParam) {
          if (isArray(v)) v.push(arr[1])
          else memo[arr[0]] = [v, arr[1]]
        } else {
          memo[arr[0]] = arr[1]
        }
        return memo
      }, {})
  }

  let params = {}

  params = Object.keys(extraParams).reduce((memo, key) => {
    let v1 = extraParams[key]
    let v2 = queryObject[key]
    if (mergeParam && v1 && v2) {
      memo[key] = [].concat(v1, v2)
    } else {
      memo[key] = v1
    }
    return memo
  }, queryObject)

  let queryStr = Object.keys(params)
    .map(key => {
      let v = params[key]
      let s = ''
      if (isArray(v)) {
        s = v.map(x => `${key}=${x}`).join('&')
      } else {
        s = `${key}=${v}`
      }
      return s
    })
    .join('&')

  return `${pureUrl}?${queryStr}`
}
