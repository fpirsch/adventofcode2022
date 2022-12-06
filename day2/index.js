import '../lib.js'

const points = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 }
const rockPaperScissors = { '-2': 6, '-1': 0, 0: 3, 1: 6, 2: 0 }

const rounds = readLines().mapSplit()
const scores = rounds.map(([opp, you]) => {
  const a = points[you]
  const b = points[opp]
  return rockPaperScissors[a - b] + a
})
logStar1(sum(scores))

const choice = {
  X: [, 3, 1, 2],
  Y: [, 1, 2, 3],
  Z: [, 2, 3, 1],
}
const scores2 = rounds.map(([opp, you]) => {
  const b = points[opp]
  const a = choice[you][b]
  return rockPaperScissors[a - b] + a
})
logStar2(sum(scores2))
