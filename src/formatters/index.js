import getStylish from './stylish.js';
import getPlain from './plain.js';

export default (formatter, diff) => {
  switch (formatter) {
    case 'stylish':
      return getStylish(diff);
    case 'plain':
      return getPlain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error('Unknow format');
  }
};
