import '../lib.js'
import * as _ from 'lodash-es'

readLines() // just to start the timer

const monkeys = [
  { operation: (w) => w * 7, next: (w) => (w % 2 ? 1 : 7) },
  { operation: (w) => w + 3, next: (w) => (w % 7 ? 4 : 2) },
  { operation: (w) => w + 4, next: (w) => (w % 13 ? 4 : 5) },
  { operation: (w) => w + 5, next: (w) => (w % 19 ? 0 : 6) },
  { operation: (w) => w * 5, next: (w) => (w % 11 ? 3 : 5) },
  { operation: (w) => w * w, next: (w) => (w % 5 ? 3 : 6) },
  { operation: (w) => w + 8, next: (w) => (w % 3 ? 7 : 0) },
  { operation: (w) => w + 1, next: (w) => (w % 17 ? 1 : 2) },
]

const initialItems = [
  [62, 92, 50, 63, 62, 93, 73, 50],
  [51, 97, 74, 84, 99],
  [98, 86, 62, 76, 51, 81, 95],
  [53, 95, 50, 85, 83, 72],
  [59, 60, 63, 71],
  [92, 65],
  [78],
  [84, 93, 54],
]

let items = _.cloneDeep(initialItems)
const activity = monkeys.map(() => 0)

for (let round = 0; round < 20; round++) {
  monkeys.forEach((monkey, i) => {
    while (items[i].length > 0) {
      activity[i]++
      const item = Math.floor(monkey.operation(items[i].shift()) / 3)
      items[monkey.next(item)].push(item)
    }
  })
}

activity.sort(desc)
logStar1(activity[0] * activity[1])

items = _.cloneDeep(initialItems)
activity.fill(0)

for (let round = 0; round < 10000; round++) {
  monkeys.forEach((monkey, i) => {
    while (items[i].length > 0) {
      activity[i]++
      const item = monkey.operation(items[i].shift()) % 9699690 // 2*3*5*7*11*13*17*19
      items[monkey.next(item)].push(item)
    }
  })
}

activity.sort(desc)
logStar2(activity[0] * activity[1])
