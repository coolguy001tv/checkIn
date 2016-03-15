var Controller = require('../controller');
var Database = require('../model/database');
var config = require('../config');
var parse = require('co-body');
var fs = require('fs');
var path = require('path');

var Sync = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};
Sync.prototype = {
    register:function(){
        // 同步考勤中的异常信息
        this.router.get('/sync/error', function *() {
            this.type = Controller.getType('json');

            var db = new Database('sqlite');
            var result = yield db.select('checkins', ['*'], ['validated=0']);

            result.forEach(function *(item) {

            });

            this.body = result;
        });

        // 同步考勤中的加班信息
        this.router.get('/sync/extra', function *() {

        });
    }
};