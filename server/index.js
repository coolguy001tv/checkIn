var koa = require('koa');
var router = require('koa-router')();
var config = require('./config');
var fs = require('fs');
var path = require('path');

var app = module.exports = koa();

var view_common = fs.readFileSync(path.resolve(__dirname, config.view));
router.get('', function *(next) {
    this.type = 'text/html; charset=utf-8';
    this.body = view_common;
});

app.use(router.routes());

app.listen(config.server.port);