import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plainFormater = (diff, path = '') => diff
  .flatMap((key) => {
    if (key.type === 'PARENT') {
      return plainFormater(key.children, `${path}${key.name}.`);
    }
    if (key.type === 'ADDED') {
      return `Property '${path}${key.name}' was added with value: ${getValue(key.value)}`;
    }
    if (key.type === 'DELETED') {
      return `Property '${path}${key.name}' was removed`;
    }
    if (key.type === 'CHANGED') {
      return `Property '${path}${key.name}' was updated. From ${getValue(key.value[0])} to ${getValue(key.value[1])}`;
    }
    return '';
  }, {});

export default (diff) => {
  const diffArr = plainFormater(diff);

  return _.compact(diffArr).join('\n');
};
