var path = require('path');
var fs = require('fs');
var config = require('./config');

var router = require('koa-router')();
var app = module.exports = require('koa')();

var view_common = fs.readFileSync(path.resolve(__dirname, config.view));
router.get('/', function *(next) {
    this.type = 'text/html; charset=utf-8';
    this.body = view_common;
});

var model_path = path.resolve(__dirname, config.model);
fs.readdirSync(model_path).forEach(function(file) {
    var Model = require(path.resolve(model_path, file));
    new Model(router);
});

app.use(router.routes());

app.listen(config.server.port);