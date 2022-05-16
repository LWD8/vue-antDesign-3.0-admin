export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

export function isObject(val) {
  return val !== null && is(val, 'Object')
}
