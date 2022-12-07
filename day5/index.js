import '../lib.js'
import * as _ from 'lodash-es'

const [stackDesc, moves] = readParagraphs()

stackDesc.reverse()
const stacks = _.zip(...stackDesc.mapSplit(''))
  .filter((row) => row[0] !== ' ')
  .map((row) => row.filter((crate) => crate >= 'A'))

const stacksClone = _.cloneDeep(stacks)
moves.map(matchNumbers).forEach(([count, from, to]) => {
  for (let i = 0; i < count; i++)
    stacksClone[to - 1].push(stacksClone[from - 1].pop())
})

logStar1(stacksClone.map(_.last).join(''))

moves.map(matchNumbers).forEach(([count, from, to]) => {
  const items = stacks[from - 1].slice(-count)
  stacks[from - 1].length -= count
  stacks[to - 1].push(...items)
})

logStar2(stacks.map(_.last).join(''))
