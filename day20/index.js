import '../lib.js'
import * as _ from 'lodash-es'

// Lost so much time because I didn't realise there were duplicate numbers in the input
// And because some moves are larger than the size of the list, like -9804

// Thanks to Math.random, duplicates are no more duplicates.
const numbers = readLines().map((x) => +x + Math.random())
const n = numbers.length

function decode(key = 1, iterations = 1) {
  const list = new Float64Array(numbers) // they have copyWithin

  for (let i = 0; i < iterations; i++) {
    for (let value of numbers) {
      const from = list.indexOf(value)
      const moves = Math.floor(value) * key

      // this line took me hours...
      const pos = (from + (moves % (n - 1)) + (n - 1)) % (n - 1)

      // copyWithin does the grunt work
      if (pos > from) list.copyWithin(from, from + 1, pos + 1)
      else if (pos < from) list.copyWithin(pos + 1, pos, from)
      list[pos] = value
    }
  }

  const zero = list.findIndex((x) => 0 < x && x < 1) // because of random offset
  const get = (i) => Math.floor(list[i % n])
  return (get(zero + 1000) + get(zero + 2000) + get(zero + 3000)) * key
}

logStar1(decode())
logStar2(decode(811589153, 10))
