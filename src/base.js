import {isArray, isString} from './type'

export const last = arr => {
  if(!isArray) return undefined
  return arr[arr.length-1]
}

export const noop = function(){}

export const hasOwnProperty = Object.prototype.hasOwnProperty