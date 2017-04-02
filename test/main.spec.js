import test from 'ava'
import {get, set, pick, contains, escapeHtml, unescapeHtml} from '../src/main'

test('get', t => {
  let o = {people: {name: 'xiaoming'}}
  t.deepEqual(get(o, 'people.name'), 'xiaoming')
  o = [{name: 'xiaoming'}]
  t.deepEqual(get(o, '0.name'), 'xiaoming')
  o = {people: [{name: 'xiaoming'}]}
  t.deepEqual(get(o, 'people.0.name'), 'xiaoming')
})

test('set', t => {
  let o = {}
  t.deepEqual(set(o, 'class.name', 'oops'), {class: {name: 'oops'}})
})

test('pick', t => {
  const o = {
    a: 'a',
    b: {
      c: 'c'
    },
    e: [{f: 'f'}]
  }
  t.deepEqual(pick(o, ['a', 'b.c']), {a: 'a', c: 'c'})
  t.deepEqual(pick(o, ['e[0].f']), {f: 'f'})
})

test('contains', t => {
  t.true(contains([1,2,3], 2))
  t.false(contains([1,2,3], 4))
  t.true(contains('a b c', 'a'))
  t.true(contains({name: 123, age: 32}, 'name'))
})

test('escap', t => {
  t.is(escapeHtml('&'), '&amp')
  t.is(unescapeHtml('&amp;'), '&')
})