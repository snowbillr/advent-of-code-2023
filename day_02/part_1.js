const readLines = require('../utils/readLines')
const { parseGame, findMaxColor } = require('./utils')

// const lines = readLines(__dirname, 'part_1_test_input.txt')
const lines = readLines(__dirname, 'input.txt')

const games = lines.map(parseGame)

console.log(games.filter(g => isGamePossible(g, 12, 13, 14)).reduce((acc, game) => acc + game.gameNumber, 0))

function isGamePossible(game, redConstraint = Infinity, greenConstraint = Infinity, blueConstraint = Infinity) {
    const gameMaxRed = findMaxColor(game.rounds, 'red')
    const gameMaxGreen = findMaxColor(game.rounds, 'green')
    const gameMaxBlue = findMaxColor(game.rounds, 'blue')

    return gameMaxRed <= redConstraint && gameMaxGreen <= greenConstraint && gameMaxBlue <= blueConstraint
}