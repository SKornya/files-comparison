import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getFormatted = (diff, path = '') => diff
  .flatMap((key) => {
    const currentPath = `${path}${key.name}`;
    switch (key.type) {
      case 'PARENT':
        return getFormatted(key.children, `${currentPath}.`);
      case 'ADDED':
        return `Property '${currentPath}' was added with value: ${getValue(key.value)}`;
      case 'DELETED':
        return `Property '${currentPath}' was removed`;
      case 'CHANGED':
        return `Property '${currentPath}' was updated. From ${getValue(key.value[0])} to ${getValue(key.value[1])}`;
      case 'UNCHANGED':
        return '';
      default:
        throw new Error('unknown key type');
    }
  });

export default (diff) => {
  const diffArr = getFormatted(diff);

  return _.compact(diffArr).join('\n');
};
