import '../lib.js'
import * as _ from 'lodash-es'

const lines = readLines()

let cycle = 0
let x = 1
let signal = 0
const crt = Array(240)

function draw() {
  const crtx = cycle % 40
  crt[cycle] = x - 1 <= crtx && crtx <= x + 1 ? '#' : ' '
}

function addCycle() {
  draw()
  const step = Math.floor((cycle + 20) / 40)
  cycle++
  const newStep = Math.floor((cycle + 20) / 40)
  if (newStep > step) signal += (newStep * 40 - 20) * x
}

lines.forEach((command, i) => {
  if (command === 'noop') addCycle()
  else {
    addCycle()
    addCycle()
    x += +command.slice(5)
  }
})

logStar1(signal)

logStar2(
  '\n' +
    _.chunk(crt, 40)
      .map((pixels) => pixels.join(''))
      .join('\n')
)
