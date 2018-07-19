var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var path = require('path');

var app = express();
console.log(31);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
  next();
});


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:false}));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api', api);
var db = require('./config/dbConnection');
db.dbService.connect(err => {
  if (err) {
    console.log("Error: ", err);
    process.exit(1);
  }
});


module.exports = app;
