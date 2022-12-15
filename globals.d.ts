import './lib.js'

declare global {
  function log(): void
  function logStar1(): void
  function logStar2(): void

  interface Array {
    mapSplit(sep: string = ' '): string[][]
  }

  function matchPositiveNumbers(str: string): number[]
  function matchNumbers(str: string): number[]

  function readInput(file: string = 'intput.txt'): string
  function readLines(file: string = 'intput.txt'): string[]
  function readParagraphs(file: string = 'intput.txt'): string[][]
  function readNumbers(file: string = 'intput.txt'): number[]

  function sum(list: (string | number)[]): number
  function asc(a: any, b: any): 1 | 0 | -1
  function desc(a: any, b: any): 1 | 0 | -1
  function manhattan(x1: number, y1: number, x2: number, y2: number): number
}
