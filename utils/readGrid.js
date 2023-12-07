const readLines = require('./readLines')
const Grid = require('./grid')

module.exports = function readGrid(dir, filePath) {
    return new Grid(readLines(dir, filePath).map(line => line.split('')))
}