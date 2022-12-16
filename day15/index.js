import '../lib.js'
import * as _ from 'lodash-es'

// x: -281319 4006219, y: -342775 4475047
const lines = readLines()

// see day 4
const overlapOrTouch = (l1, r1, l2, r2) => l2 <= r1 + 1 && l1 <= r2 + 1
const fullyContain = (l1, r1, l2, r2) =>
  (l1 <= l2 && r2 <= r1) || (l2 <= l1 && r1 <= r2)
const canMerge = (r1, r2) =>
  overlapOrTouch(r1.x1, r1.x2, r2.x1, r2.x2) ||
  fullyContain(r1.x1, r1.x2, r2.x1, r2.x2)

function getImpossiblePos(y) {
  const ranges = []
  const beacons = new Set()

  // create a range for each diamond crossing that line
  lines.forEach((line) => {
    const [xs, ys, xb, yb] = matchNumbers(line)
    if (yb === y) beacons.add(xb)
    const d = manhattan(xs, ys, xb, yb)
    const dy = Math.abs(y - ys)
    if (dy <= d) ranges.push({ x1: xs - d + dy, x2: xs + d - dy })
  })

  // merge ranges
  for (let i = ranges.length - 1; i > 0; i--) {
    let j = i - 1
    while (j >= 0 && !canMerge(ranges[i], ranges[j])) j--
    if (j >= 0) {
      ranges[j].x1 = Math.min(ranges[i].x1, ranges[j].x1)
      ranges[j].x2 = Math.max(ranges[i].x2, ranges[j].x2)
      ranges[i] = null
    }
  }
  return { ranges: ranges.filter(Boolean), beacons: beacons.size }
}

const { ranges, beacons } = getImpossiblePos(2000000)
logStar1(sum(ranges.map(({ x1, x2 }) => x2 - x1 + 1)) - beacons)

// Found at y = 3186981
for (let y = 4000000; y >= 0; y--) {
  const { ranges } = getImpossiblePos(y)
  if (ranges.length === 2) {
    const x = ranges[0].x2 + 1
    logStar2(x * 4000000 + y)
    break
  }
}
