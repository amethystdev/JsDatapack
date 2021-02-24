const Base = require('./Base');

class RandInt {

    /**
     * @private
     */
    base;
    min;
    max;

    /**
     * 
     * @param {Base} base 
     * @param {Number} min 
     * @param {Number} max 
     */
    constructor(base, min = 0, max = 1) {
        this.base = base;
        this.min = min;
        this.max = max;
        this.generate();
    }

    /**
     * @private
     */
    generate() {
        
    }
}

module.exports = RandInt;