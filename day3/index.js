import '../lib.js'
import * as _ from 'lodash-es'

const prio = (char) => char.charCodeAt(0) + (char >= 'a' ? 1 - 97 : 27 - 65)

const rucksacks = readLines()
const badItems = rucksacks.map(
  (r) =>
    _.intersection([...r.slice(0, r.length / 2)], [...r.slice(r.length / 2)])[0]
)
logStar1(sum(badItems.map(prio)))

const total = sum(
  _.chunk(rucksacks, 3).map(([e1, e2, e3]) =>
    prio(_.intersection([...e1], [...e2], [...e3])[0])
  )
)
logStar2(total)
