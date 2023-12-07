const Grid = require('../utils/grid')
const readGrid = require('../utils/readGrid')

// const grid = readGrid(__dirname, 'data/part_1_test_data.txt')
// const grid = readGrid(__dirname, 'data/part_1_edge_case_data.txt')
const grid = readGrid(__dirname, 'data/input.txt')

const SYMBOL_REGEX = /[^\d\w\.]/
const NUMBER_REGEX = /\d/

function gatherSymbolAdjacentNumberCursors() {
    const numberCursors = []
    grid.forEach(cursor => {
        if (!NUMBER_REGEX.test(cursor.value)) return;

        const isNextToSymbol = Object.values(cursor.neighbors)
            .filter(n => SYMBOL_REGEX.test(n.value))
            .length > 0

        if (isNextToSymbol) {
            numberCursors.push(cursor)
        }
    })

    return numberCursors
}


const numbers = gatherSymbolAdjacentNumberCursors()
    .map(cursor => {
        const rowSpan = new Grid.RowSpan(grid, cursor.y, cursor.x, cursor.x)

        while (cursor.w()) {
            if (cursor.value != Grid.EMPTY && NUMBER_REGEX.test(cursor.value)) {
                rowSpan.moveStart(-1)
            } else {
                break;
            }
        }
        cursor.reset()
        while (cursor.e()) {
            if (cursor.value != Grid.EMPTY && NUMBER_REGEX.test(cursor.value)) {
                rowSpan.moveEnd(1)
            } else {
                break;
            }
        }

        // if (rowSpan.size > 0) {
        //     return rowSpan;
        // } else {
            // return null;
        // }
        return rowSpan
    })
    .filter(Boolean)
    .reduce((dedupedRowSpans, rowSpan) => {
        if (!dedupedRowSpans.find(drs => drs.equals(rowSpan))) {
            dedupedRowSpans.push(rowSpan)
        }

        return dedupedRowSpans
    }, [])
    .map(rs => {
        let number = '';
        rs.forEach(cursor => {
            number += cursor.value;
        });
        return Number(number)
    })

console.log(numbers.reduce((sum, n) => sum + n, 0))