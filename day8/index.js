import '../lib.js'

const lines = readLines()
const H = lines.length,
  W = lines[0].length

const forest = lines.join('') // 1-dimensional board representation
const visible = Array(forest.length).fill(0)

function setVisibleRow(start, direction, count) {
  let hmax = -1
  for (let i = 0; i < count; i++) {
    const tree = start + i * direction
    if (forest[tree] > hmax) {
      visible[tree] = 1
      hmax = forest[tree]
    }
  }
}

for (let y = 0; y < H; y++) {
  setVisibleRow(y * H, 1, W)
  setVisibleRow(y * H + W - 1, -1, W)
}

for (let x = 0; x < W; x++) {
  setVisibleRow(x, W, H)
  setVisibleRow(x + (W - 1) * H, -W, H)
}

logStar1(visible.filter((v) => v).length)

function viewingDist(startTree, direction, max) {
  let h = forest[startTree]
  let d = 0
  for (let i = 1; i <= max; i++) {
    d++
    if (forest[startTree + d * direction] >= h) break
  }
  return d
}

let maxScore = 0
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const tree = y * W + x
    const score =
      viewingDist(tree, -W, y) * // up
      viewingDist(tree, +W, H - 1 - y) * // down
      viewingDist(tree, -1, x) * // left
      viewingDist(tree, +1, W - 1 - x) // right
    if (score > maxScore) maxScore = score
  }
}

logStar2(maxScore)
