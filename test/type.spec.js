import test from 'ava'
import {
  isString,
  isNumber,
  isNumberStr,
  isArray,
  isFunction,
  isBoolean,
  isPlainObject,
  isUndefined,
  isUri,
  isEmpty,
} from '../src/type'

const noop = function() {}

test('isString', t => {
  t.true(isString('sd'))
  t.false(isString(1234))
})

test('isNumber', t => {
  t.false(isNumber('sd'))
  t.true(isNumber(1234))
})

test('isNumberStr', t => {
  t.false(isNumberStr('12f'))
  t.true(isNumberStr('1234'))
})

test('isArray', t => {
  t.true(isArray([]))
  t.false(isArray(1234))
})

test('isFunction', t => {
  const fn = () => {
    console.log('hello')
  }
  t.true(isFunction(fn))
  t.false(isFunction(1234))
})

test('isFunction', t => {
  t.true(isBoolean(false))
  t.true(isBoolean(true))
  t.false(isBoolean(1234))
})

test('isPlainObject', t => {
  t.true(isPlainObject({}))
  t.false(isPlainObject(noop))
})

test('isUndefined', t => {
  let a
  t.true(isUndefined(undefined))
  t.true(isUndefined(a))
  t.false(isUndefined(1234))
})

test('isUrl', t => {
  t.true(isUri('//xx.com'))
  t.true(isUri('http://xx.com'))
  t.true(isUri('ftp://xx.com'))
  t.false(isUri('xx.com'))
  t.false(isUri('xx'))
})

test('isEmpty', t => {
  t.true(isEmpty([]))
  t.true(isEmpty({}))
  t.true(isEmpty(null))
  t.true(isEmpty(undefined))
  t.false(isEmpty([1]))
  t.false(isEmpty({ name: 1 }))
})
