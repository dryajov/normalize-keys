# Normalize an object's keys

This is a simple module to normalize an objects keys. It will create a _new_ object, it will never mutate the original object.

## API

  `normalizeKeys` - takes an object and producse a new object with the keys/properties normalized to the desired format; by default camel case.

  - `{Object} obj`  - the object to normalize
  - `{Function} formatter` - a formatter function, by default `lodash.camelcase`
  - `{Array} skipKeys` - an array of keys to skip from the resulting object

### Example:

```js
const normalizeKeys = require('normalize-keys')

const formatter = (key) => {
  // camel case formatter....
}

const Obj1 = {
  'my-key-1': 'I am key #1',
  'my-key-2': 'I am key #2',
  'my-key-3': 'I am key #3',
  'my-key-4': 'I am key #4'
}

const Obj2 = normalizeKeys(Obj1, formatter, ['my-key-3'])

console.dir(Obj2)

// Prints:
// {
//   'myKey1': 'I am key #1',
//   'myKey2': 'I am key #2',
//   'myKey4': 'I am key #4'
// }
```
