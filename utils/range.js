module.exports = class Range {
    constructor(start, length) {
        this.start = start;
        this.length = length;
    }

    contains(number) {
        return number >= this.start && number < this.start + this.length;
    }

    at(index) {
        return this.start + index;
    }

    // all() {
    //     return Array.from({ length: this.length }, (_, i) => this.start + i);
    // }
    forEach(callback) {
        for (let i = this.start; i < this.start + this.length; i++) {
            callback(i)
        }
    }
}