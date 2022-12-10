import fs from 'fs';
import yaml from 'yaml-js';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

export default (fileName) => {
  const filePath = getFixturePath(fileName);

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
