import '../lib.js'

const lines = readLines()

const valves = lines.reduce((v, line) => {
  const [name, ...children] = line.match(/[A-Z][A-Z]/g)
  const flow = +line.match(/\d+/)[0]
  v[name] = { name, flow, children }
  return v
}, {})

function multiShortestPath(from, destinations) {
  const queue = [from]
  const minDist = new Map(Object.keys(valves).map((name) => [name, Infinity]))
  minDist.set(from, 0)
  while (queue.length > 0) {
    const node = queue.shift()
    const dist = minDist.get(node) + 1
    for (let name of valves[node].children) {
      if (dist < minDist.get(name)) {
        minDist.set(name, dist)
        queue.push(name)
      }
    }
  }
  const map = {}
  for (let to of destinations) map[to] = minDist.get(to)
  return map
}

const closedValves = Object.values(valves)
  .filter((valve) => valve.flow > 0)
  .map((valve) => valve.name)

const shortPath = {}
for (let from of ['AA', ...closedValves])
  shortPath[from] = multiShortestPath(from, closedValves)

let best = 0

function dfs(node, closed, time, pressure, elephant) {
  if (pressure > best) best = pressure
  const n = closed.length
  for (let i = 0; i < n; i++) {
    const target = closed[i]
    const distance = shortPath[node][target]
    const targetTime = time - distance - 1
    if (targetTime <= 0) continue
    const closedClone = closed.slice()
    closedClone[i] = closedClone[n - 1]
    closedClone.length--
    const targetPressure = pressure + valves[target].flow * targetTime
    dfs(target, closedClone, targetTime, targetPressure, elephant)
  }
  // after each player move, count the pressure released by the elephant
  // if he visited all the other valves
  // Big optimization : switch player only when the 1st one has opened at least 1/3 the valves
  // (both players are supposed to open about half of the valves each)
  // This takes computing time down from 30-35s to 1.5s
  if (!elephant && n < 0.65 * closedValves.length)
    dfs('AA', closed, 26, pressure, true)
}

dfs('AA', closedValves, 30, 0, true)
logStar1(best)

dfs('AA', closedValves, 26, 0, false)
logStar2(best)
