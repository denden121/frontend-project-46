const getMarkerIndent = (level) => ' '.repeat(level * 4 - 2)
const getPlainIndent = (level) => ' '.repeat(level * 4)

const isObject = (value) =>
  typeof value === 'object' && value !== null

const stringifyIndent = (level) => ' '.repeat((level + 1) * 4)
const stringifyBracketIndent = (level) => ' '.repeat(level * 4)

const stringify = (value, level) => {
  if (!isObject(value)) {
    return typeof value === 'string' ? value : String(value)
  }

  const currentIndent = stringifyIndent(level)
  const bracketIndent = stringifyBracketIndent(level)

  const lines = Object
    .entries(value)
    .map(
      ([key, val]) => `${currentIndent}${key}: ${stringify(val, level + 1)}`,
    )

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const formatNode = (node, level) => {
  const markerIndent = getMarkerIndent(level)
  const plainIndent = getPlainIndent(level)
  switch (node.type) {
    case 'added':
      return `${markerIndent}+ ${node.key}: ${stringify(node.value, level)}`
    case 'removed':
      return `${markerIndent}- ${node.key}: ${stringify(node.value, level)}`
    case 'updated':
      return [
        `${markerIndent}- ${node.key}: ${stringify(node.value1 ?? node.oldValue, level)}`,
        `${markerIndent}+ ${node.key}: ${stringify(node.value2 ?? node.value, level)}`,
      ]
    case 'unchanged':
      return `${plainIndent}${node.key}: ${stringify(node.value, level)}`
    case 'nested':
      return [
        `${plainIndent}${node.key}: {`,
        ...node.children.flatMap((child) => formatNode(child, level + 1)),
        `${plainIndent}}`,
      ]
    default:
      return []
  }
}

export default function formatStylish(nodes, level = 1) {
  const lines = nodes.flatMap((node) => formatNode(node, level))
  return ['{', ...lines, getPlainIndent(level - 1) + '}'].join('\n')
}
