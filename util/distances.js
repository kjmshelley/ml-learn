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

    return {
        euclidean: euclideanDistance,
        sortDistances: sortDistances
    };
})();
