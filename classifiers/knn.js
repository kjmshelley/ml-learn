const distances = require("../util/distances");
const splitData = require("../util/splitData");
const normalizeFeatures = require("../util/normalizeFeatures");

function knn(k = 5, distance = 'euclidean') {
    let dist = null,
        training = [],
        model = null;
    
    if (distance === 'euclidean') {
        dist = distances.euclidean;
    }
    else {
        throw 'Distance not specified';
    }

    const countLabels = (arr) => {
        const r = _.groupBy(arr, (o) => o.label);
        const sortable = [];
        for (let key in r) {
            sortable.push([key, r[key]]);
        }

        sortable.sort(function(a, b) {
            return a[1] < b[1];
        });
        return sortable;
    }

    function learn(collection, iteratee, type) {
        let label = type;
        if (typeof iteratee !== 'function') {
            label = iteratee;
        }
        if (typeof label !== 'object') {
            throw 'Option needs to be an object';
        }
        if (!Array.isArray(collection)) {
            let plainObject = collection;
            if (typeof iteratee === 'function') {
                plainObject = iteratee(collection);
            }
            const classifier = plainObject[label.label];
            delete plainObject[label.label];
            training.push({
                obj: plainObject,
                label: classifier
            });
        }
        else {
            const arrayOfTrainingData = collection;
            arrayOfTrainingData.forEach((o) => {
                let value = o;
                if (typeof iteratee === 'function') {
                    value = iteratee(o);
                }
                const classifier = value[label.label];
                
                // remove the label from the object so it will not be considered a feature
                delete value[label.label];
                
                training.push({
                    obj: value,
                    label: classifier
                });
            });
        }
        /*
            returns {
                trainingData: [ array of data ],
                testData: [ array of data]
            }
        */
        const d = splitData(training, label);
        training = d.trainingData;
        return d;
    }

    function predict (obj) {
        if (!obj) {
            throw 'The object you would like to predict must be defined';
        }
        if (training.length === 0) {
            throw 'Please first train the model before trying to predict a label';
        }

        const normalizedTrainingData = normalizeFeatures(training);
        const normalizedObj = normalizeFeatures(obj);

        const temp_training = [];
        for (let i in training) {
            if (typeof training[i].obj !== 'undefined' ||
                Object.keys(training[i].obj).length !== Object.keys(obj).length) {
                delete obj[training[i].label];
                const distance = dist(training[i].obj, obj.obj);
               
                temp_training.push({
                    obj: training[i].obj,
                    label: training[i].label,
                    distance: distance
                });
            }
        }
        const sorted = temp_training.sort((a,b) =>  a.distance - b.distance);
        const nearestNeighbors = sorted.slice(0, k);
        const labels = countLabels(nearestNeighbors);
        model = {
            data: sorted,
            nearestNeighbors: nearestNeighbors,
            labels: labels
        };
        return labels[0][0];
    }

    function predictStats(testData, callback) {
        const total = testData.length;
        let correctLabelData = [],
            wrongLabelData = [];

        testData.forEach((test) => {
            const label = predict(test);
            if (test.label === label) {
                correctLabelData.push(test);
            }
            else {
                wrongLabelData.push(test);
            }
        });

        const correctTotal = correctLabelData.length,
              wrongTotal = wrongLabelData.length;

        
        const stats = {
            total: total,
            totalCorrectlyLabel: correctTotal,
            totalWronglyLabel: wrongTotal,
            correctlyLabel: ( correctTotal / total ).toLocaleString("en", { style: "percent" }),
            wronglyLabel: ( wrongTotal / total ).toLocaleString("en", { style: "percent" }),
            correctlyLabelData: correctLabelData,
            wronglyLabelData: wrongLabelData
        };

        if (callback) {
            callback(stats);
            return;
        }
        return stats;
    }

    function getModel() { 
        return model; 
    } 

    return (function() {
        training = [];
        model = null;
        return {
            learn: learn,
            predict: predict,
            predictStats: predictStats,
            model: getModel
        }
    })();
}


module.exports = knn;