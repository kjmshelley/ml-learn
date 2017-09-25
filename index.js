const knn = require("./classifiers/knn");
const dataSets = require("./datasets");
const dataSource = require("./datasources");
const DataSourceTypes = require("./datasources/DataSourceTypes");

module.exports = {
    DataSets: dataSets,
    KNearestNeighborClassifier: knn,
    DataSourceTypes: DataSourceTypes,
    DataSource: dataSource
};