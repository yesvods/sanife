import {isArray, isString} from './type'

export const last = arr => {
  if(!isArray) return undefined
  return arr[arr.length-1]
}

export const has = (o, item) => {
  if(isArray(o) || isString(o)){
    return o.indexOf(item) >=0
  }
  return false
}

export const hasOwnProperty = Object.prototype.hasOwnProperty