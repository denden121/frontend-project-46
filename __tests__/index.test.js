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
    expect(result).toContain('    - timeout: 50');
    expect(result).toContain('    + timeout: 20');
    const minusIndex = result.indexOf('    - timeout: 50');
    const plusIndex = result.indexOf('    + timeout: 20');
    expect(minusIndex).toBeLessThan(plusIndex);
  });

  test('по умолчанию используется формат stylish', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2)).toBe(genDiff(filepath1, filepath2, 'stylish'));
  });

  test('формат plain: плоский вывод с полным путём свойства', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = genDiff(filepath1, filepath2, 'plain');
    expect(result).toContain("Property 'follow' was removed");
    expect(result).toContain("Property 'proxy' was removed");
    expect(result).toContain("Property 'timeout' was updated. From 50 to 20");
    expect(result).toContain("Property 'verbose' was added with value: true");
  });

  test('формат plain: вложенные свойства отображаются полным путём, составные значения как [complex value]', () => {
    const filepath1 = getFixturePath('file1_nested.json');
    const filepath2 = getFixturePath('file2_nested.json');
    const result = genDiff(filepath1, filepath2, 'plain');
    expect(result).toContain("Property 'common.follow' was added with value: false");
    expect(result).toContain("Property 'common.setting2' was removed");
    expect(result).toContain("Property 'common.setting3' was updated. From true to null");
    expect(result).toContain("Property 'common.setting4' was added with value: 'blah blah'");
    expect(result).toContain("Property 'common.setting5' was added with value: [complex value]");
    expect(result).toContain("Property 'common.setting6.doge.wow' was updated. From '' to 'so much'");
    expect(result).toContain("Property 'common.setting6.ops' was added with value: 'vops'");
    expect(result).toContain("Property 'group1.baz' was updated. From 'bas' to 'bars'");
    expect(result).toContain("Property 'group1.nest' was updated. From [complex value] to 'str'");
    expect(result).toContain("Property 'group2' was removed");
    expect(result).toContain("Property 'group3' was added with value: [complex value]");
  });

  test('формат json: вывод — валидный JSON, массив узлов с type, key и при необходимости value/oldValue/children', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = genDiff(filepath1, filepath2, 'json');
    expect(() => JSON.parse(result)).not.toThrow();
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
    parsed.forEach((node) => {
      expect(node).toHaveProperty('key');
      expect(node).toHaveProperty('type');
      expect(['added', 'removed', 'updated', 'unchanged', 'nested']).toContain(node.type);
    });
    const added = parsed.find((n) => n.type === 'added' && n.key === 'verbose');
    expect(added).toBeDefined();
    expect(added.value).toBe(true);
    const updated = parsed.find((n) => n.type === 'updated' && n.key === 'timeout');
    expect(updated).toBeDefined();
    expect(updated.oldValue).toBe(50);
    expect(updated.value).toBe(20);
  });

  test('формат json: вложенные объекты представлены узлами с type nested и массивом children', () => {
    const filepath1 = getFixturePath('file1_nested.json');
    const filepath2 = getFixturePath('file2_nested.json');
    const result = genDiff(filepath1, filepath2, 'json');
    const parsed = JSON.parse(result);
    const common = parsed.find((n) => n.key === 'common' && n.type === 'nested');
    expect(common).toBeDefined();
    expect(common.children).toBeDefined();
    expect(Array.isArray(common.children)).toBe(true);
  });

  test('неизвестный формат выбрасывает ошибку', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unknown format: unknown');
  });
});
