import '../lib.js'
import * as _ from 'lodash-es'

const [stackDesc, moves] = readParagraphs()

stackDesc.reverse()
const stackCount = Math.ceil(stackDesc.shift().length / 4)
const stacks = Array.from({ length: stackCount }, () => [])
stackDesc.forEach((line) =>
  stacks.forEach((stack, i) => {
    const item = line[1 + 4 * i]
    if (item !== ' ') stack.push(item)
  })
)

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
