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
 * @param {*} normalizer - a formatter function, by default `camelcase`
 * @param {*} skipKeys - an array of keys to skip from the resulting object
 */
const normalizeKeys = (obj, normalizer = camelCase, skipKeys = []) => {
  if (typeof normalizer !== 'function') {
    skipKeys = normalizer
    normalizer = camelCase
  }

  return transform(obj, (result, value, key) => {
    if (skipKeys.indexOf(key) > -1) { return }
    if (isPlainObject(value)) {
      value = normalizeKeys(value)
    }

    if (key.indexOf('-') > 0) {
      key = normalizer(key)
    }
    result[key] = value
  }, {})
}

module.exports = normalizeKeys
