const readLines = require('../utils/readLines')
const { parseGame, findMaxColor } = require('./utils')

// const lines = readLines(__dirname, 'part_2_test_input.txt')
const lines = readLines(__dirname, 'input.txt')
const result = sum(lines.map(parseGame)
    .map(findMinimumPossibleColorCounts)
    .map(calculateGamePower))

console.log(result)

function findMinimumPossibleColorCounts(game) {
    const gameMaxRed = findMaxColor(game.rounds, 'red')
    const gameMaxGreen = findMaxColor(game.rounds, 'green')
    const gameMaxBlue = findMaxColor(game.rounds, 'blue')

    return {
        red: gameMaxRed,
        green: gameMaxGreen,
        blue: gameMaxBlue
    }
}

function calculateGamePower(colorCounts) {
    return colorCounts.red * colorCounts.green * colorCounts.blue
}

function sum(items) {
    return items.reduce((acc, item) => acc + item, 0)
}