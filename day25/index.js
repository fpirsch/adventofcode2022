import '../lib.js'
import * as _ from 'lodash-es'

const lines = readLines()

const snafu = { 2: 2, 1: 1, 0: 0, '-': -1, '=': -2 }
const snafuToDec = (s) => s.split('').reduce((n, d) => n * 5 + snafu[d], 0)
const decToSnafu = (n) => {
  let s = ''
  while (n) {
    const m = n % 5
    s = '012=-'[m] + s
    if (m >= 3) n += 5
    n = Math.floor(n / 5)
  }
  return s
}

const total = sum(lines.map(snafuToDec))
logStar1(decToSnafu(total))
