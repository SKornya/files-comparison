import fs from 'fs';
import yaml from 'yaml-js';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';

const getAbsolutePath = (fileName) => path.resolve(process.cwd(), fileName);

const getFileContent = (fileName) => {
  const filePath = getAbsolutePath(fileName);

  const ext = path.extname(filePath).slice(1);
  switch (ext) {
    case 'json':
      return JSON.parse(fs.readFileSync(filePath));
    case 'yml':
    case 'yaml':
      return yaml.load(fs.readFileSync(filePath));
    default:
      throw new Error('Unknow file format');
  }
};

export default (file1Path, file2Path, formatter = 'stylish') => {
  const file1Data = getFileContent(file1Path);
  const file2Data = getFileContent(file2Path);

  const diff = parse(file1Data, file2Data);

  return format(formatter, diff);
};
