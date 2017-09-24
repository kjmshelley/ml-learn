/* for similarity if the data is parse use consine */
module.exports = function(x, y) {
    if (typeof x === 'undefined' || typeof y === 'undefined'
        || (!x) || (!y) || 
        Object.keys(x).length !== Object.keys(y).length) {
        throw 'Features have to be the same length in order to calculate distance properly.';
    }
    let sum = 0;
    let sum_x_sq = 0;
    let sum_y_sq = 0;

    for (let i in x) {
        if (typeof x[i] !== 'number') return;
        if (!y.hasOwnProperty(i)) return;
        if (typeof x[i] !== typeof y[i]) {
            throw 'Features are not of the same type ${x[i]} and ${y[i]}';
        }
        
        sum += (x[i] * y[i]);
        sum_x_sq += (x[i] * x[i]);
        sum_y_sq += (y[i] * y[i]);
    }

    const a = sum;
    const b = (Math.sqrt(sum_x_sq) * Math.sqrt(sum_y_sq));
    const d = (a / b);
    return d;
}
