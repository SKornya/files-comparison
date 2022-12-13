import _ from 'lodash';

const indent = (depth) => '    '.repeat(depth);

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const formattedKeys = keys
      .map((key) => `${indent(depth + 2)}${key}: ${getValue(value[key], depth + 1)}`);
    return `{\n${formattedKeys.join('\n')}\n${indent(depth + 1)}}`;
  }
  return value;
};

const plusMark = '  + ';
const minusMark = '  - ';
const blankMark = '    ';

const stylish = (diff) => {
  const formater = (data, depth = 0) => {
    const formatted = data
      .map((key) => {
        if (key.type === 'PARENT') {
          return `${indent(depth)}${blankMark}${key.name}: ${formater(key.children, depth + 1)}`;
        }
        if (key.type === 'ADDED') {
          return `${indent(depth)}${plusMark}${key.name}: ${getValue(key.value, depth)}`;
        }
        if (key.type === 'DELETED') {
          return `${indent(depth)}${minusMark}${key.name}: ${getValue(key.value, depth)}`;
        }
        if (key.type === 'UNCHANGED') {
          return `${indent(depth)}${blankMark}${key.name}: ${getValue(key.value, depth)}`;
        }
        return `${indent(depth)}${minusMark}${key.name}: ${getValue(key.value[0], depth)}\n${indent(depth)}${plusMark}${key.name}: ${getValue(key.value[1], depth)}`;
      }, {});

    return `{\n${formatted.join('\n')}\n${indent(depth)}}`;
  };

  return formater(diff);
};

export default stylish;
