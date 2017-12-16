import { isArray, isString } from './type'
export const first = arr => {
  if (!isArray(arr)) return undefined
  return arr[0]
}
export const last = arr => {
  if (!isArray(arr)) return undefined
  return arr[arr.length - 1]
}
export const isLast = (arr, index) => {
  const len = arr.length
  if (len === 0 && index === 0) return true
  if (index >= len - 1) return true
  return false
}
export const noop = function() {}
export const hasOwnProperty = Object.prototype.hasOwnProperty
