// import getStylishDiff from './stylish.js';
// import getPlainDiff from './plain.js';
import stylish from './stylish1.js';
// import getJSONDiff from './json-formater.js';

export default (formater, diff) => {
  switch (formater) {
    case 'stylish':
      return stylish(diff);
      // return getStylishDiff(file1, file2);
    // case 'plain':
    //   return getPlainDiff(file1, file2);
    // case 'json':
    //   return getJSONDiff(file1, file2);
    default:
      throw new Error('Unknown format');
  }
};
