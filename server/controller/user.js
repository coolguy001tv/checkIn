var Controller = require('../controller');
var Database = require('../model/database');
var UserModel = require('../model/user');
var config = require('../config');
var parse = require('co-body');
var path = require('path');

var User = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

User.prototype = {
    register:function(){
        // 同步考勤中的异常信息
        this.router.post('/user/login', function *() {
            this.type = Controller.getType('json');

            var post = yield parse.form(this);
            var user = UserModel.getInstance();
            var data = yield user.login(post);

            if(data) {
                this.body = Controller.format(data.toJSON(), 0, user.lang('SUCCESS'));
            }else {
                this.body = Controller.format(null, 1, user.lang('LOGIN_PASSWORD'));
            }
        });

        this.router.get('/user/list', function *() {

        });

        (function(times) {
            var last = times.pop();
            var standard = new Date();
            var date = new Date();
            date.setTime(last);
            if(date.getHours() <= 5 && date.getMinutes() <= 30) {
                standard.setTime(last - 86400 * 1000);
            }
            standard.setHours(17);
            standard.setMinutes(30);
            standard.setSeconds(0);

            var between = date.getTime() - standard.getTime();
            var minutes = Math.round(between/1000/60);

            // 凌晨两点以后算八小时
            if(minutes >= 510) {
                return 480;
            }
            // 12点以后算四小时
            if(minutes >= 390) {
                return 240;
            }
            // 10点以后算两小时
            if(minutes >= 270) {
                return 120;
            }
            // 8点以后才算一小时
            if(minutes >= 150) {
                return 60;
            }
            return 0;
        })([Date.now() + 3600 * 1000 * 10]);

        (function(times) {
            var first = times.shift();
            var standard = new Date();
            var date = new Date();
            date.setTime(first);
            if(date.getHours() <= 5 && date.getMinutes() <= 30) {
                standard.setTime(last - 86400 * 1000);
            }
            standard.setHours(8);
            standard.setMinutes(30);
            standard.setSeconds(0);

            var between = date.getTime() - standard.getTime();
            return Math.round(between/1000/60);
        })([Date.now()])
    }
};