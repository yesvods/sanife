import {isUri, isObject, isPlainObject, isUndefined, isArray, isString} from './type'
import {last} from './base'

/**
 * get attribute from path, return undefined when no such path
 * @param  {Object} obj  
 * @param  {String} path like: 'a.b.c.0.e'
 * @return {any}
 */
export const get = (obj, path, defaultValue) => {
  if(!isPlainObject(obj) && !isArray(obj)) return undefined
  if(!path) return obj
  //compatible with lodash style
  path = path.replace(/\[|\]\./g, '.')

  let pathArray = path.split('.')
  let p;
  let v = obj;
  while((p = pathArray.shift())){
    v = v[p]
    if(isUndefined(v)) return defaultValue
  }
  return v
}

export const set = (obj, path, value) => {
  if(!isPlainObject(obj)) return undefined
  
  //compatible with lodash style
  path = path.replace(/\[|\]\./g, '.')

  let pathArray = path.split('.')
  let p;
  let v = obj;

  for(let i = 0; i < pathArray.length; i++){
    let p = pathArray[i]
    if(i >= pathArray.length - 1){
      v[p] = value
    }else {
      if(isUndefined(v[p])) v[p] = {}
    }
    v = v[p]
  }
  return obj
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

export const remove = (value, key) => {
  if(isString(value)){
    const index = value.indexOf(key)
    if(index>=0){
      return value.slice(0, index) + value.slice(key.length+index)
    }
  }
  if(isArray(value)){
    const index = value.indexOf(key)
    if(index >= 0)
      value.splice(index, 1)
      return value
  }
  return value
}

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