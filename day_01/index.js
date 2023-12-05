const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8').split('\n');
// const input = fs.readFileSync(path.resolve(__dirname, 'part_2_test_input.txt'), 'utf8').split('\n');

const NUMBER_WORDS = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
]

const NUMBER_WORD_MAP = {
    "one": "o1e",
    "two": "t2o",
    "three": "t3e",
    "four": "f4r",
    "five": "f5e",
    "six": "s6x",
    "seven": "s7n",
    "eight": "e8t",
    "nine": "n9e",
}

function part1() {
    const sum = input.reduce((acc, line) => {
        const digits = line.toLowerCase().replace(/[a-z]/g, '')
        const number = Number(`${digits[0]}${digits[digits.length - 1]}`)
        return number + acc
    }, 0)

    console.log('sum:', sum)
}

function part2() {
    const sum = input.reduce((acc, line) => {
        const number = getFirstLastDigitNumber(line)
        return number + acc
    }, 0)

    console.log(sum)
}

function getFirstLastDigitNumber(str) {
    // let lineWithReplacedDigits = replaceNumberWords(str.toLocaleLowerCase())
    let lineWithReplacedDigits = str
    Object.entries(NUMBER_WORD_MAP).forEach(([word, number]) => {
        lineWithReplacedDigits = lineWithReplacedDigits.replaceAll(word, number)
    })
    console.log(str)
    console.log(lineWithReplacedDigits)
    const digits = lineWithReplacedDigits.replace(/[a-z]/g, '')
    const number = Number(`${digits[0]}${digits[digits.length - 1]}`)
    return number
}

function replaceNumberWords(str) {
    let newStr = ''

    for (let i = 0; i < (str.length); i++) {
        let found = null
        NUMBER_WORDS.forEach((word, number) => {
            const searchStr = str.substring(i, i + word.length)
            if (searchStr === word) {
                found = {
                    from: i,
                    to: i + word.length,
                    value: number
                }
            }
        })
        if (found) {
            newStr += found.value
            i += (found.to - found.from) - 1
        } else {
            newStr += str[i]
        }
    }

    return newStr
}

// part1()
part2()

// console.log(getFirstLastDigitNumber('sqmhjgzqvc3'))
