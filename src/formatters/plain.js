import _ from 'lodash';

const getUnionKeys = (file1, file2) => {
  const parsedFiles = [file1, file2];
  const keys = parsedFiles.map((file) => Object.keys(file));
  const [keys1, keys2] = keys;

  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys;
};

const getValue = (file, key) => {
  if (_.isObject(file[key])) {
    return '[complex value]';
  }
  return typeof file[key] === 'string' ? `'${file[key]}'` : file[key];
};

const diffObj = (file1, file2, path = '') => {
  const keys = getUnionKeys(file1, file2);
  return keys
    .flatMap((key) => {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return diffObj(file1[key], file2[key], `${path}${key}.`);
      }
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        return file1[key] !== file2[key]
          ? `Property '${path}${key}' was updated. From ${getValue(file1, key)} to ${getValue(file2, key)}`
          : '';
      }
      return Object.hasOwn(file1, key)
        ? `Property '${path}${key}' was removed`
        : `Property '${path}${key}' was added with value: ${getValue(file2, key)}`;
    });
};

export default (file1, file2) => _.compact(diffObj(file1, file2)).join('\n');
