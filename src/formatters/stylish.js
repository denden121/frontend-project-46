const indent = (depth) => ' '.repeat(2 * depth);

const isObject = (value) =>
  typeof value === 'object' && value !== null;

const stringifyIndent = (depth) => ' '.repeat(4 * (depth - 1));
const stringifyBracketIndent = (depth) => ' '.repeat(4 * Math.max(0, depth - 2));

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return typeof value === 'string' ? value : String(value);
  }

  const currentIndent = stringifyIndent(depth);
  const bracketIndent = stringifyBracketIndent(depth);

  const lines = Object
    .entries(value)
    .map(
      ([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`,
    );

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatNode = (node, depth) => {
  const prefix = indent(depth);
  switch (node.type) {
    case 'added':
      return `${prefix}+ ${node.key}: ${stringify(node.value, depth + 2)}`;
    case 'removed':
      return `${prefix}- ${node.key}: ${stringify(node.value, depth + 2)}`;
    case 'updated':
      return [
        `${prefix}- ${node.key}: ${stringify(node.oldValue, depth + 2)}`,
        `${prefix}+ ${node.key}: ${stringify(node.value, depth + 2)}`,
      ];
    case 'unchanged':
      return `${prefix}  ${node.key}: ${stringify(node.value, depth + 2)}`;
    case 'nested':
      return [
        `${prefix}${node.key}: {`,
        ...node.children.flatMap((child) => formatNode(child, depth + 1)),
        `${prefix}}`,
      ];
    default:
      return [];
  }
};

export default function formatStylish(nodes, depth = 2) {
  const lines = nodes.flatMap((node) => formatNode(node, depth));
  return ['{', ...lines, indent(depth - 1) + '}'].join('\n');
}
