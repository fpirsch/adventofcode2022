import '../lib.js'
import * as _ from 'lodash-es'

const lines = readLines()

const move = {
  U: { dx: 0, dy: 1 },
  D: { dx: 0, dy: -1 },
  L: { dx: -1, dy: 0 },
  R: { dx: 1, dy: 0 },
}

const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }
const visited = new Set(['0,0'])
const dist = (k1, k2) => Math.max(Math.abs(k1.x - k2.x), Math.abs(k1.y - k2.y))

lines.forEach((line) => {
  const dir = line[0]
  const len = +line.slice(2)
  const { dx, dy } = move[dir]
  for (let i = 0; i < len; i++) {
    head.x += dx
    head.y += dy
    if (dist(head, tail) > 1) {
      tail.x += Math.sign(head.x - tail.x)
      tail.y += Math.sign(head.y - tail.y)
      visited.add(`${tail.x},${tail.y}`)
    }
  }
})

logStar1(visited.size)

// Could have used only 1 array including the head for both stars, but didn't know that in the 1st part
head.x = head.y = 0
const knots = Array.from({ length: 9 }, () => ({ x: 0, y: 0 }))

visited.clear()

lines.forEach((line) => {
  const dir = line[0]
  const len = +line.slice(2)
  const { dx, dy } = move[dir]
  for (let i = 0; i < len; i++) {
    head.x += dx
    head.y += dy
    let prevKnot = head
    knots.forEach((knot) => {
      if (dist(prevKnot, knot) > 1) {
        knot.x += Math.sign(prevKnot.x - knot.x)
        knot.y += Math.sign(prevKnot.y - knot.y)
      }
      prevKnot = knot
    })
    visited.add(`${knots[8].x},${knots[8].y}`)
  }
})

logStar2(visited.size)
