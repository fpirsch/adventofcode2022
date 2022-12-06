import '../lib.js'

const allSums = readParagraphs().map(sum).sort(desc)
logStar1(allSums[0])
logStar2(sum(allSums.slice(0, 3)))
