import '../lib.js'
import * as _ from 'lodash-es'
import { Board } from './1dboard.js'

let lines = readLines()
const path = lines.pop()
lines.pop()
const W = Math.max(...lines.map((line) => line.length))
const H = lines.length
const X = lines[0].indexOf('.')
lines = lines.map((line) => line.padEnd(W, ' '))

const board = Board.fromLines(lines)

let pos = { x: X, y: 0, f: 0 }

const move = [
  (pos) => ({ x: (pos.x + 1) % W, y: pos.y, f: pos.f }),
  (pos) => ({ x: pos.x, y: (pos.y + 1) % H, f: pos.f }),
  (pos) => ({ x: (pos.x + W - 1) % W, y: pos.y, f: pos.f }),
  (pos) => ({ x: pos.x, y: (pos.y + H - 1) % H, f: pos.f }),
]

path.split(/([LR])/).forEach((part, i) => {
  if (part === 'L') pos.f = (pos.f + 3) % 4
  else if (part === 'R') pos.f = (pos.f + 1) % 4
  else {
    let n = +part
    let nextPos
    while (n--) {
      nextPos = move[pos.f](pos)
      while (board.get(nextPos.x, nextPos.y) === ' ')
        nextPos = move[pos.f](nextPos)
      if (board.get(nextPos.x, nextPos.y) === '#') break
      pos = nextPos
    }
  }
})

logStar1(1000 * (pos.y + 1) + 4 * (pos.x + 1) + pos.f)

pos = { x: X, y: 0, f: 0 }

function wrapExample(x, y, f) {
  if (x === 12 && y < 8) return { x: W - 1 - (y - 4), y: 8, f: 1 }
  if (y === 3 && x < 8) return { x: 8, y: x - 4, f: 0 }
  if (y === 12 && x < 12) return { x: 3 - (x - 8), y: 7, f: 3 }
  return { x, y, f }
}

function wrapInput(x, y, f) {
  if (y === -1 && x < 100) return { x: 0, y: x + 100, f: 0 } // 1 -> 6
  if (x === 50 && y >= 150) return { x: y - 100, y: 149, f: 3 } // 6 -> 5
  if (y === 150 && x >= 50) return { x: 49, y: x + 100, f: 2 } // 5 -> 6
  if (x === 49 && 50 <= y && y < 100) return { x: y - 50, y: 100, f: 1 } // 3 -> 4
  if (y === 99 && x < 50) return { x: 50, y: x + 50, f: 0 } // 4 -> 3
  if (x === -1 && y < 150) return { x: 50, y: 149 - y, f: 0 } // 4 -> 1
  if (x === 49 && y < 50) return { x: 0, y: 149 - y, f: 0 }
  if (x === 100 && 50 <= y && y < 100) return { x: y + 50, y: 49, f: 3 }
  if (y === 50 && x >= 100) return { x: 99, y: x - 50, f: 2 }
  if (x === -1 && y >= 150) return { x: y - 100, y: 0, f: 1 }
  if (y === 200) return { x: x + 100, y: 0, f: 1 }
  if (y === -1 && x >= 100) return { x: x - 100, y: 199, f: 3 }
  if (x === 100 && y >= 100) return { x: 149, y: 149 - y, f: 2 }
  if (x === 150) return { x: 99, y: 149 - y, f: 2 }
  return { x, y, f }
}

const wrap = W < 50 ? wrapExample : wrapInput

const dx = [1, 0, -1, 0]
const dy = [0, 1, 0, -1]

path.split(/([LR])/).forEach((part, i) => {
  if (part === 'L') pos.f = (pos.f + 3) % 4
  else if (part === 'R') pos.f = (pos.f + 1) % 4
  else {
    let n = +part
    let nextPos
    while (n--) {
      nextPos = wrap(pos.x + dx[pos.f], pos.y + dy[pos.f], pos.f)
      if (board.get(nextPos.x, nextPos.y) === '#') break
      pos = nextPos
    }
  }
})

logStar2(1000 * (pos.y + 1) + 4 * (pos.x + 1) + pos.f)
