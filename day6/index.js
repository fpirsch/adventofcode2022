import '../lib.js'

const signal = readLines()[0]

const pos = [...signal].findIndex(
  (c, i) => new Set(signal.slice(i, i + 4)).size === 4
)

logStar1(pos + 4)

const pos2 = [...signal].findIndex(
  (c, i) => new Set(signal.slice(i, i + 14)).size === 14
)

logStar2(pos2 + 14)
