import genDiff from '../src/diff-gen.js';

const path1 = '__fixtures__/file1.json';
const path2 = '__fixtures__/file2.json';

test('paths', () => {
  expect(genDiff(path1, path2)).toEqual(`{
   - follow: false
     host: hexlet.io
   - proxy: 123.234.53.22
   - timeout: 50
   + timeout: 20
   + verbose: true
}`);
});
