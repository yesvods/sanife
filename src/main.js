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

export const urlMix = (url, defaultParams = {}, mergeParam = true) => {
  if(!isUri(url)) return url
  let index = url.split('?')
  let queryObject = {}

  if(index >= 0){
    queryObject = url.slice(index+1).split('&').reduce((memo, x) => {
      let arr = x.split('=')
      let v = memo[arr[0]]
      if(v && !mergeParam){
        if(isArray(v)) v.push()
        else memo[arr[0]] = [v, arr[1]]
      }else {
        memo[arr[0]] = arr[1]
      }
      return memo
    }, {})
  }

  let params = {}
  
  return Object.keys(defaultParams).reduce((memo, key) => {
    let v1 = defaultParams[key]
    let v2 = queryObject[key]
    if(isArray(v1) || isArray(v2)){
      memo[key] = [].concat(v1, v2)
    }else {
      memo[key] = v1
    }
    return memo
  }, queryObject)

}

/** Used to map characters to HTML entities. */
const htmlEscapes = {
  '&': '&amp',
  '<': '&lt',
  '>': '&gt',
  '"': '&quot',
  "'": '&#39'
}

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @since 0.1.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @see escapeRegExp, unescape
 * @example
 *
 * escape('fred, barney, & pebbles')
 * // => 'fred, barney, &amp pebbles'
 */


export const escapeHtml = string => {
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
    : string
}

/** Used to map HTML entities to characters. */
const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
}

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @since 0.6.0
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @see escape, escapeRegExp
 * @example
 *
 * unescape('fred, barney, &amp; pebbles')
 * // => 'fred, barney, & pebbles'
 */

export const unescapeHtml = (string) => {
  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity])
    : string
}
