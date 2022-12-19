import '../lib.js'
import * as _ from 'lodash-es'

log('WARNING! THIS ONE IS LONGER (40s)')

const blueprints = readLines().map((line) => {
  const [, oreOre, clayOre, obsOre, obsClay, geodeOre, geodeObs] =
    matchPositiveNumbers(line)
  return [
    [oreOre, 0, 0],
    [clayOre, 0, 0],
    [obsOre, obsClay, 0],
    [geodeOre, 0, geodeObs],
  ]
})

// max bots = max cost of this resource per bot (no need to produce more than you can spend)
const maxCost = blueprints.map(([ore, clay, obs, geode]) => [
  Math.max(ore[0], clay[0], obs[0], geode[0]), // max ore cost per bot
  obs[1], // max clay cost: only obsidian bots
  geode[2], // max obsidian cost: only geode bots
  Infinity, // no max for geode bots
])

let maxGeodes = 0

// DFS with a lot of pruning.
function dfs(blueprint, maxBots, state) {
  // THis optimization is super big.
  // How many geode bots we could build even with infinite production.
  let maxPossibleGeodeBots = state[0]
  // If we don't have enough obsidian right now, that's at least 1 less.
  if (state[7] < blueprint[3][2]) maxPossibleGeodeBots--
  // If, with current production, we still don't have enough at the next turn, that's 2 less
  if (state[7] + state[3] < blueprint[3][2]) maxPossibleGeodeBots -= 2
  // Maximum theoretical geodes we could collect until the end.
  const maxPossibleGeodeProduction =
    (maxPossibleGeodeBots * (maxPossibleGeodeBots + 1)) / 2
  const maxPossibleGeodes =
    state[8] + state[4] * state[0] + maxPossibleGeodeProduction

  // if it doesn't have a chance to beat the current maximum, prune this branch.
  if (maxPossibleGeodes <= maxGeodes) return

  for (let i = 0; i < 5; i++) {
    let newState
    if (i === 4) newState = state.slice() // don't build a bot
    else {
      // Maybe build bot type 0-3
      // If we have enough of this type of bot, prune.
      if (state[1 + i] >= maxBots[i]) continue
      // Production of this resource is enough for the rest of the time left - big optim
      // No more than 90% of max. Because it's twice as fast, and it works. Less than 90% would prune too much.
      const minCollectable = state[5 + i] + state[0] * state[1 + i]
      const maxSpendable = state[0] * maxBots[i]
      if (minCollectable >= maxSpendable * 0.85) continue
      const botCost = blueprint[i]
      if (state[5] - botCost[0] < 0) continue
      if (state[6] - botCost[1] < 0) continue
      if (state[7] - botCost[2] < 0) continue
      newState = state.slice()
      newState[5] -= botCost[0]
      newState[6] -= botCost[1]
      newState[7] -= botCost[2]
      newState[1 + i]++
    }
    // decrease time
    newState[0]--
    // collect resources
    newState[5] += state[1]
    newState[6] += state[2]
    newState[7] += state[3]
    newState[8] += state[4]
    if (newState[0] === 0) maxGeodes = newState[8]
    else dfs(blueprint, maxBots, newState)
  }
}

let total = 0
blueprints.forEach((bp, i) => {
  maxGeodes = 0
  dfs(bp, maxCost[i], [24, 1, 0, 0, 0, 0, 0, 0, 0])
  total += maxGeodes * (i + 1)
})

logStar1(total)

let product = 1
for (let i = 0; i < 3; i++) {
  maxGeodes = 0
  dfs(blueprints[i], maxCost[i], [32, 1, 0, 0, 0, 0, 0, 0, 0])
  product *= maxGeodes
  log({ blueprint: i + 1, maxGeodes })
}
logStar2(product)
