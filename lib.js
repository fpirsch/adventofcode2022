// My personal advent of code lib. Will probably evolve a lot.
// Globals, prototype pollution... Don't do this on production code.
// It's perfect for one-shot custom personal code like this, tho.
// We want to go fast, not to go far.

import fs from 'fs'

const dayDir = () => process.argv[1].match(/.+?\/day\d+/)[0]

let startTime
const start = () => (startTime = performance.now())
const restart = () => {
  const elapsed = Math.round(performance.now() - startTime)
  start()
  return elapsed
}

global.log = console.log
global.logStar1 = (value) => log('star 1:', value, `(${restart()}ms)`)
global.logStar2 = (value) => log('star 2:', value, `(${restart()}ms)`)

Array.prototype.mapSplit = function (sep = ' ') {
  return this.map((str) => str.split(sep))
}

global.matchPositiveNumbers = (str) => str.match(/[.\d]+/g).map((x) => +x)
global.matchNumbers = (str) => str.match(/-?[.\d]+/g).map((x) => +x)

global.readInput = (file = 'input') =>
  String(fs.readFileSync(`${dayDir()}/${file}.txt`)).trimEnd(start())
global.readLines = (file) => readInput(file).split('\n')
global.readParagraphs = (file) => readInput(file).split('\n\n').mapSplit('\n')
global.readNumbers = (file) => readLines(file).map(Number)

global.sum = (list) => list.reduce((a, b) => a + +b, 0)
global.asc = (a, b) => a - b
global.desc = (a, b) => b - a
