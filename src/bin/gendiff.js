#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.2.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(genDiff);

program.parse();