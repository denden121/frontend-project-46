import fs from 'fs'
import path from 'path'
import parseJson from './json.js'
import parseYaml from './yaml.js'

export default function parseFile(filepath) {
  const absolutePath = path.isAbsolute(filepath)
    ? filepath
    : path.resolve(process.cwd(), filepath)

  let content
  try {
    content = fs.readFileSync(absolutePath, { encoding: 'utf-8' })
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`File not found: ${absolutePath}`)
    }
    throw err
  }

  const ext = path.extname(filepath).toLowerCase()

  switch (ext) {
    case '.json':
      return parseJson(content)
    case '.yml':
    case '.yaml':
      return parseYaml(content)
    default:
      throw new Error(`Unsupported file format: ${ext}`)
  }
}
