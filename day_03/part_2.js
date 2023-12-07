const Grid = require('../utils/grid')
const readGrid = require('../utils/readGrid')

const GEAR_REGEX = /\*/;
const NUMBER_REGEX = /\d/;

// const grid = readGrid(__dirname, 'data/part_2_test_data.txt')
const grid = readGrid(__dirname, 'data/input.txt')

const gears = gatherGearCursors()
const gearAdjacentNumbers = gatherGearAdjacentNumbers(gears)

const result = gearAdjacentNumbers
    .filter(numbers => numbers.length === 2)
    .reduce((acc, ratios) => {
        return acc + (ratios[0] * ratios[1])
    }, 0)
console.log(result)

function gatherGearCursors() {
    const gridCursors = [];
    grid.forEach(cursor => {
        if (GEAR_REGEX.test(cursor.value)) {
            gridCursors.push(cursor)
        }
    })

    return gridCursors;
}

function gatherGearAdjacentNumbers(gears) {
    return gears.map(gearCursor => {
        return Object.values(gearCursor.neighbors)
            .map((neighborCursor) => {
                if (!NUMBER_REGEX.test(neighborCursor.value)) return null;

                return numberCursorToRowSpan(neighborCursor)
            })
            .filter(Boolean)
            .reduce((dedupedRowSpans, rowSpan) => {
                if (!dedupedRowSpans.find(drs => drs.equals(rowSpan))) {
                    dedupedRowSpans.push(rowSpan)
                }

                return dedupedRowSpans
            }, [])
            .map(rowSpan => {
                let number = '';
                rowSpan.forEach(cursor => {
                    number += cursor.value;
                });
                return Number(number)
            })
    });
}

function numberCursorToRowSpan(cursor) {
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

    return rowSpan
}

