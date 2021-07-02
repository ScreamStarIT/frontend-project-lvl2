import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiff flat JSON', () => {
  const pathToJSON1 = getFixturePath('file1.json');
  const pathToJSON2 = getFixturePath('file2.json');
  expect(genDiff(pathToJSON1, pathToJSON2)).toBe(readFile('result.txt'));
});
test('genDiff flat YAML', () => {
  const pathToYAML1 = getFixturePath('file1.yaml');
  const pathToYAML2 = getFixturePath('file2.yaml');
  const pathToYML1 = getFixturePath('file1.yml');
  const pathToYML2 = getFixturePath('file2.yml');
  expect(genDiff(pathToYAML1, pathToYAML2)).toBe(readFile('result.txt'));
  expect(genDiff(pathToYML1, pathToYML2)).toBe(readFile('result.txt'));
});