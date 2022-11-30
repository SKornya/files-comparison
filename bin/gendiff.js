#!/usr/bin/env node

import { program } from 'commander';
import { file1, file2, genDiff } from '../src/files-compare.js';
import fs from 'fs';
import _ from 'lodash';

console.log(genDiff(file1, file2));

program
  .version("1.0.0")
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((path1, path2) => genDiff(fs.readFileSync(path1), fs.readFileSync(path2)));

program.parse();

