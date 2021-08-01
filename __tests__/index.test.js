import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiff JSON', () => {
  const pathToJSON1 = getFixturePath('before.json');
  const pathToJSON2 = getFixturePath('after.json');
  expect(genDiff(pathToJSON1, pathToJSON2)).toBe(readFile('result.txt'));
});
test('genDiff YAML', () => {
  const pathToYML1 = getFixturePath('before.yml');
  const pathToYML2 = getFixturePath('after.yml');
  expect(genDiff(pathToYML1, pathToYML2)).toBe(readFile('result.txt'));
});
