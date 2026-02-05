import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

export default (formatName) => {
  const format = formatters[formatName];
  if (!format) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return format;
};
