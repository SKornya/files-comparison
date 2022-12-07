import _ from 'lodash';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fileParse from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export default (path1, path2) => {
  const parsedFiles = [getFixturePath(path1), getFixturePath(path2)]
    .map((filePath) => fileParse(filePath));

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
