const readLines = require('../utils/readLines');
const ConversionMap = require('./conversionMap');
const Range = require('../utils/range');

// const input = readLines(__dirname, 'data/part_1_test_input.txt')
const input = readLines(__dirname, 'data/input.txt')

const { seedRanges, maps } = parseInput(input);

let minConvertedSeed = Infinity
seedRanges.forEach((seedRange, i) => {
    console.log('starting range', i)
    seedRange.forEach(seed => {
        const convertedSeed = maps.reduce((convertedSeed, map) => {
            return map.convert(convertedSeed)
        }, seed)
        // const convertedSeed = seed
        minConvertedSeed = Math.min(minConvertedSeed, convertedSeed)
    })
})
console.log(minConvertedSeed)

the conversion takes a long time. how to optimize?
    memoize per conversion map?
    pre-compute? that sounds impossible


// console.log(seeds)

// const locations = seeds.map(seed => {
//     return maps.reduce((convertedSeed, map) => {
//         return map.convert(convertedSeed)
//     }, seed)
// })

// console.log(locations)


// console.log(locations.reduce((a, b) => Math.min(a, b), Infinity))

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

    const rawMaps = [];
    let lastMapIndex = -1;
    input.forEach(line => {
        if (/[a-z]/.test(line)) { // its a map name
            lastMapIndex += 1;
            rawMaps[lastMapIndex] = {
                name: line.match(/([a-z]+-?)+\s/)[0],
                lines: []
            };
        } else {
            rawMaps[lastMapIndex].lines.push(line.split(' ').map(n => Number(n)))
        }
    })

    const maps = rawMaps.map(rawMap => {
        return new ConversionMap(rawMap.lines) 
    })
    

    return {
        seedRanges,
        maps
    }
}