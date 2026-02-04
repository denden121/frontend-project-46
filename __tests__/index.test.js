import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  test('сравнивает два плоских JSON-файла и возвращает строку с дифом', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('сравнивает два плоских YAML-файла и возвращает строку с дифом', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('ключи выводятся в алфавитном порядке', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = genDiff(filepath1, filepath2);
    const lines = result.split('\n').filter((line) => line.trim().length > 0);
    const keyOrder = lines
      .slice(1, -1)
      .map((line) => line.replace(/^[\s\-+]+/, '').split(':')[0].trim());
    const sorted = [...keyOrder].sort();
    expect(keyOrder).toEqual(sorted);
  });

  test('для различающегося ключа сначала строка первого файла, затем второго', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = genDiff(filepath1, filepath2);
    expect(result).toContain('  - timeout: 50');
    expect(result).toContain('  + timeout: 20');
    const minusIndex = result.indexOf('  - timeout: 50');
    const plusIndex = result.indexOf('  + timeout: 20');
    expect(minusIndex).toBeLessThan(plusIndex);
  });
});
