class Card {
    static parse(input) {
        const [_, cardNumber, ...rest] = input.match(/^Card\s+(\d+):/)
        const [winningNumbers, yourNumbers] = input.split(':')[1].split('|').map(s => s.trim()).map(s => s.split(/\s+/).map(n => Number(n)))

        return new Card(cardNumber, winningNumbers, yourNumbers)
    }

    constructor(number, winningNumbers, yourNumbers) {
        this.number = number;
        this.winningNumbers = winningNumbers;
        this.yourNumbers = yourNumbers;
    }
}

module.exports = Card;