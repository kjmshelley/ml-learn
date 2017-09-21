const _ = require("lodash");

module.exports = function (data) {
    let firstElement;
    if (Array.isArray(data)) {
        firstElement = _.first(data);
    }
    else {
        firstElement = data;
    }
    // get all properties in object and populate template
    const template = {};
    const x_c = 0;
    {
        id: 1,
        name: "Jason",
        store: "Wal-mart"
    }
    for (let i in firstElement) {
        // ignore objects, functions and arrays
        if (typeof i in firstElement === 'string') {
            template[i] = firstElement[i];
            constants.push(firstElement[i]);
        }
        else if(typeof i in firstElement === 'number') {

        }
    }
    // find all properties that are not numbers
    // create an object for each element
    // iterate over all objects in data and exchange 
    // those non numerical properties with their numerical representation

    lodash.uniqBy(data, )
}