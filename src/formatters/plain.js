import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plainFormater = (diff, path = '') => diff
  .flatMap((key) => {
    switch (key.type) {
      case 'PARENT':
        return plainFormater(key.children, `${path}${key.name}.`);
      case 'ADDED':
        return `Property '${path}${key.name}' was added with value: ${getValue(key.value)}`;
      case 'DELETED':
        return `Property '${path}${key.name}' was removed`;
      case 'CHANGED':
        return `Property '${path}${key.name}' was updated. From ${getValue(key.value[0])} to ${getValue(key.value[1])}`;
      case 'UNCHANGED':
        return '';
      default:
        throw new Error('unknown key type');
    }
  });

export default (diff) => {
  const diffArr = plainFormater(diff);

  return _.compact(diffArr).join('\n');
};
