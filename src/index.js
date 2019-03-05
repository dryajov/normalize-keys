'use strict'

const transform = require('lodash.transform')
const camelCase = require('lodash.camelcase')
const isPlainObject = require('lodash.isplainobject')

/**
 * This will take an object and produce a new object with
 * the keys/properties normalized to the desired format, by
 * default camel case
 *
 * @param {Object} obj - the object to normalize
 * @param {*} formatter - a formatter function, by default `camelcase`
 * @param {*} skipKeys - an array of keys to skip from the resulting object
 */
const normalizeKeys = (obj, formatter = camelCase, skipKeys = []) => {
  if (typeof formatter !== 'function') {
    skipKeys = formatter
    formatter = camelCase
  }

  return transform(obj, (result, value, key) => {
    if (skipKeys.indexOf(key) > -1) { return }
    if (isPlainObject(value)) {
      value = normalizeKeys(value)
    }

    if (key.indexOf('-') > 0) {
      key = formatter(key)
    }
    result[key] = value
  }, {})
}

module.exports = normalizeKeys
