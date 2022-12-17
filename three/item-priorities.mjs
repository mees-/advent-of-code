import { promises as fs } from "fs"

const data = await fs.readFile(`rucksacks.txt`, "utf8")

const misplacedSum = data
  .split("\n")
  .filter(line => line.length)
  .map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)])
  .map(([left, right]) => [...left].find(item => right.includes(item)))
  .map(item => (item === item.toUpperCase() ? item.codePointAt(0) - 64 + 26 : item.codePointAt(0) - 96))
  .reduce((acc, item) => acc + item)

console.log(`The sum of priorities of misplaced items is ${misplacedSum}`)

const groupSum = data
  .split("\n")
  .filter(line => line.length)
  .reduce(
    (acc, curr) =>
      acc[acc.length - 1].length < 3
        ? [...acc.slice(0, acc.length - 1), [...acc[acc.length - 1], curr]]
        : [...acc, [curr]],
    [[]],
  )
  .map(([one, two, three]) => [...one].find(item => two.includes(item) && three.includes(item)))
  .map(item => (item === item.toUpperCase() ? item.codePointAt(0) - 64 + 26 : item.codePointAt(0) - 96))
  .reduce((acc, item) => acc + item)

console.log(`The sum of priorities of items in every group is ${groupSum}`)
