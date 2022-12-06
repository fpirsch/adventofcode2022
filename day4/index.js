import '../lib.js'
import * as _ from 'lodash-es'

const pairs = readLines().map(matchPositiveNumbers)

const fullyContain = ([l1, r1, l2, r2]) =>
  (l1 <= l2 && r2 <= r1) || (l2 <= l1 && r1 <= r2)

logStar1(pairs.filter(fullyContain).length)

// ranges overlap if all left limits are less than all right limits
const overlap = ([l1, r1, l2, r2]) => l2 <= r1 && l1 <= r2

logStar2(pairs.filter(overlap).length)
