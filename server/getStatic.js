/**
 * Created by CoolGuy on 2016/2/22.
 */
var fs = require('fs');
var mime = require('./mime.js');
var path = require('path');
module.exports = function(absPath,callback){
    fs.exists(absPath, function(exists){
       if(exists){
           fs.readFile(absPath, function(err, data){
               if(err){
                   console.log(absPath,err);
                   callback && callback('Not found!!!!!!!!!!'+err.toString()) ;
               }else{
                   var ext = path.extname(absPath).slice(1);
                   //console.log(ext,mime[ext]);
                   callback && callback(data,mime[ext]) ;
               }
           });
       }
    });
};