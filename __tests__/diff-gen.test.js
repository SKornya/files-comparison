import genDiff from '../src/index.js';

const file1 = 'file1.json';
const file2 = 'file2.json';
const file3 = 'file1.yml';
const file4 = 'file2.yaml';
const emptyFile1 = 'empty.json';
const emptyFile2 = 'empty.yaml';

test('empty files', () => {
  expect(genDiff(emptyFile1, emptyFile2)).toEqual('{}');
});

test('json files', () => {
  const expected = `{
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
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('one file empty', () => {
  const expected = `{
  + common: {
    setting1: Value 1
    setting2: 200
    setting3: true
    setting6: {
      key: value
      doge: {
        wow: 
      }
    }
  }
  + group1: {
    baz: bas
    foo: bar
    nest: {
      key: value
    }
  }
  + group2: {
    abc: 12345
    deep: {
      id: 45
    }
  }
}`;
  expect(genDiff(emptyFile1, file3)).toEqual(expected);
});

test('def exts files contrariwise', () => {
  const expected = `{
  common: {
    - follow: false
      setting1: Value 1
    + setting2: 200
    - setting3: null
    + setting3: true
    - setting4: blah blah
    - setting5: {
      key5: value5
    }
    setting6: {
      doge: {
        - wow: so much
        + wow: 
      }
        key: value
      - ops: vops
    }
  }
  group1: {
    - baz: bars
    + baz: bas
      foo: bar
    - nest: str
    + nest: {
      key: value
    }
  }
  + group2: {
    abc: 12345
    deep: {
      id: 45
    }
  }
  - group3: {
    deep: {
      id: {
        number: 45
      }
    }
    fee: 100500
  }
}`;
  expect(genDiff(file4, file1)).toEqual(expected);
});

test('plain formater', () => {
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  const format = 'plain';
  expect(genDiff(file1, file2, format)).toEqual(expected);
});

test('plain formater empty files', () => {
  const format = 'plain';
  expect(genDiff(emptyFile1, emptyFile2, format)).toEqual('');
});
