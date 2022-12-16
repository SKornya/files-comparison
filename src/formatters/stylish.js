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
      const marks = {
        PARENT: `${indent(depth)}${blankMark}${key.name}`,
        ADDED: `${indent(depth)}${plusMark}${key.name}`,
        DELETED: `${indent(depth)}${minusMark}${key.name}`,
        UNCHANGED: `${indent(depth)}${blankMark}${key.name}`,
        CHANGED: `${indent(depth)}${minusMark}${key.name}`,
      };
      switch (key.type) {
        case 'PARENT':
          return `${marks[key.type]}: ${formater(key.children, depth + 1)}`;
        case 'ADDED':
        case 'DELETED':
        case 'UNCHANGED':
          return `${marks[key.type]}: ${getValue(key.value, depth)}`;
        default:
          return `${marks.DELETED}: ${getValue(key.value[0], depth)}\n${marks.ADDED}: ${getValue(key.value[1], depth)}`;
      }
    });

    return `{\n${formatted.join('\n')}\n${indent(depth)}}`;
  };

  return formater(diff);
};

export default stylish;
