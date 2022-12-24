import '../lib.js'
import * as _ from 'lodash-es'

const lines = readLines()
const elves = lines.flatMap((line, y) =>
  Array.from(line.matchAll(/#/g)).map((m) => (y + 10) * 1000 + (m.index + 10))
)

const dir8 = [-1001, -1000, -999, 1, 1001, 1000, 999, -1]
const N = { mask: 0b00000111, delta: -1000 }
const S = { mask: 0b01110000, delta: +1000 }
const W = { mask: 0b11000001, delta: -1 }
const E = { mask: 0b00011100, delta: +1 }
let dir4 = [N, S, W, E]

function spread() {
  const occupied = new Set(elves)
  const free = new Set()
  const candidates = elves.map((elf) => {
    let neighbors = 0
    for (let i = 0; i < 8; i++) neighbors |= occupied.has(elf + dir8[i]) << i
    if (neighbors === 0) return
    for (let { mask, delta } of dir4)
      if ((neighbors & mask) === 0) {
        const position = elf + delta
        free.delete(position) || free.add(position)
        return position
      }
  })
  let moved = 0
  for (let i = 0; i < elves.length; i++) {
    if (free.has(candidates[i])) {
      elves[i] = candidates[i]
      moved++
    }
  }
  dir4.push(dir4.shift())
  return moved
}

for (let i = 0; i < 10; i++) spread()

const yList = elves.map((v) => Math.floor(v / 1000))
const xList = elves.map((v) => v % 1000)
const [xmin, xmax] = minmax(xList)
const [ymin, ymax] = minmax(yList)
logStar1((ymax - ymin + 1) * (xmax - xmin + 1) - elves.length)

let stable = false
let rounds = 10
while (!stable) stable = spread(rounds++) === 0
logStar2(rounds)
