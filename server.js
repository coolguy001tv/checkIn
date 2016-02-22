/**
 * Created by CoolGuy on 2016/2/22.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var getStatic = require('./server/getStatic.js');
var api = require('./server/api/index.js');

http.createServer(function (request, response) {

    var filePath = '';
    var url = request.url;
    //路由
    if(url == '/favicon.ico'){
        filePath = 'public/favicon.ico';
    }else if(url.indexOf('api.js') > -1){//api统一入口
        response.writeHead(200, { 'Content-Type' : "application/json"});
        var json = api('Login','check');
        //var json = {
        //    "a":1,
        //    "b":2
        //};
        response.end(new Buffer(JSON.stringify(json)));
    }else{//html统一入口
        filePath = 'public/index.html';
    }
    //if(request.url == '/'){
    //    filePath = 'public/index.html';
    //}else if(request.url == '/favicon.ico'){
    //    filePath = 'public/favicon.ico';
    //}else{
    //    filePath = 'public'+request.url;
    //}
    if(filePath){
        getStatic(request.url,'./'+filePath,function(content,mime){
            console.log('filePath, = %s,mime = %s',filePath,mime);
            response.writeHead(200, { 'Content-Type': mime || 'text-plain' });
            response.end(content);
        });
    }


}).listen(8081);