import {promises as fs} from 'fs';

const data = await fs.readFile('elve-data.txt', 'utf8');
console.log(data)

const elves = []
let index = 0;
for (const line of data.split("\n")) {
    if (line === "") {
        index++
    } else {
        elves[index] = (elves[index] ?? 0) + parseInt(line)
    }
}


elves.sort((a, b) => a-b)

const MAX_ELVE = elves[elves.length - 1]

console.log(`Max elve: ${MAX_ELVE}`)


const topThreeTotal = elves[elves.length - 1] + elves[elves.length - 2] + elves[elves.length - 3]

console.log(`Top three total: ${topThreeTotal}`)