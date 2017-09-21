const knn = require("./classifiers/knn");
const dataSets = require("./datasets/");

module.exports = {
    DataSets: dataSets,
    KNearestNeighborClassifier: knn
};