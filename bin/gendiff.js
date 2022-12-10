#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format (default: stylish)', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1Name, file2Name) => console.log(genDiff(file1Name, file2Name)));

program.parse();

export default genDiff;
