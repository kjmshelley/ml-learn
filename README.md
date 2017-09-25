# ml-learn

ml-learn machine learning in NodeJS. Simple tools for data mining and data analysis

Developing machine learning models requires many steps 
* Data Collection
* Data Preparation
* Data Analysis
* Data training, validation and testing

ml-learn provides all the tools to complete these four steps
* DataSource: allows connecting to the following data sources
     - SQL Server
     - MySQL Server
     - Mongo DB
     - CSV or other flat file
     - Excel
   You can also format and prep your data upon loading for training your ML models.
* Data Analysis: charting library to analyze your data
* And finally....you can train, validate and test your models by using the already created ML alroithms in ml-learn.
* You can also create your own models using the ml-stats also provided in this framework

## Installing
```
$ npm install ml-learn
```

# Usage

## Datasource

### Database
```javascript
const ml = require("ml-learn");

// connect to your datasource
const dataSourceTypes = ml.DataSourceTypes;
const ds = ml.DataSource({
    type: dataSourceTypes.SQL_SERVER,
    userName: 'YOUR-USERNAME',
    password: 'YOUR-PASSWORD',
    server: 'YOUR-SERVER',
    db: 'DB'
});

let sql = 'SELECT TOP 1 * FROM dbo.Client';

// get your data
ds.getData(sp, function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
    /*
        prints:
        { 
            count: 1,
            data: [ ... ]
        }
    */
});

/* for stored procedures */
sql = 'dbo.sp_Test'; 
const params = [];
params.push({
    name: "ClientId",
    type: "int",
    value: 123
});
ds.getData(sp, params, function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
    /*
        prints:
        { 
            count: 1,
            data: [ ... ]
        }
    */
});
```

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
