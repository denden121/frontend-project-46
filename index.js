import sortBy from 'lodash/sortBy.js';
import parseFile from './src/parser.js';

const formatValue = (value) =>
  (typeof value === 'string' ? value : String(value));

const getDiffLines = (obj1, obj2) => (key) => {
  const has1 = Object.hasOwn(obj1, key);
  const has2 = Object.hasOwn(obj2, key);
  const val1 = obj1[key];
  const val2 = obj2[key];

  if (!has1) return [`  + ${key}: ${formatValue(val2)}`];
  if (!has2) return [`  - ${key}: ${formatValue(val1)}`];
  if (val1 !== val2) {
    return [
      `  - ${key}: ${formatValue(val1)}`,
      `  + ${key}: ${formatValue(val2)}`,
    ];
  }
  return [`    ${key}: ${formatValue(val1)}`];
};



export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = sortBy(keys);
  const lines = sortedKeys.flatMap(getDiffLines(data1, data2));
  return ['{', ...lines, '}'].join('\n');
}
