import getStylishDiff from './stylish.js';
import getPlainDiff from './plain.js';
import getJSONDiff from './json-formater.js';

export default (file1, file2, format) => {
  switch (format) {
    case 'stylish':
      return getStylishDiff(file1, file2);
    case 'plain':
      return getPlainDiff(file1, file2);
    case 'json':
      return getJSONDiff(file1, file2);
    default:
      throw new Error('Unknow format');
  }
};
