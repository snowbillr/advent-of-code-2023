class Grid {
    constructor(cells) {
        this.cells = cells;
    }

    get width() {
        return this.cells[0].length;
    }

    get height() {
        return this.cells.length;
    }

    at(x, y) {
        return new Cursor(this, x, y);
    }

    row(y) {
        return this.cells[y]
    }

    forEach(callback) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cursor = new Cursor(this, x, y);
                callback(cursor)
            }
        }
    }
}

class Cursor {
    constructor(grid, x, y) {
        this.grid = grid;
        this.x = x;
        this.y = y;

        this.originalX = x;
        this.originalY = y;
    }

    reset() {
        this.x = this.originalX;
        this.y = this.originalY;
    }

    get isInvalid() {
        return !(this.x < this.grid.width && this.x >= 0 && this.y < this.grid.height && this.y >= 0)
    }

    get value() {
        if (this.isInvalid) {
            return Grid.INVALID;
        } else {
            return this.grid.cells[this.y][this.x];
        }
    }

    get neighbors() {
        const neighborCursors = {
            nw: new Cursor(this.grid, this.x - 1, this.y - 1),
            n: new Cursor(this.grid, this.x, this.y - 1),
            ne: new Cursor(this.grid, this.x + 1, this.y - 1),
            w: new Cursor(this.grid, this.x - 1, this.y),
            e: new Cursor(this.grid, this.x + 1, this.y),
            sw: new Cursor(this.grid, this.x - 1, this.y + 1),
            s: new Cursor(this.grid, this.x, this.y + 1),
            se: new Cursor(this.grid, this.x + 1, this. y + 1)
        };

        return Object.fromEntries(
            Object.entries(neighborCursors)
                .filter(([dir, cursor]) => !cursor.isInvalid)
        )
    }

    w() {
        this.x -= 1;
        return !this.isInvalid;
    }

    e() {
        this.x += 1;
        return !this.isInvalid;
    }
}

class RowSpan {
    constructor(grid, y, start, end) {
        this.grid = grid;
        this.y = y;
        this.start = start;
        this.end = end;
    }

    moveStart(dx) {
        this.start += dx;
    }

    moveEnd(dx) {
        this.end += dx;
    }

    get size() {
        return this.end - this.start;
    }

    forEach(callback) {
        for (let i = this.start; i <= this.end; i++) {
            callback(this.grid.at(i, this.y))
        }
    }

    equals(rowSpan) {
        return this.y === rowSpan.y && this.start === rowSpan.start && this.end === rowSpan.end;
    }
}

Grid.Cursor = Cursor;
Grid.RowSpan = RowSpan;
Grid.INVALID = Symbol.for('Grid::INVALID');
module.exports = Grid;