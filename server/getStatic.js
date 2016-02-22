/**
 * Created by CoolGuy on 2016/2/22.
 */
var fs = require('fs');
var mime = require('./mime.js');
var path = require('path');
module.exports = function(url,absPath,callback){
    fs.exists(absPath, function(exists){
       if(exists){
           fs.readFile(absPath, function(err, data){
               if(err){
                   console.log(absPath,err);
                   callback && callback('Not found!!!!!!!!!!'+err.toString()) ;
               }else{
                   var ext = path.extname(absPath).slice(1);
                   //console.log(ext,mime[ext]);
                   //处理url
                   //考虑url=
                   //login.html?a=1
                   //login.html#b=2
                   var firstAskSign = url.indexOf("?");
                   if(firstAskSign > -1){
                       url = url.slice(0,firstAskSign);
                   }
                   var firstHashSign = url.indexOf("#");
                   if(firstHashSign > -1){
                       url = url.slice(0,firstHashSign);
                   }
                   //现在url只剩下类似login.html
                   var name = path.basename(url,'.html');//只保留名字
                   // console.log(name,data);
                   data = new Buffer(data.toString('utf-8').replace('index.js',name+'.js'));
                   callback && callback(data,mime[ext]) ;
               }
           });
       }
    });
};