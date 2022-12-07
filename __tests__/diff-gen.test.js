import genDiff from '../src/index.js';

const file1 = 'file1.json';
const file2 = 'file2.json';
const file3 = 'file3.json';
const file4 = 'file4.json';
const file5 = 'file1.yml';
const file6 = 'file2.yaml';

test('empty files', () => {
  expect(genDiff(file3, file4)).toEqual('{\n}');
});

test('flat json files', () => {
  expect(genDiff(file1, file2)).toEqual(`{
   - follow: false
     host: hexlet.io
   - proxy: 123.234.53.22
   - timeout: 50
   + timeout: 20
   + verbose: true
}`);
});

test('flat yml files', () => {
  expect(genDiff(file5, file6)).toEqual(`{
   - follow: false
     host: hexlet.io
   - proxy: 123.234.53.22
   - timeout: 50
   + timeout: 20
   + verbose: true
}`);
});

test('def exts files', () => {
  expect(genDiff(file1, file6)).toEqual(`{
   - follow: false
     host: hexlet.io
   - proxy: 123.234.53.22
   - timeout: 50
   + timeout: 20
   + verbose: true
}`);
});
