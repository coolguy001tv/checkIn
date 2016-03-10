var Controller = require('../controller');
var UserModel = require('../model/UserModel.js');
var KUserModel = require('../model/KUserModel');
var parse = require('co-body');
var R = require('./../R.js');
var conf = require('../model/conf');//配置文件

var User = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

User.prototype = {
    register:function() {
        //获取校验用户名密码的结果
        var getCheckResult = function *(oneUser){
            var check = yield oneUser.check();
            //console.log("I am the result",check);
            return R.set(check.success, check.msg,'');
        };

        //支持2中协议的登录
        this.router.post('/user/login/:name/:password', function *() {
            this.type = 'application/json';
            var params = this.params;
            var oneUser = UserModel(params.name,params.password);
            this.body = yield getCheckResult(oneUser);
        });
        this.router.post('/user/login', function *() {
            var post = (yield parse.form(this));
            this.type = 'application/json';
            var oneUser = UserModel(post.name,post.password);
            this.body = yield getCheckResult(oneUser);
        });
    }
};