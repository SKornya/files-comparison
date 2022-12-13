import { test, expect } from '@jest/globals';
import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import { getFixturePath } from '../src/parsers.js';

// const filePath = fileURLToPath(import.meta.url);
// const dirPath = dirname(filePath);

// const getFixturePath = (fileName) => path.join(dirPath, '..', '__fixtures__', fileName);
const fileRead = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const expectedStylish = fileRead('expectedStylish.txt');
const expectedPlain = fileRead('expectedPlain.txt');
const expectedJSON = fileRead('expectedJSON.txt');

test.each([
  ['file1.json', 'file2.json', 'stylish', expectedStylish],
  ['file1.json', 'file2.json', 'plain', expectedPlain],
  ['file1.json', 'file2.json', 'json', expectedJSON],

  ['file1.yml', 'file2.yaml', 'stylish', expectedStylish],
  ['file1.yml', 'file2.yaml', 'plain', expectedPlain],
  ['file1.yml', 'file2.yaml', 'json', expectedJSON],

  ['file1.json', 'file2.yaml', 'stylish', expectedStylish],
  ['file1.json', 'file2.yaml', 'plain', expectedPlain],
  ['file1.json', 'file2.yaml', 'json', expectedJSON],
])('test %s %s %s', (file1Path, file2Path, format, expFile) => {
  const input = genDiff(file1Path, file2Path, format);
  const output = expFile;

  expect(input).toEqual(output);
});
