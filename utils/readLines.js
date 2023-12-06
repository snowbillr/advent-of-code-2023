const fs = require('fs');
const path = require('path');

module.exports = function readLines(dir, filePath) {
    return fs.readFileSync(path.resolve(__dirname, dir, filePath), 'utf8').split('\n').filter(l => l.length > 0);
}