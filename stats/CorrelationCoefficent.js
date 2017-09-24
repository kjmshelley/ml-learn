/* 
    for similarity if the data is grade-inflation 
    or has different scales use Correlation Coefficent 
*/
module.exports = function(x, y) {
    if (typeof x === 'undefined' || typeof y === 'undefined'
        || (!x) || (!y) || 
        Object.keys(x).length !== Object.keys(y).length) {
        throw 'Features have to be the same length in order to calculate distance properly.';
    }
    let sum = 0;
    let sum_x = 0;
    let sum_x_sq = 0;
    let sum_y = 0;
    let sum_y_sq = 0;
    let total = Object.keys(x).length;
    if (total === 0) return 0;

    for (let i in x) {
        if (typeof x[i] !== 'number') return;
        if (!y.hasOwnProperty(i)) return;
        if (typeof x[i] !== typeof y[i]) {
            throw 'Features are not of the same type ${x[i]} and ${y[i]}';
        }
        sum_x += x[i];
        sum_y += y[i];
        sum += (x[i] * y[i]);
        sum_x_sq += (x[i] * x[i]);
        sum_y_sq += (y[i] * y[i]);
    }

    const a = ((sum_x * sum_y) / total) - sum;
    const b = Math.sqrt((sum_x_sq - ((sum_x * sum_x) / total)));
    const c = Math.sqrt((sum_y_sq - ((sum_y * sum_y) / total)));
    const d = (b * c);
    if (d === 0) return 0;

    return a / (b * c);
}
