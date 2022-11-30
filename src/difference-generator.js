import _ from 'lodash';
import fs from 'fs';
import yaml from 'yaml-js';

const parseJSONFromPath = (path) => JSON.parse(fs.readFileSync(path));
const parseYMLFromPath = (path) => yaml.load(fs.readFileSync(path)); // for yml files parse later

export default (path1, path2) => {
  const parsedFiles = [path1, path2]
    .map((path) => (_.last(path.split('.')) === 'json' ? parseJSONFromPath(path) : parseYMLFromPath(path)));

  const [file1, file2] = parsedFiles;
  const keys = parsedFiles.map((file) => Object.keys(file));
  const [keys1, keys2] = keys;

  const intersectKeys = _.intersection(keys1, keys2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  const getDiff = unionKeys.reduce((acc, key) => {
    if (intersectKeys.includes(key)) {
      return file1[key] === file2[key]
        ? `${acc}     ${key}: ${file1[key]}\n`
        : `${acc}   - ${key}: ${file1[key]}\n   + ${key}: ${file2[key]}\n`;
    }
    return keys1.includes(key)
      ? `${acc}   - ${key}: ${file1[key]}\n`
      : `${acc}   + ${key}: ${file2[key]}\n`;
  }, '');

  const diff = `{\n${getDiff}}`;
  return diff;
};
