module.exports = function(data, options) {
    const opts = options;
    // split data by 10% by default 
    const splitDataBy = 10;
    const randomizeData = (a, b) => 0.5 - Math.random();
    if (!opts) {
        opts = {
            splitDataBy: 10,
            randomizeData: (a, b) => 0.5 - Math.random()
        }
    }
    else {
        if (!opts.splitDataBy || opts.splitDataBy < 0) {
            opts.splitDataBy = splitDataBy;
        }
        if (!opts.randomizeData || typeof opts.randomizeData !== 'function') {
            opts.randomizeData = randomizeData;
        }
    }

    // randomly sort the data
    const randomData = data.sort(opts.randomizeData);
  
    if (opts.splitDataBy > randomData.length) {
        throw `splitDataBy: ${opts.splitDataBy} data.length: ${data.length} 
              splitDataBy cannot be more than the actual length of the dataset.`;
    }

    if (randomData.length === 0) {
        return {
            trainingData: 0,
            testData: 0
        };
    }

    const splitBy = randomData.length / opts.splitDataBy;

    const trainingData = randomData.slice(0, randomData.length - splitBy);
    const testData = randomData.slice(randomData.length - splitBy);
    return {
        trainingData: trainingData,
        testData: testData
    };
};