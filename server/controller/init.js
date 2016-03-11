var Controller = require('../controller');
var Database = require('../model/database');
var config = require('../config');
var parse = require('co-body');
var fs = require('fs');
var path = require('path');

var Init = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};
Init.prototype = {
    register:function(){
        //初始化专用，正常情况下不需要暴露出来
        this.router.get('/init/database',function(){
            this.type = 'application/json';

            var db = new Database('sqlite');
            var result = fs.readdirSync(config.database.sqlite.init).map(function(file) {
                var sql = fs.readFileSync(path.resolve(config.database.sqlite.init, file), 'utf-8');
                return db.conneciton.run(sql);
            });

            this.body = result;
        });

        this.router.get('/init/update', function() {

        });
    }
};