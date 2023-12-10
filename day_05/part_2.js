const readLines = require('../utils/readLines');
const Range = require('../utils/range');
const ConversionRange = require('./conversionRange')

// const input = readLines(__dirname, 'data/part_1_test_input.txt')
const input = readLines(__dirname, 'data/input.txt')

const { seedRanges, conversionRanges } = parseInput(input);
const normalizedConversionRanges = normalizeConversionRanges(conversionRanges)

console.log(normalizedConversionRanges.map(cr => cr.toString() + '\n'))

let minConvertedSeed = Infinity
seedRanges.forEach((seedRange, i) => {
    console.log('starting range', i)
    seedRange.forEach(seed => {
        const targetRange = normalizedConversionRanges.find(cr => cr.contains(seed))

        const convertedSeed = targetRange ? targetRange.convert(seed) : seed;

        minConvertedSeed = Math.min(minConvertedSeed, convertedSeed)
    })
})
console.log(minConvertedSeed)

function parseInput() {
    const seedNumbers = input
        .splice(0, 1)[0]
        .split(':')[1]
        .trim()
        .split(' ')
        .map(n => Number(n))

    let seedRanges = []
    for (let i = 0; i < seedNumbers.length - 1; i += 2) {
        seedRanges.push(
            new Range(seedNumbers[i], seedNumbers[i + 1])
        )
    }

    const rawConversionRanges = [];
    let lastMapIndex = -1;
    input.forEach(line => {
        if (/[a-z]/.test(line)) { // its a map name
            lastMapIndex += 1;
            rawConversionRanges[lastMapIndex] = {
                lines: []
            };
        } else {
            rawConversionRanges[lastMapIndex].lines.push(line.split(' ').map(n => Number(n)))
        }
    })

    const conversionRanges = rawConversionRanges.map(rawConversionRange => {
        return rawConversionRange.lines.map(line => {
            return new ConversionRange(line[1], line[2], line[0] - line[1])
        })
    }).flat()

    return {
        seedRanges,
        conversionRanges
    }
}

function normalizeConversionRanges(conversionRanges) {
    let normalizedRanges = []

    conversionRanges.forEach(conversionRange => {
        const overlappingRangeIndex = normalizedRanges.findIndex(nr => nr.overlaps(conversionRange))
        const overlappingRange = normalizedRanges[overlappingRangeIndex]
        if (overlappingRange) {
            const newRanges = splitRanges(conversionRange, overlappingRange)
            normalizedRanges.splice(overlappingRangeIndex, 1, ...newRanges)

            normalizedRanges = normalizeConversionRanges(normalizedRanges)
        } else {
            normalizedRanges.push(conversionRange)
        }
    })

    return normalizedRanges
}

function splitRanges(range1, range2) {
    let lowRange = null;
    let highRange = null;

    if (range1.start < range2.start) {
        lowRange = range1
        highRange = range2
    } else if (range2.start < range1.start) {
        lowRange = range2
        highRange = range1
    } else if (range1.start === range2.start) {
        if (range1.end < range2.end) {
            lowRange = range1
            highRange = range2
        } else {
            lowRange = range2
            highRange = range1
        }
    } else {
        throw 'bad low/high range logic'
    }

    const bottom = lowRange.start
    const top = Math.max(lowRange.end, highRange.end)
    const overlapPoint = highRange.start

    // if (lowRange.start === highRange.start) {
    //     const first = new ConversionRange(lowRange.start, overlapPoint - lowRange.start, lowRange.offset)
    //     const last = new ConversionRange(overlapPoint, highRange.end - overlapPoint, lowRange.offset + highRange.offset)

    //     const newRanges = [first, last].filter(r => r.length != 0)
    //     console.log(`${range1} ||| ${range2} === [${newRanges.map(nr => nr.toString())}]`)
    //     return newRanges
    // } else {
        const first = new ConversionRange(bottom, overlapPoint - bottom, lowRange.offset)
        const middle = new ConversionRange(overlapPoint, Math.max(lowRange.end, highRange.start) - overlapPoint, lowRange.offset + highRange.offset)
        const last = new ConversionRange(middle.end, top - middle.end, highRange.offset)

        const newRanges = [first, middle, last].filter(r => r.length != 0)
        // console.log(`${range1} ||| ${range2} === [${newRanges.map(nr => nr.toString())}]`)
        return newRanges
    // }
}
