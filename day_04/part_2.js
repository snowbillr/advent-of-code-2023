const readLines = require('../utils/readLines')
const Card = require('./utils/card')

const input = readLines(__dirname, 'data/part_1_test_input.txt')
// const input = readLines(__dirname, 'data/input.txt')

const cards = input.map(Card.parse)

// indexed by card number - 1
const cardCounts = Array.from({ length: cards.length }, () => 1)
cards.forEach((card, i) => {
    const matchingCount = card.countMatches()
    const copies = cards.slice(i, i + matchingCount)
    // console.log()
})