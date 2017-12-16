# Sanife -- Swiss Army Knife [![Build Status](https://travis-ci.org/yesvods/sanife.svg?branch=master)](https://travis-ci.org/yesvods/sanife)

**Slight and Elegance Function Utils.**

![](https://ooo.0o0.ooo/2017/03/08/58c01857b426d.png)

## Usage

```bash
# install
$ npm install sanife
```

```js
// ES6 Module
import * as _ from 'sanife'

// COMMONJS
const _ = require('sanife')
```

## Util List

### get

lodash like `get` but slighter and powerful

```js
const foo = { bar: 233 }
_.get(foo, 'bar') // 233

// more example
const apple = { color: [{ txt: 'red', rgb: '#00ffff' }] }
_.get(apple, 'color[0].rgb') // #00ffff

const people = [{ name: 'tom', age: 18 }]
_.get(tom, '0.name') // tom
_.get(tom, '[0]name') // tom
```

### set

lodash like `set` but slighter and powerful

```js
const item = {}
_.set(item, 'class[0].names[0]', 'oops') // class: [{ names: ['oops'] }]
```

### pick

lodash like `pick` but slighter and powerful

```js
const item = {
  a: 'a',
  b: {
    c: 'c',
  },
  e: [{ f: 'f' }],
}

_.pick(item, ['a', 'b.c']) //  {a: 'a', c: 'c'}
_.pick(item, ['e[0].f']) // {f: 'f'}
```

### contains

Detect whether:

* array contains spec item
* object contains spec key

```js
const list = [1, 2, 3]
_.contains(list, 2) // true
_.contains(list, 4) // false

const item = { name: 'tom', age: 22 }
_.contains(item, 'name') // true
```

### remove

Remove

* item from array
* subString from string

```js
_.remove([1, 2, 3], 2) // [1, 3]
_.remove('12321474312', ['2', '3']) // 114741
```

## Base

### first

```js
const list = [1, 2, 3]
_.fist(list) // 1
```

### last

```js
const list = [1, 2, 3]
_.last(list) // 3
```

### noop

```js
_.noop() // do nothing
```

### hasOwnProperty

Shortcut for Object.prototype.hasOwnProperty

## isType

All kind of slight type detection

### #isEmpty

### #isString

### #isNumber

### #isNumberStr

### #isArray

### #isFunction

### #isBoolean

### #isObject

### #isPlainObject

### #isUndefined

### #isUri

### #isDONNode
