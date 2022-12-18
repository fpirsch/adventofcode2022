import '../lib.js'
import * as _ from 'lodash-es'
import { Board } from './1dboard.js'

const shapes = [
  [
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [1, 1],
    [0, 3],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [0, 3],
  ],
  [[0, 4]],
  [
    [0, 2],
    [0, 2],
  ],
]

const input = readInput()

// for part 2 we need to loop ≈ 10000 times to find a cycle,
// this leads to a height just above 15000 units
const board = new Board(7, 16000)
board.toString = function () {
  return _.chunk(this.data, this.W)
    .slice(0, Math.max(...height) + 3)
    .reverse()
    .map((row) => row.join(''))
    .join('\n')
}

const height = Array(7).fill(0)
let windIndex = 0

const canMove = (shape, x, y) => {
  if (x < 0 || x + shape.length > 7 || y < 0) return false
  return shape.every(([bottom, h], dx) => {
    for (let i = 0; i < h; i++) {
      if (board.get(x + dx, y + bottom + i) === '#') return false
    }
    return true
  })
}

// Store each height variation to find a cycle for part 2
const dh = []

function fall(shape) {
  let x = 2
  const towerHeight = Math.max(...height)
  let y = towerHeight + 3
  while (true) {
    const wind = input[windIndex++ % input.length]
    if (wind === '<' && canMove(shape, x - 1, y)) x--
    else if (wind === '>' && canMove(shape, x + 1, y)) x++
    if (canMove(shape, x, y - 1)) y--
    else break
  }
  shape.forEach(([bottom, h], i) => {
    board.vLine(x + i, y + bottom, h)
    height[x + i] = Math.max(height[x + i], y + bottom + h)
  })
  dh.push(Math.max(...height) - towerHeight)
}

for (let i = 0; i < 2022; i++) fall(shapes[i % 5])

logStar1(Math.max(...height))

function detectCycle(list, reps) {
  const last = list.length - 1
  let candidate = last
  main: while (true) {
    candidate = list.lastIndexOf(list[last], candidate - 1)
    if (candidate < 0) return false
    const length = last - candidate
    for (let i = 0; i < length; i++) {
      const ref = last - i
      for (let j = 1; j < reps; j++) {
        if (list[ref] !== list[ref - length * j]) continue main
      }
    }
    return length
  }
}

// The cycle doesn't show with the 2022 first rocks, so let's continue
const sampleRocks = 10000
for (let i = 2022; i < sampleRocks; i++) fall(shapes[i % 5])

const h = Math.max(...height)

const cycleLength = detectCycle(dh, 5)
const cycle = dh.slice(-cycleLength)
const fullCycles = Math.floor((1000000000000 - sampleRocks) / cycleLength)
const partialCycleSize = (1000000000000 - sampleRocks) % cycleLength
const cycleSum = sum(cycle)
const partialCycleSum = sum(cycle.slice(0, partialCycleSize))

logStar2(h + fullCycles * cycleSum + partialCycleSum)
