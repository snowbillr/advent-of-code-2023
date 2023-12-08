const readLines = require('../utils/readLines');
const ConversionMap = require('./conversionMap');

// const input = readLines(__dirname, 'data/part_1_test_input.txt')
const input = readLines(__dirname, 'data/input.txt')

const { seeds, maps } = parseInput(input);

const locations = seeds.map(seed => {
    return maps.reduce((convertedSeed, map) => {
        return map.conversionMap.convert(convertedSeed)
    }, seed)
})

console.log(locations.reduce((a, b) => Math.min(a, b), Infinity))

function parseInput() {
    const seeds = input.splice(0, 1)[0].split(':')[1].trim().split(' ').map(n => Number(n))

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
        const [from, to] = rawMap.name.split('-to-')
        return {
            from,
            to,
            conversionMap: new ConversionMap(rawMap.lines) 
        }
    })
    

    return {
        seeds,
        maps
        // seedToSoilMap: {},
        // soilToFertilizerMap: {},
        // fertilizerToWaterMap: {},
        // waterToLightMap: {},
        // lightToTemperatureMap: {},
        // temperatureToHumidityMap: {},
        // humidityToLocationMap: {}
    }
}