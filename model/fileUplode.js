var s = require("../config/dbConnection");
var mongodb = require('mongodb');
var fs = require('fs');



//fileinsert in db
var fileInsert = function(details, cb) {
    var db = s.dbService.db;
    db.collection("file").insertOne(details, function(err, res1) {
        if (err) cb(err, res1);

        cb(err, " file inserted Successfully" );
    });
}
// file show from db
var fileShow = function(details, cb) {
  var db = s.dbService.db;
  db.collection("file").find().toArray(cb);

}


// remove file from //
var removeFile = function(details, cb) {
  console.log(details);
    var db = s.dbService.db;
    db.collection("file").deleteOne({
        _id: new mongodb.ObjectID(details._id)
    }, function(err, res1) {
        if (err) cb(err, res1);
        cb(err, "file Delete Successfully");
    });
}





module.exports = {

fileInsert : fileInsert,
fileShow : fileShow,
fileRemove : removeFile,

  }
