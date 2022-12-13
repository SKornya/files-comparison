import fs from 'fs';
import yaml from 'yaml-js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const getFileContent = (fileName) => {
  const filePath = getFixturePath(fileName);

  const ext = path.extname(filePath);
  switch (ext) {
    case '.json':
      return JSON.parse(fs.readFileSync(filePath));
    case '.yml':
      return yaml.load(fs.readFileSync(filePath));
    case '.yaml':
      return yaml.load(fs.readFileSync(filePath));
    default:
      throw new Error('unknow file format');
  }
};

const getUnionKeys = (file1, file2) => {
  const files = [file1, file2];
  const keys = files.map((file) => Object.keys(file));
  const [keys1, keys2] = keys;

  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys;
};

const getFile = (filePath) => getFileContent(filePath);

const getDiff = (file1, file2, filesKeys) => filesKeys
  .map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        name: key,
        type: 'PARENT',
        children: getDiff(file1[key], file2[key], getUnionKeys(file1[key], file2[key])),
      };
    }
    if (!Object.hasOwn(file1, key)) {
      return {
        name: key,
        type: 'ADDED',
        value: file2[key],
      };
    }
    if (!Object.hasOwn(file2, key)) {
      return {
        name: key,
        type: 'DELETED',
        value: file1[key],
      };
    }
    if (file1[key] === file2[key]) {
      return {
        name: key,
        type: 'UNCHANGED',
        value: file1[key],
      };
    }
    return {
      name: key,
      type: 'CHANGED',
      value: [file1[key], file2[key]],
    };
  });

export default (file1Path, file2Path) => {
  const file1 = getFile(file1Path);
  const file2 = getFile(file2Path);
  const keys = getUnionKeys(file1, file2);

  return getDiff(file1, file2, keys);
};
