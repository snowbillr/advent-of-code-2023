module.exports = class ConversionRange {
    constructor(start, length, offset) {
        this.start = start;
        this.length = length;
        this.offset = offset;
        this.end = this.start + this.length
    }

    contains(number) {
        return number >= this.start && number < this.start + this.length;
    }

    convert(number) {
        return number + this.offset;
    }

    // haven't tested
    overlaps(conversionRange) {
        return this.start > conversionRange.start
            ? conversionRange.start + conversionRange.length > this.start
            : this.start + this.length > conversionRange.start
    }

    toString() {
        return `${this.start} -> ${this.start + this.length}, offset: ${this.offset}`;
    }
}