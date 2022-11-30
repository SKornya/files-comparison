#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/difference-generator.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((path1, path2) => console.log(genDiff(path1, path2)));

program.parse();

export default genDiff;
