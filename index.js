import parseFile from './src/parsers/index.js'
import buildDiff from './src/buildDiff.js'
import getFormatter from './src/formatters/index.js'

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diffTree = buildDiff(data1, data2)
  const format = getFormatter(formatName)
  return format(diffTree)
}
