import '../lib.js'
import * as _ from 'lodash-es'

const lines = readLines()

// store hard values
const initialValues = {}
for (let i = lines.length; i--; ) {
  const line = lines[i]
  if (line.length < 15) {
    initialValues[line.slice(0, 4)] = +line.slice(6)
    lines.splice(i, 1)
  }
}

const initialJobs = lines.map((line) => line.match(/\w+|[+*/-]/g))

// execute all possible operations in the list, store their results
// then loop again until nothing's left
const jobs = initialJobs.slice()
const values = _.clone(initialValues)
while (jobs.length > 0) {
  for (let i = jobs.length; i--; ) {
    const [monkey, dep1, op, dep2] = jobs[i]
    if (dep1 in values && dep2 in values) {
      values[monkey] = eval(`${values[dep1]}${op}${values[dep2]}`)
      jobs.splice(i, 1)
    }
  }
}

logStar1(values.root)

// Do it again, but, as we don't have humn, do as much as we can.
const jobs2 = initialJobs.slice()
const values2 = _.clone(initialValues)
delete values2.humn
let hasHope = true
while (hasHope) {
  hasHope = false
  for (let i = jobs2.length; i--; ) {
    const [monkey, dep1, op, dep2] = jobs2[i]
    if (dep1 in values2 && dep2 in values2) {
      values2[monkey] = eval(`${values2[dep1]}${op}${values2[dep2]}`)
      jobs2.splice(i, 1)
      hasHope = true
    }
  }
}

const indexed = jobs2.reduce((index, [monkey, dep1, op, dep2]) => {
  index[monkey] = [dep1, op, dep2]
  return index
}, {})

// Each monkey has exactly one unknown, so just
// redo operations from root up in reverse
let [monkey, , rootValue] = indexed.root // root: unknown is on the left
let humn = values2[rootValue]
while (monkey !== 'humn') {
  const [dep1, op, dep2] = indexed[monkey]
  const leftUnknown = dep2 in values2
  const val = values2[leftUnknown ? dep2 : dep1]
  if (op === '/') humn = leftUnknown ? val * humn : val / humn
  else if (op === '-') humn = leftUnknown ? val + humn : val - humn
  else if (op === '*') humn /= val
  else if (op === '+') humn -= val
  monkey = leftUnknown ? dep1 : dep2
}

logStar2(humn)
