#!/usr/bin/env node
import { Command } from 'commander'
import { createRequire } from 'module'
import genDiff from '../index.js'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(function (filepath1, filepath2) {
    const formatName = this.opts().format ?? 'stylish'
    const diff = genDiff(filepath1, filepath2, formatName)
    console.log(diff)
  })

program.parse()
