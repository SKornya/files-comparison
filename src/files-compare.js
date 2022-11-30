import _ from 'lodash';

export const file1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false,
};

export const file2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io",
  "abc": "tree",
};

export const genDiff = (file1, file2) => {

  const files = [file1, file2];
  const keys = files.map((file) => Object.keys(file));
  const [keys1, keys2] = keys;

  const intersectKeys = _.intersection(keys1, keys2);
  const unionKeys = _.union(keys1, keys2).sort();

  const getDiff = unionKeys.reduce((acc, key) => {
    if (intersectKeys.includes(key)) {
      return file1[key] === file2[key] ? `${acc}     ${key}: ${file1[key]}\n` : `${acc}   - ${key}: ${file1[key]}\n   + ${key}: ${file2[key]}\n`;
    } else {
      return keys1.includes(key) ? `${acc}   - ${key}: ${file1[key]}\n` : `${acc}   + ${key}: ${file2[key]}\n`;
    }
  }, '')

  const diff = `{\n${getDiff}}`;
  return diff;
};
