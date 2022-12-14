import '../lib.js'

const pairs = readParagraphs()

function testOrder(left, right) {
  const leftNum = typeof left === 'number'
  const rightNum = typeof right === 'number'
  if (leftNum && rightNum) return right - left
  if (leftNum) left = [left]
  if (rightNum) right = [right]
  for (let i = 0; i < left.length && i < right.length; i++) {
    const comp = testOrder(left[i], right[i])
    if (comp !== 0) return comp
  }
  return right.length - left.length
}

const inOrder = pairs.reduce((correct, [left, right], i) => {
  if (testOrder(eval(left), eval(right)) > 0) correct.push(i + 1)
  return correct
}, [])

logStar1(sum(inOrder))

const list = pairs
  .filter((p) => p)
  .flat()
  .map(eval)

const sep2 = [[2]]
const sep6 = [[6]]
list.push(sep2, sep6)
list.sort(testOrder).reverse()

logStar2((list.indexOf(sep2) + 1) * (list.indexOf(sep6) + 1))
