import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPropertyDifference = (key, path) => {
  switch (key.type) {
    case 'ADDED':
      return `Property '${path}' was added with value: ${getValue(key.value)}`;
    case 'DELETED':
      return `Property '${path}' was removed`;
    case 'CHANGED':
      return `Property '${path}' was updated. From ${getValue(key.value[0])} to ${getValue(key.value[1])}`;
    case 'UNCHANGED':
      return '';
    default:
      throw new Error('unknown key type');
  }
};

const getFormatted = (diff, path = '') => diff
  .flatMap((key) => {
    const currentPath = `${path}${key.name}`;
    if (key.type === 'NESTED') {
      return getFormatted(key.children, `${currentPath}.`);
    }
    return getPropertyDifference(key, currentPath);
  });

export default (diff) => {
  const diffArr = getFormatted(diff);

  return _.compact(diffArr).join('\n');
};
