// import _ from 'lodash';
import getParsedFile from './parsers.js';
import getFormatter from './formatters/index.js';

export default (file1Path, file2Path, format = 'stylish') => {
  const file1 = getParsedFile(file1Path);
  const file2 = getParsedFile(file2Path);

  return getFormatter(file1, file2, format);
};
