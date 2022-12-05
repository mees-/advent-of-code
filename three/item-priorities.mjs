import { promises as fs } from "fs"

const data = await fs.readFile(`rucksacks.txt`, "utf8")

const sum = data
  .split("\n")
  .filter(line => line.length)
  .map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)])
  .map(([left, right]) => [...left].map(item => (right.includes(item) ? item : null)).filter(item => item != null)[0])
  .map(item => (item === item.toUpperCase() ? item.codePointAt(0) - 64 + 26 : item.codePointAt(0) - 96))
  .reduce((acc, item) => acc + item)

console.log(sum)
