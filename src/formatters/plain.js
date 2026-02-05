const isComplex = (value) =>
  typeof value === 'object' && value !== null;

const formatValue = (value) => {
  if (isComplex(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const flattenNodes = (nodes, path = '') => {
  const lines = [];

  nodes.forEach((node) => {
    const fullPath = path ? `${path}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        lines.push(
          `Property '${fullPath}' was added with value: ${formatValue(node.value)}`,
        );
        break;
      case 'removed':
        lines.push(`Property '${fullPath}' was removed`);
        break;
      case 'updated':
        lines.push(
          `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.value)}`,
        );
        break;
      case 'nested':
        lines.push(...flattenNodes(node.children, fullPath));
        break;
      default:
        break;
    }
  });

  return lines;
};

export default function formatPlain(nodes) {
  return flattenNodes(nodes).join('\n');
}
