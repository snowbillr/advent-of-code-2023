const readLines = require('../utils/readLines')
const Card = require('./utils/card')

// const input = readLines(__dirname, 'data/part_1_test_input.txt')
const input = readLines(__dirname, 'data/input.txt')

const cards = input.map(Card.parse)
// indexed by card number - 1
const cardCounts = Array.from({ length: cards.length }, () => 1)

cards.forEach((card, i) => {
    const matchingCount = card.countMatches()
    for (let j = 1; j <= matchingCount; j++) {
        const nextIndex = i + j;
        if (nextIndex < cardCounts.length) {
            cardCounts[nextIndex] += cardCounts[i]
        }
    }
})

const sum = cardCounts.reduce((a, b) => a + b, 0)
console.log(sum)