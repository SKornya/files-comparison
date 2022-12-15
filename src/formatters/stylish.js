import _ from 'lodash';

const indent = (depth) => '    '.repeat(depth);

const plusMark = '  + ';
const minusMark = '  - ';
const blankMark = '    ';

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const formattedKeys = keys
      .map((key) => {
        const keyValue = getValue(value[key], depth + 1);
        return `${indent(depth + 2)}${key}: ${keyValue}`;
      });
    return `{\n${formattedKeys.join('\n')}\n${indent(depth + 1)}}`;
  }
  return value;
};

const stylish = (diff) => {
  const formater = (data, depth = 0) => {
    const formatted = data.map((key) => {
      switch (key.type) {
        case 'PARENT':
          return `${indent(depth)}${blankMark}${key.name}: ${formater(key.children, depth + 1)}`;
        case 'ADDED':
          return `${indent(depth)}${plusMark}${key.name}: ${getValue(key.value, depth)}`;
        case 'DELETED':
          return `${indent(depth)}${minusMark}${key.name}: ${getValue(key.value, depth)}`;
        case 'UNCHANGED':
          return `${indent(depth)}${blankMark}${key.name}: ${getValue(key.value, depth)}`;
        default:
          return `${indent(depth)}${minusMark}${key.name}: ${getValue(key.value[0], depth)}\n${indent(depth)}${plusMark}${key.name}: ${getValue(key.value[1], depth)}`;
      }
    });

    return `{\n${formatted.join('\n')}\n${indent(depth)}}`;
  };

  return formater(diff);
};

export default stylish;
