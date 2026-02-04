import fs from 'fs';
import path from 'path';

export default function parseFile(filepath) {
  const absolutePath = path.isAbsolute(filepath)
    ? filepath
    : path.resolve(process.cwd(), filepath);

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const ext = path.extname(filepath).toLowerCase();

  switch (ext) {
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
}
