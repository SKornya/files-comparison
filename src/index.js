import getDiff from './parsers.js';
import format from './formatters/index.js';

export default (file1Path, file2Path, formater = 'stylish') => {
  const diff = getDiff(file1Path, file2Path);

  return format(formater, diff);
};
