import genDiff from '../src/index.js';

const file1 = 'file1.json';
const file2 = 'file2.json';
const file3 = 'file1.yml';
const file4 = 'file2.yaml';

const expectedStylish = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
      key5: value5
    }
    setting6: {
      doge: {
        - wow: 
        + wow: so much
      }
        key: value
      + ops: vops
    }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
      key: value
    }
    + nest: str
  }
  - group2: {
    abc: 12345
    deep: {
      id: 45
    }
  }
  + group3: {
    deep: {
      id: {
        number: 45
      }
    }
    fee: 100500
  }
}`;
const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was deleted
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]`;
const expectedJSON = '[{"name":"common","type":"PARENT","children":[{"name":"follow","type":"ADDED","value":false},{"name":"setting1","type":"UNCHANGED","value":"Value 1"},{"name":"setting2","type":"DELETED","value":200},{"name":"setting3","type":"CHANGED","value":[true,null]},{"name":"setting4","type":"ADDED","value":"blah blah"},{"name":"setting5","type":"ADDED","value":{"key5":"value5"}},{"name":"setting6","type":"PARENT","children":[{"name":"doge","type":"PARENT","children":[{"name":"wow","type":"CHANGED","value":["","so much"]}]},{"name":"key","type":"UNCHANGED","value":"value"},{"name":"ops","type":"ADDED","value":"vops"}]}]},{"name":"group1","type":"PARENT","children":[{"name":"baz","type":"CHANGED","value":["bas","bars"]},{"name":"foo","type":"UNCHANGED","value":"bar"},{"name":"nest","type":"CHANGED","value":[{"key":"value"},"str"]}]},{"name":"group2","type":"DELETED","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","type":"ADDED","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

const diffStylish = [genDiff(file1, file2), genDiff(file3, file4), genDiff(file1, file4)];
const diffPlain = [genDiff(file1, file2, 'plain'), genDiff(file3, file4, 'plain'), genDiff(file1, file4, 'plain')];
const diffJSON = [genDiff(file1, file2, 'json'), genDiff(file3, file4, 'json'), genDiff(file1, file4, 'json')];

test('stylish formater', () => {
  for (let i = 0; i < diffStylish.length; i += 1) {
    expect(diffStylish[i]).toEqual(expectedStylish);
  }
});

test('plain formater', () => {
  for (let i = 0; i < diffPlain.length; i += 1) {
    expect(diffPlain[i]).toEqual(expectedPlain);
  }
});

test('JSON formater', () => {
  for (let i = 0; i < diffJSON.length; i += 1) {
    expect(diffJSON[i]).toEqual(expectedJSON);
  }
});
