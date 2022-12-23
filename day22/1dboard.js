import * as _ from 'lodash-es'
import '../lib.js'

// 1-D representation of a 2D board
export class Board {
  constructor(W, H, initialValue = '.') {
    this.W = W
    this.H = H
    this.directions = [-W, +W, -1, +1]
    this.data = new Array(W * H).fill(initialValue)
  }

  toString() {
    return _.chunk(this.data, this.W)
      .map((row) => row.join(''))
      .join('\n')
  }

  log() {
    log(this.toString())
  }

  vLine(x, y = 0, h = this.H, value = '#') {
    for (let y2 = y + h; y < y2; y++) this.data[y * this.W + x] = value
    return this
  }

  hLine(x = 0, y = 0, l = this.W, value = '#') {
    for (let x2 = x + l; x < x2; x++) this.data[y * this.W + x] = value
    return this
  }

  border(value = '#') {
    this.vLine(0, 0, this.H, value)
    this.vLine(this.W - 1, 0, this.H, value)
    this.hLine(0, 0, this.W, value)
    this.hLine(0, this.H - 1, this.W, value)
    return this
  }

  line(x1, y1, x2, y2, value = '#') {
    if (y1 === y2)
      this.hLine(Math.min(x1, x2), y1, Math.abs(x2 - x1) + 1, value)
    else this.vLine(x1, Math.min(y1, y2), Math.abs(y2 - y1) + 1, value)
    return this
  }

  coord(pos) {
    return { x: pos % this.W, y: Math.floor(pos / this.W) }
  }

  pos(x, y) {
    return y * this.W + x
  }

  get(x, y) {
    return this.data[y * this.W + x]
  }

  set(x, y, value) {
    this.data[y * this.W + x] = value
  }

  expand(n = 1, filler = '.') {
    const H = this.H + 2 * n
    const W = this.W + 2 * n
    const data = new Array(W * H).fill(filler)
    for (let y = n; y < H - n; y++) {
      const start = y * W
      const oldStart = (y - n) * this.W
      for (let x = n; x < W - n; x++)
        data[start + x] = this.data[oldStart + x - n]
    }
    this.W = W
    this.H = H
    this.data = data
    this.directions = [-W, +W, -1, +1]
    return this
  }

  // returns a 1-D array with all minimum distances to start,
  // with a condition to walk from a point to the next.
  minDistance(start, condition) {
    const queue = [start]
    const minDist = Array(this.data.length).fill(Infinity)
    minDist[start] = 0

    while (queue.length) {
      const node = queue.shift()
      const dist = minDist[node] + 1
      const height = this.data[node]
      this.directions.forEach((direction) => {
        const pos = node + direction
        if (
          dist < minDist[pos] &&
          condition(this.data[pos], pos, height, node, dist)
        ) {
          minDist[pos] = dist
          queue.push(pos)
        }
      })
    }
    return minDist
  }
}

Board.fromLines = (lines) => {
  const width = lines[0].length
  const height = lines.length
  const board = new Board(width, height)

  lines.forEach((line, y) => {
    const lineStart = y * width
    for (let x = 0; x < line.length; x++) board.data[lineStart + x] = line[x]
  })
  return board
}
