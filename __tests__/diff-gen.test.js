import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

const getFixturePath = (fileName) => path.join(dirPath, '..', '__fixtures__', fileName);
const fileRead = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const expectedStylish = fileRead('expectedStylish.txt');
const expectedPlain = fileRead('expectedPlain.txt');
const expectedJSON = fileRead('expectedJSON.txt');

test.each([
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish', expectedStylish],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'plain', expectedPlain],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'json', expectedJSON],

  ['__fixtures__/file1.yml', '__fixtures__/file2.yaml', 'stylish', expectedStylish],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yaml', 'plain', expectedPlain],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yaml', 'json', expectedJSON],

  ['__fixtures__/file1.json', '__fixtures__/file2.yaml', 'stylish', expectedStylish],
  ['__fixtures__/file1.json', '__fixtures__/file2.yaml', 'plain', expectedPlain],
  ['__fixtures__/file1.json', '__fixtures__/file2.yaml', 'json', expectedJSON],
])('test\n%s\n%s\n%s', (file1Path, file2Path, format, expFile) => {
  const input = genDiff(file1Path, file2Path, format);
  const output = expFile;

  expect(input).toEqual(output);
});
