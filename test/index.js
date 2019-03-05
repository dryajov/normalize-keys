'use strict'

const test = require('tape')
const normalizeKeys = require('../src')

test('simple object', (t) => {
  const Obj1 = {
    'my-key-1': 'I am key #1',
    'my-key-2': 'I am key #2',
    'my-key-3': 'I am key #3',
    'my-key-4': 'I am key #4'
  }

  const Obj2 = normalizeKeys(Obj1)

  t.deepEqual(Obj2, {
    'myKey1': 'I am key #1',
    'myKey2': 'I am key #2',
    'myKey3': 'I am key #3',
    'myKey4': 'I am key #4'
  })

  t.end()
})

test('custom formatter function', (t) => {
  const Obj1 = {
    'my-key-1': 'I am key #1',
    'my-key-2': 'I am key #2',
    'my-key-3': 'I am key #3',
    'my-key-4': 'I am key #4'
  }

  const Obj2 = normalizeKeys(Obj1, (key) => {
    return key.replace(/-/gi, '.')
  })

  t.deepEqual(Obj2, {
    'my.key.1': 'I am key #1',
    'my.key.2': 'I am key #2',
    'my.key.3': 'I am key #3',
    'my.key.4': 'I am key #4'
  })

  t.end()
})

test('skip keys', (t) => {
  const Obj1 = {
    'my-key-1': 'I am key #1',
    'my-key-2': 'I am key #2',
    'my-key-3': 'I am key #3',
    'my-key-4': 'I am key #4'
  }

  const Obj2 = normalizeKeys(Obj1, ['my-key-1'])

  t.deepEqual(Obj2, {
    'myKey2': 'I am key #2',
    'myKey3': 'I am key #3',
    'myKey4': 'I am key #4'
  })

  t.end()
})

test('all together', (t) => {
  const Obj1 = {
    'my-key-1': 'I am key #1',
    'my-key-2': 'I am key #2',
    'my-key-3': 'I am key #3',
    'my-key-4': 'I am key #4'
  }

  const normalizer = (key) => {
    return key.replace(/-/gi, '.')
  }

  const Obj2 = normalizeKeys(Obj1, normalizer, ['my-key-1'])

  t.deepEqual(Obj2, {
    'my.key.2': 'I am key #2',
    'my.key.3': 'I am key #3',
    'my.key.4': 'I am key #4'
  })

  t.end()
})
