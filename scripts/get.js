// Download the problem of the day (or any given day) and create a "day{n}" folder
// You must write the adventofcode.com session cookie in the "aoc-session-cookie.txt" file at the root.
import assert from 'node:assert'
import fs from 'fs'

// Les problèmes paraissent à minuit EST/UTC-5.
const today = new Date().toLocaleDateString({ timeZone: 'EST' })
const [todaysDayNum, , year] = today.split('/')

const day = +(process.argv[2] ?? todaysDayNum)
if (!Number.isInteger(day) || day < 1 || day > todaysDayNum)
  process.exit(console.log('arg is not a day of december'))

let session
try {
  session = String(fs.readFileSync('./aoc-session-cookie.txt'))
} catch {
  console.log(
    "Couldn't find the file aoc-session-cookie.txt with the 128-char adventofcode session cookie."
  )
  process.exit()
}

assert(/^[0-9a-f]{128}$/.test(session))
const fetchOptions = { headers: { Cookie: `session=${session}` } }

const url = `https://adventofcode.com/${year}/day/${day}`

const dir = `day${day}`
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)

  const res = await fetch(`${url}/input`, fetchOptions)
  assert(res.status === 200)
  assert(res.headers.get('content-type') === 'text/plain')
  const input = await res.text()
  fs.writeFileSync(`${dir}/input.txt`, input)

  fs.copyFileSync(
    new URL('day.template.js', import.meta.url),
    `${dir}/index.js`
  )
}

const htmlEntities = (str) =>
  str.replaceAll('&lt;', '<').replaceAll('&gt;', '>')

// 1st run: writes part 1 code samples, 2nd run: write all code samples
const res = await fetch(url, fetchOptions)
assert(res.status === 200)
assert(res.headers.get('content-type') === 'text/html')
const html = await res.text()
const dataBlocks = html
  .match(/<pre><code>[^<]+<\/code><\/pre>/g)
  .map((code) => htmlEntities(code.slice(11, -13)))
dataBlocks.forEach((data, i) =>
  fs.writeFileSync(`${dir}/data${i + 1}.txt`, data)
)
