const stylishFormater = (diff) => diff
  .reduce((acc, key) => {
    if (key.type === 'PARENT') {
      return { ...acc, [key.name]: stylishFormater(key.children) };
    }
    if (key.type === 'ADDED') {
      return { ...acc, [`+ ${key.name}`]: key.value };
    }
    if (key.type === 'DELETED') {
      return { ...acc, [`- ${key.name}`]: key.value };
    }
    if (key.type === 'UNCHANGED') {
      return { ...acc, [`  ${key.name}`]: key.value };
    }
    return { ...acc, [`- ${key.name}`]: key.value[0], [`+ ${key.name}`]: key.value[1] };
  }, {});

const stylish = (diff) => {
  const diffObj = stylishFormater(diff);
  const diffQuoted = JSON.stringify(diffObj, null, '  ');
  return diffQuoted.replace(/"|,/g, '');
  // return diff;
};

export default stylish;
