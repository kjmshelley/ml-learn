const sqlServer = require("./SqlServer");
const dataSources = require("./DatasourceTypes");

module.exports = function(options, callback) {
    let db;

    if (!options) {
        throw 'Please provide data source configurations';
    }
    
    if (options.type === dataSources.SQL_SERVER) {
        if (!options.userName || !options.password || !options.server || !options.db) {
            throw 'Please provide the correction parameters for this data source';
        }

        db = sqlServer(options);
    }
    else {
        throw 'Please provide a valid data source type';
    }
    return db;
}
