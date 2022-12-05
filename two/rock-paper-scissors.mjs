import { promises as fs } from "fs"

const data = await fs.readFile(`strategy.txt`, "utf8")

const moveToScore = move => (move === "R" ? 1 : move === "P" ? 2 : 3)

/** Truth table for win/loss
 * | opp | self | opp-self | w/l |
 * | --- | ---- | -------- | --- |
 * | R   | P    | -1       | w   |
 * | R   | S    | -2       | l   |
 * | P   | R    | 1        | l   |
 * | P   | S    | -1       | w   |
 * | S   | R    | 2        | w   |
 * | S   | P    | 1        | l   |
 */

const rounds = data
  .split("\n")
  .map(line =>
    line.split(" ").map(char => {
      switch (char) {
        case "A":
        case "X":
          return "R"
        case "B":
        case "Y":
          return "P"
        case "C":
        case "Z":
          return "S"
      }
    }),
  )
  .filter(line => line.length === 2 && line.every(move => ["R", "P", "S"].includes(move)))
  .map(([opponent, self]) => {
    if (opponent === self) {
      return 3 + moveToScore(self)
    } else {
      const sum = moveToScore(opponent) - moveToScore(self)
      if (sum == 1 || sum == -2) {
        return moveToScore(self)
      } else {
        return 6 + moveToScore(self)
      }
    }
  })

const sum = rounds.reduce((total, curr) => total + curr)
console.log(`Score: ${sum}`)
