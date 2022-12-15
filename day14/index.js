import '../lib.js'
import * as _ from 'lodash-es'
import { Board } from './1dboard.js'

const lines = readLines()
// data1 x 494 503 - y 4 9
// input x 483 544 - y 16 164
const W = 70
const H = lines.length > 100 ? 167 : 12
const map = new Board(W, H)
map
  .vLine(0)
  .vLine(W - 1)
  .hLine(0, H - 1)

lines.forEach((line) => {
  const coords = matchNumbers(line)
  for (let i = 2; i < coords.length; i += 2) {
    map.line(coords[i - 2] - 480, coords[i - 1], coords[i] - 480, coords[i + 1])
  }
})

let units = 0

function fallUntil(targetY) {
  while (units < 10000) {
    let x = 20 // 500 - offset = 20
    let y = 0
    while (y < H - 1) {
      if (map.get(x, y + 1) === '.') y++
      else if (map.get(x - 1, y + 1) === '.') x--, y++
      else if (map.get(x + 1, y + 1) === '.') x++, y++
      else break
    }
    units++
    map.set(x, y, 'o')
    if (y === targetY) return
  }
}

fallUntil(H - 2)
logStar1(units - 1)

fallUntil(0)

const triangleSurface = (h) => (h * (h + 1)) / 2
function findHeight(x) {
  let h = 0
  while (map.get(x, h) === '.') h++
  return H - 2 - h
}

const leftSand = triangleSurface(findHeight(1))
const rightSand = triangleSurface(findHeight(W - 2))

logStar2(units + leftSand + rightSand)
