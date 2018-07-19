var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
const dbName = "mydb";
var assert = require('assert');
global.db;
const dbService = {
  db: undefined,
  connect: callback => {
    MongoClient.connect(url, function(err, data) {
      if (err) {
        MongoClient.close();
        callback(err);
      }
      dbService.db = data.db(dbName);
      callback(null);
    });
  }
};

module.exports = {dbService};
