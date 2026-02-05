
const nodeToJson = node => {
  const base = { key: node.key, type: node.type }

  switch (node.type) {
    case 'added':
      return { ...base, value: node.value }
    case 'removed':
      return { ...base, value: node.value }
    case 'updated':
      return { ...base, oldValue: node.oldValue, value: node.value }
    case 'unchanged':
      return { ...base, value: node.value }
    case 'nested':
      return { ...base, children: node.children.map(nodeToJson) }
    default:
      return base
  }
}

export default function formatJson(nodes) {
  const structure = nodes.map(nodeToJson)
  return JSON.stringify(structure, null, 2)
}
