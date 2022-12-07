import '../lib.js'

const lines = readLines()

const dirSize = {}
let path = []

lines.forEach((line) => {
  if (line.startsWith('$ cd ..')) path.pop()
  else if (line.startsWith('$ cd ')) {
    path.push(line.slice(5))
    dirSize[path.join(' ')] ??= 0
  } else if (line[0] <= 9) {
    const fileSize = parseInt(line)
    path.forEach(
      (_, i) => (dirSize[path.slice(0, i + 1).join(' ')] += fileSize)
    )
  }
})

const allSizes = Object.values(dirSize)

logStar1(sum(allSizes.filter((size) => size <= 100000)))

const unused = 70000000 - dirSize['/']
logStar2(Math.min(...allSizes.filter((size) => unused + size >= 30000000)))
