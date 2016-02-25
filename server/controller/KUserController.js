/**
 * Created by CoolGuy on 2016/2/24.
 */
var Controller = require('../controller');
var KUserModel = require('../model/KUserModel.js');
var parse = require('co-body');
var R = require('./../R.js');


var KUser = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

KUser.prototype = {
    register:function(){
        //获取用户信息
        var getUserInfo = function *(user){
            var info = yield user.getUserById();
            return R.set(true,"",info);
        };
        this.router.get('/getKUserById/:id',function *(){
            this.type = 'application/json';
            var params = this.params;
            var user = KUserModel(params.id);
            this.body = yield getUserInfo(user);

        });
        this.router.get('/getKUserByName/:name',function *(){
            this.type = 'application/json';
            var params = this.params;
            var user = KUserModel(null,params.name);
            this.body = yield getUserInfo(user);
        });
    }

}
