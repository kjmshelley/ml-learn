const ml = require("../index");
const data = ml.DataSets.iris;
const knn = ml.KNearestNeighborClassifier();

const model = knn.learn(data, { label: 'class' });
console.log('trainingData...', model.trainingData.length);
console.log('testData....', model.testData.length);

model.testData.forEach((test) => {
    const label = knn.predict(test);
    console.log('Should predict: ', test.label, ' \t Predicted: ', label);
});

const stats = knn.predictStats(model.testData);
console.log('Stats: ', stats);

