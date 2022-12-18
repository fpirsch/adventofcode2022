import '../lib.js'
import * as _ from 'lodash-es'

const lines = readLines()
const cubes = lines.map(matchPositiveNumbers)

const faces = new Set()

function addFace(x, y, z) {
  const key = x * 10000 + y * 100 + z
  if (faces.has(key)) faces.delete(key) // 2 cubes with the same face
  else faces.add(key)
}

function addCubeFaces(x, y, z) {
  addFace(x - 0.5, y, z)
  addFace(x + 0.5, y, z)
  addFace(x, y - 0.5, z)
  addFace(x, y + 0.5, z)
  addFace(x, y, z - 0.5)
  addFace(x, y, z + 0.5)
}

cubes.forEach(([x, y, z]) => addCubeFaces(x, y, z))

logStar1(faces.size)

// Part 2. Put the lava droplet into a larger cube (24*24*24) and
// 3D flood fill this container
faces.clear()

const cubeKey = (x, y, z) => (x << 16) | (y << 8) | z
const cubeSet = new Set(cubes.map(([x, y, z]) => cubeKey(x + 1, y + 1, z + 1)))

const W = 24

function floodFill() {
  // start from the (0,0,0) corner, whith is water
  const queue = [0]
  const visited = new Set(queue)
  function add(pos) {
    if (!visited.has(pos)) {
      visited.add(pos)
      queue.push(pos)
    }
  }
  while (queue.length) {
    const key = queue.shift()
    if (cubeSet.has(key)) continue
    const x = key >> 16
    const y = (key >> 8) & 0xff
    const z = key & 0xff
    addCubeFaces(x, y, z)
    if (x > 0) add(key - 0x10000)
    if (x < W - 1) add(key + 0x10000)
    if (y > 0) add(key - 0x100)
    if (y < W - 1) add(key + 0x100)
    if (z > 0) add(key - 1)
    if (z < W - 1) add(key + 1)
  }
}

floodFill()

const containerOusideFaces = 6 * W ** 2
logStar2(faces.size - containerOusideFaces)
