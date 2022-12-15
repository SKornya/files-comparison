import _ from 'lodash';

const getDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { name: key, type: 'PARENT', children: getDiff(file1[key], file2[key]) };
    }
    if (!Object.hasOwn(file1, key)) {
      return { name: key, type: 'ADDED', value: file2[key] };
    }
    if (!Object.hasOwn(file2, key)) {
      return { name: key, type: 'DELETED', value: file1[key] };
    }
    if (file1[key] === file2[key]) {
      return { name: key, type: 'UNCHANGED', value: file1[key] };
    }
    return { name: key, type: 'CHANGED', value: [file1[key], file2[key]] };
  });
};

export default (file1Data, file2Data) => getDiff(file1Data, file2Data);
