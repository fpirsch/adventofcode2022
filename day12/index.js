import * as _ from 'lodash-es'
import { Board } from './1dboard.js'

// surrounding wall : "{" is above z in ascii
const map = Board.fromInput(readInput()).border('{')

const start = map.data.indexOf('S')
const end = map.data.indexOf('E')
map.data[start] = 'a'
map.data[end] = 'z'

// a => b, b => c, ... y => z, z => z
const maxHeight = new Map(
  Array.from({ length: 26 }, (_, c) => [...String.fromCharCode(c + 97, c + 98)])
)
maxHeight.set('z', 'z')

const condition = (value, pos, parentValue) =>
  value <= maxHeight.get(parentValue)

logStar1(map.minDistance(start, condition)[end])

const distToA = []
for (let i = 0; i < map.data.length; i++) {
  if (map.data[i] === 'a') distToA.push(map.minDistance(i, condition)[end])
}
logStar2(Math.min(...distToA))
