const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const SQL_Converter = require("./SQL_Types.js");

module.exports = function(options) {
    const config = {
        userName: options.userName,
        password: options.password,
        server: options.server,
        options: {
            database: options.database,
            encrypt: options.encrypt || false,
            rowCollectionOnRequestCompletion: true,
            requestTimeout: options.timeout || 60000
        }
    };
    

    function _execute_statement(sql, connection, callback) {
        var request = new Request(sql, function(err, rowCount, rows) {
            if (err) {
                callback(err);
                return;
            }

            var results = [];
            results = rows.map(function(row) {
                var x = row.reduce(function(obj, item) {
                    obj[item.metadata.colName] = item.value;
                    return obj;
                }, {});
                return x;
            });
            var data = {
                count: results.length,
                data: results
            };
            callback(null, data);
        });

        request.on('done', function(rowCount, more, rows) { 
            connection.close();
        });

        connection.execSql(request);
    }

    function _execute_sproc(sql, params, connection, callback) {
		var request = new Request(sql, function(err, rowCount, rows) {
            if (err) {
                callback(err);
                return;
            }

            var results = [];
            results = rows.map(function(row) {
                var x = row.reduce(function(obj, item) {
                    obj[item.metadata.colName] = item.value;
                    return obj;
                }, {});
                return x;
            });

            var data = {
                count: results.length,
                data: results
            };
            callback(null, data);
        });

        params.forEach(p => {
            request.addParameter(p.name, SQL_Converter(p.type), p.value);
        });

        request.on('row', function(columns) { });

        request.on('done', function() { 
            connection.close(); 
        });

        connection.callProcedure(request);
    }

    return {
        getData: function(sproc, params, callback) {
            if (Array.isArray(params)) {
                const connection = new Connection(config);
                connection.on('connect', function(err) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    _execute_sproc(sproc, params, connection, callback);
                });
            }
            else if(typeof params === 'function') {
                callback = params;
                const connection = new Connection(config);
                connection.on('connect', function(err) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    _execute_statement(sproc, connection, callback);
                });
            }
            else {
                throw 'Please provide a callback';
            }
        }
    };
}