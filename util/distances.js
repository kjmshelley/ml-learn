const _ = require("lodash");

module.exports = (function() {
    const euclideanDistance = (x, y) => {
        if (typeof x === 'undefined' || typeof y === 'undefined'
            || (!x) || (!y) || 
            Object.keys(x).length !== Object.keys(y).length) {
            throw 'Features have to be the same length in order to calculate distance properly.';
        }
        let sum = 0;
        for (let i in x) {
            if (typeof x[i] !== 'number') return;
            if (!y.hasOwnProperty(i)) return;
            if (typeof x[i] !== typeof y[i]) {
                throw 'Features are not of the same type ${x[i]} and ${y[i]}';
            }
            sum += Math.pow((x[i] - y[i]), 2);
        }
        return Math.sqrt(sum);
    }

    const sortDistances = (arr) => {
        const new_arr = arr.sort((a, b) => (a.distance > b.distance));
        return new_arr;
    }

    const manhattanDistance = (x, y) => {
        if (typeof x === 'undefined' || typeof y === 'undefined'
            || (!x) || (!y) || 
            Object.keys(x).length !== Object.keys(y).length) {
            throw 'Features have to be the same length in order to calculate distance properly.';
        }
        let sum = 0;
        for (let i in x) {
            if (typeof x[i] !== 'number') return;
            if (!y.hasOwnProperty(i)) return;
            if(typeof x[i] !== typeof y[i]) {
                throw 'Features are not of the same type ${x[i]} and ${y[i]}';
            }
            sum += Math.abs(x[i] - y[i]);
        }
        return sum;
    }

    const minkowskiDistance = (x, y) => {
        throw 'Not implemented';
    }

    const cosineDistance = (x, y) => {
        if (typeof x === 'undefined' || typeof y === 'undefined'
            || (!x) || (!y) || 
            Object.keys(x).length !== Object.keys(y).length) {
            throw 'Features have to be the same length in order to calculate distance properly.';
        }
        let sum = 0;
        let x_sqrt = 0;
        let y_sqrt = 0;
        for (let i in x) {
            if (typeof x[i] !== 'number') return;
            if (!y.hasOwnProperty(i)) return;
            if(typeof x[i] !== typeof y[i]) {
                throw 'Features are not of the same type ${x[i]} and ${y[i]}';
            }
            sum += x[i] * y[i];
            x_sqrt += x[i] * x[i];
            y_sqrt += y[i] * y[i];
        }
        x_sqrt = Math.sqrt(x_sqrt).toFixed(3);
        y_sqrt = Math.sqrt(y_sqrt).toFixed(3);
        const r = (x_sqrt * y_sqrt).toFixed(3);
        const total = (sum / r).toFixed(3);
        return total;
    }

    const jaccardDistance = (x, y) => {
        if (typeof x === 'undefined' || typeof y === 'undefined'
            || !Array.isArray(x) || !Array.isArray(y)) {
            throw 'Must provide arrays';
        }
        // The intersection of two or more sets is the set of elements which are common to all sets. 
        const intersection = x.filter((itm) => y.indexOf(itm) > -1);
        // The union of two or more sets is the set of all distinct elements present in all the sets.
        const union = _.uniq(x.concat(y));
        
        return (intersection.length / union.length).toFixed(3);
    }

    return {
        euclidean: euclideanDistance,
        manhattan: manhattanDistance,
        minkowski: minkowskiDistance,
        jaccard: jaccardDistance,
        cosine: cosineDistance,
        sortDistances: sortDistances
    };
})();
