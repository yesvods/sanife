import { hasOwnProperty } from './base'

/**
 * isType
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
export const isType = type => obj => typeof obj == type

/**
 * isString
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const isString = obj => isType('string')(obj)
export const isNumber = obj => isType('number')(obj)
export const isArray = obj => obj instanceof Array
export const isFunction = obj => isType('function')(obj)
export const isBoolean = obj => isType('boolean')(obj)
export const isObject = obj => isType('object')(obj)
export const isUndefined = obj => isType('undefined')(obj)
export const isPlainObject = obj => {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

export const isNumberStr = obj => +obj == obj

export const isUri = (() => {
  const reg = /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  return url => reg.test(url)
})()

export const isDOMNode = n => !!n.nodeName
export const isEmpty = value => {
  if (!value) return true
  if (isArray(value)) return !value.length
  if (isPlainObject(value)) {
    for (const key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false
      }
    }
  }
  return true
}
