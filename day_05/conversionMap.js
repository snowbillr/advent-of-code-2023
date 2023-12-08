module.exports = class ConversionMap {
    constructor(rawConversionRanges) {
        this.conversionRanges = rawConversionRanges.map(cr => {
            return new ConversionRange(...cr)  
        })
    }

    convert(number) {
        const targetConversionRange = this.conversionRanges.find(cr => cr.contains(number))
        if (targetConversionRange) {
            return targetConversionRange.convert(number);
        } else {
            return number;
        }
    }
}

class ConversionRange {
    constructor(destinationStart, sourceStart, length) {
        this.destinationRange = new Range(destinationStart, length);
        this.sourceRange = new Range(sourceStart, length);
    }

    contains(number) {
        return this.sourceRange.contains(number);
    }

    convert(number) {
        return this.destinationRange.at(number - this.sourceRange.start)
    }
}

class Range {
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
}