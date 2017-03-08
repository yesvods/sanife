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
export const isArray = obj => isType('object')(obj) && !!obj.slice
export const isFunction = obj => isType('function')(obj)
export const isPlainObject = obj => isType('object')(obj) && !isArray(obj)
export const isUndefined = obj => isType('undefined')(obj)

export const isUri = (() => {
  const reg = /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  return url => reg.test(url)
})()