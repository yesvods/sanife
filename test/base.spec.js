import test from 'ava'
import { noop, first, last, isLast, hasOwnProperty } from '../src/base'

test('noop', t => {
  t.true(noop === noop)
  t.is(noop(), undefined)
})

test('last', t => {
  const array = [1, 2, 3]
  t.is(last(array), 3)
  t.is(last([]), undefined)
  t.is(last('1234'), undefined)
})

test('first', t => {
  const array = [1, 2, 3]
  t.is(first(array), 1)
  t.is(first([]), undefined)
  t.is(first('1234'), undefined)
})

test('isLast', t => {
  const array = [1, 2, 3]
  t.true(isLast([], 0))
  t.true(isLast(array, 2))
  t.false(isLast(array, 1))
})

test('hasOwnProperty', t => {
  const item = { name: 'tom' }
  t.true(hasOwnProperty === Object.prototype.hasOwnProperty)
  t.true(hasOwnProperty.call(item, 'name'))
})
