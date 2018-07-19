var express = require('express');
var router = express.Router();

var fileuplode = require('../controllers/fileUplode');
var test = require('../controllers/test');

var fs = require('fs');






  // router.post('/uplodeFile',function(req,res,next){
  //   fileuplode.uplodeFile(req.params.id,res,next);
  // });

  router.post('/uplodeFile',fileuplode.uplodeFile);

  router.post('/insertFile',fileuplode.insertFile);

  router.get('/showFile',fileuplode.showFile);

  router.post('/removeFile',fileuplode.removeFile);


  router.get("/test", function(req, res) {

    fs.writeFile('abc.txt','hi how r u',function(error,data){
      if(error) {
      console.log(error);
    } else {
      console.log(data);
    }

    })
  });







module.exports = router;
