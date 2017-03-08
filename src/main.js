import {isPlainObject, isUndefined, isArray, isString} from './type'
import {last} from './base'

/**
 * get attribute from path, return undefined when no such path
 * @param  {Object} obj  
 * @param  {String} path like: 'a.b.c.0.e'
 * @return {any}
 */
export const get = (obj, path) => {
  if(!isPlainObject(obj) && !isArray(obj)) return undefined
  if(!path) return obj
  let pathArray = path.split('.')
  let p;
  let v = obj;
  while((p = pathArray.shift())){
    v = v[p]
    if(isUndefined(v)) return v
  }
  return v
}

export const pick = (obj, keys) => {
  if(!isPlainObject(obj) || !isArray(keys)) return obj
  return keys.map(path => {
    const value = get(obj, path)
    const key = last(path.split('.'))
    return {key, value}
  }).reduce((memo, o) => {
    memo[o.key] = o.value
    return memo
  }, {})
}

export const contains = (obj, key) => {
  if(isString(obj) || isArray(obj)){
    return obj.indexOf(key) >=0
  }
  if(isPlainObject(obj)){
    return Object.keys(obj).indexOf(key) >=0
  }
  return false
}