const readLines = require('../utils/readLines')
const Card = require('./utils/card')

// const input = readLines(__dirname, 'data/part_1_test_input.txt')
const input = readLines(__dirname, 'data/input.txt')

const cards = input.map(line => Card.parse(line))
const scores = cards.map(card => calculateCardScore(card))
const totalScore = scores.reduce((sum, score) => sum + score, 0)

console.log(totalScore)

function calculateCardScore(card) {
    const matchingNumbersCount = card.winningNumbers.filter(wn => card.yourNumbers.includes(wn)).length
    return matchingNumbersCount > 0 ? 2 ** (matchingNumbersCount - 1): 0;
}