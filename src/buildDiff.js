import sortBy from 'lodash/sortBy.js'

const isObject = val =>
  typeof val === 'object' && val !== null && !Array.isArray(val)

const buildNode = (key, type, value, oldValue = null, children = null) => ({
  key,
  type,
  value,
  oldValue,
  children,
})

export default function buildDiff(obj1, obj2) {
  const keys = sortBy(Object.keys({ ...obj1, ...obj2 }))

  return keys.map((key) => {
    const has1 = Object.hasOwn(obj1, key)
    const has2 = Object.hasOwn(obj2, key)
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (!has1) {
      return buildNode(key, 'added', val2)
    }
    if (!has2) {
      return buildNode(key, 'removed', val1)
    }
    if (isObject(val1) && isObject(val2)) {
      return buildNode(key, 'nested', null, null, buildDiff(val1, val2))
    }
    if (val1 !== val2) {
      return buildNode(key, 'updated', val2, val1)
    }
    return buildNode(key, 'unchanged', val1)
  })
}
