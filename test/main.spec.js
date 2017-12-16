import test from 'ava'
import {
  get,
  set,
  pick,
  contains,
  urlMix,
  remove,
  quickMerge,
  merge,
} from '../src/main'

test('get', t => {
  let o = { people: { name: 'xiaoming' } }
  t.deepEqual(get(o, 'people.name'), 'xiaoming')

  o = [{ name: 'xiaoming' }]
  t.deepEqual(get(o, '0.name'), 'xiaoming')

  o = { people: [{ name: 'xiaoming' }] }
  t.deepEqual(get(o, 'people.0.name'), 'xiaoming')

  o = { 0: 1, a: 2 }
  t.deepEqual(get(o, '0'), 1)
  t.deepEqual(get(o, '[0]'), 1)
  t.deepEqual(get(o, 'a'), 2)

  o = { a: { 0: 1 } }
  t.deepEqual(get(o, 'a[0]'), 1)

  o = { 0: { a: 1 } }
  t.deepEqual(get(o, '[0].a'), 1)

  o = {}
  t.deepEqual(get(o, ''), {})
  t.deepEqual(get(1, 'a'), undefined)
  t.deepEqual(get(o, 'a', 1), 1)
})

test('set', t => {
  let o = {}
  t.deepEqual(set(o, 'class.name', 'oops'), { class: { name: 'oops' } })

  o = {}
  t.deepEqual(set(o, 'class[0].names[0]', 'oops'), {
    class: [{ names: ['oops'] }],
  })

  t.deepEqual(set(1, 'a', 1), undefined)
})

test('pick', t => {
  const o = {
    a: 'a',
    b: {
      c: 'c',
    },
    e: [{ f: 'f' }],
  }
  t.deepEqual(pick(o, ['a', 'b.c']), { a: 'a', c: 'c' })
  t.deepEqual(pick(o, ['e[0].f']), { f: 'f' })
  t.deepEqual(pick(1, ['e[0].f']), 1)
})

test('contains', t => {
  t.true(contains([1, 2, 3], 2))
  t.false(contains([1, 2, 3], 4))
  t.false(contains(1234, 4))
  t.true(contains('a b c', 'a'))
  t.true(contains({ name: 123, age: 32 }, 'name'))
})

test('remove', t => {
  const arr = [1, 2, 3]
  const o1 = { v: 1 }
  const o2 = { v: 2 }
  const o3 = { v: 3 }
  const oArr = [o1, o2, o3]
  t.deepEqual(remove(arr, 2), [1, 3])
  t.deepEqual(remove(arr, [1, 2]), [3])
  t.is(remove('12321474312', ['2', '3']), '114741')
  t.deepEqual(remove(oArr, o1), [o2, o3])
})

// test('quickMerge', t => {
//   let o1 = {
//     arr: [1, 2],
//     obj: {a: 1, b: 2}
//   }
//   let o2 = {
//     arr: [3, 4],
//     obj: {a: 0, c: 3}
//   }
//   t.deepEqual(
//     quickMerge(o1, o2),
//     {arr: [1,2,3,4], obj: {a:0, b:2, c:3}}
//   )
// })

// test('merge', t => {
//   let o1 = {
//     arr: [1, 2],
//     obj: {a: 1, b: 2}
//   }
//   let o2 = {
//     arr: [3, 4],
//     obj: {a: 0, c: 3}
//   }
//   let o3 = {
//     arr: [3, 4, 5],
//     obj: {a: 0, c: 3, d: 4}
//   }
//   t.deepEqual(
//     merge(o1, o2, o3),
//     {arr: [1,2,3,4,5], obj: {a:0, b:2, c:3, d: 4}}
//   )
// })

test('urlMix - FullUrlPath', t => {
  let url = 'http://xx.com?a=1&b=2'
  t.is(urlMix(url, { c: 3, b: 1 }, true), 'http://xx.com?a=1&b=1&b=2&c=3')

  t.is(urlMix(url, { c: 3, b: 1 }, false), 'http://xx.com?a=1&b=1&c=3')
})

test('urlMix - relativePath', t => {
  let url = '/hello.do?a=1&b=2'
  t.is(urlMix(url, { c: 3, b: 1 }, true), '/hello.do?a=1&b=1&b=2&c=3')
  t.is(urlMix(url, { c: 3, b: 1 }, true), '/hello.do?a=1&b=1&b=2&c=3')
  t.is(urlMix(url, { c: 3, b: 1 }, false), '/hello.do?a=1&b=1&c=3')

  url = '/hello.do?a=1&a=3&b=2'
  t.is(urlMix(url, { c: 3, b: 1 }, false), '/hello.do?a=1&a=3&b=1&c=3')
  t.is(urlMix(url, { c: 3, b: 1 }, false), '/hello.do?a=1&a=3&b=1&c=3')
  t.is(urlMix(1234, { c: 3, b: 1 }, false), '')
})
