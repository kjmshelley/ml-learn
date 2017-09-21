# ml-learn

ml-learn is a straightforward JS library to train ML models on your JSON data


## Installing
```
$ npm install ml-learn
```

# Usage

## KNN

```javascript
const ml = require("ml-learn");
/*
    data is a JSON array of objects
    { 'sepalLength': 5.1, 'sepalWidth': 3.5, 'petalLength': 1.4, 'petalWidth': 0.2, 'class': 'Iris-setosa' },
    { 'sepalLength': 6.2, 'sepalWidth': 2.9, 'petalLength': 4.3, 'petalWidth': 1.3, 'class': 'Iris-versicolor' }
    ....
*/
const data = ml.DataSets.iris; 
const knn = ml.KNearestNeighborClassifier();

// train our model and tell it what is the name of our label 
const model = knn.learn(data, { label: 'class' });
console.log('trainingData...', model.trainingData.length);
console.log('testData....', model.testData.length);

model.testData.forEach((test) => {
    const label = knn.predict(test);
    console.log('Should predict: ', test.label, ' \t Predicted: ', label);
});

// the stats function tells you how well the model did
const stats = knn.predictStats(model.testData);
console.log('Stats: ', stats);
```

## TODO

The current vision, 1.0, only provides the K Nearest Neighbor Classifier. 
Future versions will include
* Naive Bayes
* Linear Regression
* Logistic Regression
* SVM
* Decision Tree
* Random Forest
* K-Means
