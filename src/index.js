import _ from 'lodash';
import getParsedFile from './parsers.js';

const getDiffObj = (file1, file2) => {
  const parsedFiles = [file1, file2];

  const keys = parsedFiles.map((file) => Object.keys(file));
  const [keys1, keys2] = keys;

  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys
    .reduce((acc, key) => {
      if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
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

export default (file1Name, file2Name) => {
  const file1 = getParsedFile(file1Name);
  const file2 = getParsedFile(file2Name);

  const diffQuoted = JSON.stringify(getDiffObj(file1, file2), null, '  ');
  const diff = diffQuoted.replace(/"|,/g, '');
  return diff;
};
