const indent = (depth) => '    '.repeat(depth);

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
          return `${indent(depth)}${plusMark}${key.name}: ${key.value}`;
        }
        if (key.type === 'DELETED') {
          return `${indent(depth)}${minusMark}${key.name}: ${key.value}`;
        }
        if (key.type === 'UNCHANGED') {
          return `${indent(depth)}${blankMark}${key.name}: ${key.value}`;
        }
        return `${indent(depth)}${minusMark}${key.name}: ${key.value[0]}\n${indent(depth)}${plusMark}${key.name}: ${key.value[1]}`;
      }, {});

    return `{\n${formatted.join('\n')}\n${indent(depth)}}`;
  };

  return formater(diff);
};

export default stylish;
