import fs from 'fs'
import * as _ from 'lodash-es'

const rootDir = process.argv[1].match(/(.+\/)scripts/)[1]

async function runDay(dirname) {
  console.log(`----- ${dirname} -----`)
  // hack for lib.js to find the right input file
  process.argv[1] = `${rootDir}${dirname}`
  return import(`../${dirname}/index.js`)
}

const days = fs
  .readdirSync(new URL('..', import.meta.url))
  .filter((dir) => dir.startsWith('day'))

for (const dirname of days) await runDay(dirname)
