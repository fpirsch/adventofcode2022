import '../lib.js'
import * as _ from 'lodash-es'

const lines = readLines()
const W = lines[0].length - 2
const H = lines.length - 2

const blizzards = lines.flatMap((line, y) =>
  Array.from(line.matchAll(/([<>^v])/g)).map((m) => ({
    x: m.index,
    y,
    d: line[m.index],
  }))
)
// not winds, just walls near the entrance and exit
blizzards.push({ x: 2, y: 0, d: '#' })
blizzards.push({ x: W - 1, y: H + 1, d: '#' })

const toSet = (blizzards) => new Set(blizzards.map(({ x, y }) => (x << 8) | y))

// Memoize the weather for each time.
// Both the list of coordinates+directions (blizzards) and set of forbidden positions (closed) are stored.
const weather = [{ blizzards, closed: toSet(blizzards) }]

function blow({ blizzards }) {
  const newBlizzards = blizzards.map(({ x, y, d }) => {
    if (d === '<') return { x: x > 1 ? x - 1 : W, y, d }
    if (d === '>') return { x: x < W ? x + 1 : 1, y, d }
    if (d === '^') return { x, y: y > 1 ? y - 1 : H, d }
    if (d === 'v') return { x, y: y < H ? y + 1 : 1, d }
    return { x, y, d } // wall
  })
  return { blizzards: newBlizzards, closed: toSet(newBlizzards) }
}

// Cross the valley from (x, y, t) to the other end.
function bfs(x, y, t) {
  const goal = H + 1 - y
  const queue = [(t << 16) | (x << 8) | y]
  const visited = new Set(queue)
  while (queue.length > 0) {
    const state = queue.shift()
    const t = state >> 16
    const pos = state & 0xffff
    const x = pos >> 8
    const y = pos & 0xff

    // exit condition
    if (y === goal) return t
    const { closed } = weather[t + 1] ?? (weather[t + 1] = blow(weather[t]))

    for (let delta of [-1, +1, -256, +256, 0]) {
      if (delta === -1 && (y === 0 || (y === 1 && x !== 1))) continue // no up except in front of start
      if (delta === +1 && (y === H + 1 || (y === H && x !== W))) continue // no down except in front of exit
      if (delta === -256 && x === 1) continue // no left at x === 1
      if (delta === +256 && x === W) continue // no right at x === W
      const nextState = state + 0x10000 + delta
      if (visited.has(nextState) || closed.has(pos + delta)) continue
      queue.push(nextState)
      visited.add(nextState)
    }
  }
}

const t1 = bfs(1, 0, 0)
logStar1(t1)

const t2 = bfs(W, H + 1, t1)
const t3 = bfs(1, 0, t2)
logStar2(t3)
