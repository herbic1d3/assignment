"use strict";

class Bunary2Decimal {

    constructor(value) {
        this.binary = value;
    }
    
    decimal() {
        var index = this.binary.length,
            pow, curChar, result;

        pow = curChar = result = 0;

        while (index > 0) {
            curChar = parseInt(this.binary.charAt(index - 1), 10);
    
            if (curChar != 0) {
                result  += Math.pow(2,pow);
            }

            index--;
            pow++;
        }
        
        return result.toString();
    }

}
