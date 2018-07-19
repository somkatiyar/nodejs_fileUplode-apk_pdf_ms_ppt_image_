var express = require('express');
var router = express.Router();
var path = require("path");
var multer = require('multer');
var s = require("../config/dbConnection");
var mime = ["application/msword","application/vnd.android.package-archive","application/pdf","application/msword","application/vnd.ms-powerpoint",
"image/jpeg","image/jpg","image/png","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

var fileModel =require('../model/fileUplode');

// file uplode callback functio



var fileStore = multer.diskStorage({
  destination:function(req,file,callback){
    if(mime.indexOf(file.mimetype) >= 0){
      console.log(file.mimetype);
      //returing path to store
      if(file.mimetype=="application/vnd.android.package-archive"){
      callback(null,'./public/file/apk');}

      if(file.mimetype=="application/pdf"){
      callback(null,'./public/file/pdf');}

      if(file.mimetype=="application/msword" || "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      callback(null,'./public/file/msword');}

      if(file.mimetype=="application/vnd.ms-powerpoint"){
      callback(null,'./public/file/ppt');}

      if(file.mimetype=="image/jpeg" || "image/jpg" || "image/png"){
      callback(null,'./public/file/image');}




    } else{
      //returing error
      callback("unable to upload",null);
    }
  },
  filename:function(req,file,callback){

  callback(null,file.fieldname + '_' + Date.now()+"_"+file.originalname);

  }
});


// routehandler function for  file uplode

exports.uplodeFile = function(req,res,next){
  var upload = multer({
    storage: fileStore,
  }).single('file');
  upload(req,res,function(err){
    if(err){return  res.status(200).json({contents:[],statusText:"Unable to upload",status:"0"});}
    res.status(200).json({contents:req.file.filename,fileType :req.file.mimetype ,statusText:"File Uploaded",status:"1"});
  });
};




exports.insertFile= function(req, res, next) {
  console.log(req.body);
    fileModel.fileInsert(req.body, function(err, data){
        if (err) {
                console.log(err);
                return res.send(err);
              }

              else{

                res.send({"data":data,"status":true,"status_code":"200" ,"message" : "file created"});
           }
}) };


exports.showFile= function(req, res, next) {
    fileModel.fileShow(req.body, function(err, data){

            if(data.length > 0){
                res.send({"data":data,"status":true,"status_code":"200"});
            }else{
                 res.send({"data":data,"status":false,"status_code":"200"});
              }
          });


};



exports.removeFile = function(req, res, next) {

    fileModel.fileRemove(req.body, function(err, data){
        if (err) {
                console.log(err);
                return res.send(err);
              }
              else{
                 res.send({"data":data,"status":true,"status_code":"200"});
            }


        });
};
