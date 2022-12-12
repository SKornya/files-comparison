import getDiff from './parsers1.js';
import format from './formatters/index.js';
// import _ from 'lodash';
// import getParsedFile from './parsers.js';
// import getFormatter from './formatters/index.js';

export default (file1Path, file2Path, formater = 'stylish') => {
  const diff = getDiff(file1Path, file2Path);
  return format(formater, diff);
  // return getFormatter(file1, file2, format);
};
