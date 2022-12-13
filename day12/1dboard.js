import * as _ from 'lodash-es'
import '../lib.js'

// 1-D representation of a 2D board, with a surrounding wall.
export class Board {
  constructor(input, wallChar) {
    const width = input.indexOf('\n')
    const height = (input.length + 1) / (width + 1)
    this.H = height + 2
    this.W = width + 2
    this.directions = [-this.W, +this.W, -1, +1]
    const margin = Array(this.W + 1).fill(wallChar)
    this.data = [
      ...margin,
      ...input.replaceAll('\n', wallChar + wallChar),
      ...margin,
    ]
  }

  toString() {
    return _.chunk(this.data, this.W)
      .map((row) => row.join(''))
      .join('\n')
  }

  coord(pos) {
    return { x: pos % this.W, y: Math.floor(pos / this.W) }
  }

  pos(x, y) {
    return y * W + x
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
