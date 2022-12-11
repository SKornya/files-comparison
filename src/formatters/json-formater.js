import _ from 'lodash';

const getUnionKeys = (file1, file2) => {
  const parsedFiles = [file1, file2];
  const keys = parsedFiles.map((file) => Object.keys(file));
  const [keys1, keys2] = keys;

  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys;
};

const getDiffObj = (file1, file2) => {
  const keys = getUnionKeys(file1, file2);
  return keys
    .reduce((acc, key) => {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
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

export default (file1, file2) => {
  const diffObj = getDiffObj(file1, file2);
  const diffQuoted = JSON.stringify(diffObj);
  // const diff = diffQuoted.replace(/"|,/g, '');
  return [diffQuoted];
};
