// Static code analysis: most used library functions
import fs from 'fs'

const matchSlice = (str, re, start, end) =>
  str.match(re)?.map((match) => match.slice(start, end))

const libCode = String(fs.readFileSync(new URL('../lib.js', import.meta.url)))
const libFunctions = matchSlice(libCode, /global\.\w+ =/g, 7, -2)
// Capture direct calls and callback calls (not always a "(" after the name)
const libRegex = new RegExp(`[^.](${libFunctions.join('|')})\\b`, 'g')
const libProtoFunctions = matchSlice(libCode, /prototype\.\w+ =/g, 10, -2)
const libProtoRegex = new RegExp(`\\.(${libProtoFunctions.join('|')})\\(`, 'g')

const usage = {}

function updateUsage(lib, calls) {
  calls
    ?.map((method) => `${lib}.${method}`)
    .forEach((method) => usage[method]++ || (usage[method] = 1))
}

function statsOnDay(dirname) {
  const code = String(
    fs.readFileSync(new URL(`../${dirname}/index.js`, import.meta.url))
  )
  const lodashMethods = matchSlice(code, /_\.\w+\b/g, 2)
  const libProtoCalls = matchSlice(code, libProtoRegex, 1, -1)
  const libCalls = matchSlice(code, libRegex, 1)
  updateUsage('_', lodashMethods)
  updateUsage('lib', libProtoCalls)
  updateUsage('lib', libCalls)
}

fs.readdirSync(new URL('..', import.meta.url))
  .filter((dir) => dir.startsWith('day'))
  .forEach(statsOnDay)

const longestName = Math.max(...Object.keys(usage).map((name) => name.length))
const stats = Object.entries(usage)
  .sort((a, b) => b[1] - a[1])
  .map(
    ([name, count]) =>
      `${name.padEnd(longestName)}    ${String(count).padStart(2)} calls`
  )
  .join('\n')

console.log('Lib usage stats:')
console.log('----------------')
console.log(stats)
