import _ from 'lodash';
import getParsedFile from './parsers.js';
import getStylishDiff from './formatters/stylish.js';
// import getPlainDiff from './plain.js';

const getUnionKeys = (file1, file2) => {
  const parsedFiles = [file1, file2];
  const keys = parsedFiles.map((file) => Object.keys(file));
  const [keys1, keys2] = keys;

  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys;
};

const isObjectAndNotArray = (file, key) => typeof file[key] === 'object' && !Array.isArray(file[key]);

const getDiffObj = (file1, file2) => {
  const keys = getUnionKeys(file1, file2);
  return keys
    .reduce((acc, key) => {
      if (isObjectAndNotArray(file1, key) && isObjectAndNotArray(file2, key)) {
        return { ...acc, [key]: getDiffObj(file1[key], file2[key]) };
      }
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        return file1[key] === file2[key]
          ? { ...acc, [`  ${key}`]: file1[key] } : { ...acc, [`- ${key}`]: file1[key], [`+ ${key}`]: file2[key] };
      }
      return Object.hasOwn(file1, key)
        ? { ...acc, [`- ${key}`]: file1[key] } : { ...acc, [`+ ${key}`]: file2[key] };
    }, {});
};

export default (file1Name, file2Name, format = 'stylish') => {
  const file1 = getParsedFile(file1Name);
  const file2 = getParsedFile(file2Name);

  const diffObj = getDiffObj(file1, file2);
  if (format === 'stylish') {
    return getStylishDiff(diffObj);
  }
  return '';
//     : getPlainDiff(file1, file2, unionKeys);
};
