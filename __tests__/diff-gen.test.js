import genDiff from '../src/diff-gen.js';

test('empty files', () => {
  const path1 = 'file3.json';
  const path2 = 'file4.json';

  expect(genDiff(path1, path2)).toEqual('{\n}');
});

test('two files', () => {
  const path1 = 'file1.json';
  const path2 = 'file2.json';

  expect(genDiff(path1, path2)).toEqual(`{
   - follow: false
     host: hexlet.io
   - proxy: 123.234.53.22
   - timeout: 50
   + timeout: 20
   + verbose: true
}`);
});
