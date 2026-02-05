const formatValue = (value) =>
  (typeof value === 'string' ? value : String(value));

const indent = (depth) => '  '.repeat(depth);

const formatNode = (node, depth) => {
  const prefix = indent(depth);
  switch (node.type) {
    case 'added':
      return `${prefix}+ ${node.key}: ${formatValue(node.value)}`;
    case 'removed':
      return `${prefix}- ${node.key}: ${formatValue(node.value)}`;
    case 'updated':
      return [
        `${prefix}- ${node.key}: ${formatValue(node.oldValue)}`,
        `${prefix}+ ${node.key}: ${formatValue(node.value)}`,
      ];
    case 'unchanged':
      return `${prefix}  ${node.key}: ${formatValue(node.value)}`;
    case 'nested':
      return [
        `${prefix}  ${node.key}: {`,
        ...node.children.flatMap((child) => formatNode(child, depth + 2)),
        `${prefix}  }`,
      ];
    default:
      return [];
  }
};

export default function formatStylish(nodes, depth = 1) {
  const lines = nodes.flatMap((node) => formatNode(node, depth));
  return ['{', ...lines, indent(depth - 1) + '}'].join('\n');
}
