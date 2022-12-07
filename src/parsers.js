import fs from 'fs';
import yaml from 'yaml-js';
import path from 'path';

// const parseJSONFromPath = (filePath) => JSON.parse(fs.readFileSync(filePath));
// const parseYMLFromPath = (filePath) => yaml.load(fs.readFileSync(filePath));

export default (filePath) => {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.json':
      return JSON.parse(fs.readFileSync(filePath));
    case '.yml':
      return yaml.load(fs.readFileSync(filePath));
    case '.yaml':
      return yaml.load(fs.readFileSync(filePath));
    default:
      throw new Error('unknow file format');
  }
};
