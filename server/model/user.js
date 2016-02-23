var Model = require('../model');
var parse = require('co-body');
require("babel-core/register");
var UserController = require('../controller/user.js');

var User = module.exports = function(router) {
    Model.call(this, router);
    this.register();
};

User.prototype = {
    register:function() {
        this.router.post('/user/login/:name/:password', function () {
            this.type = 'application/json';
            var params = this.params;
            console.log(params);
            var oneUser = UserController(params.name,params.password);
            //todo: 目前该文件有问题，等我晚上回去研究
            (async function(){
                var result =  await oneUser.check();
                console.log('111111111111111111',result);
                if(result){
                    this.body = JSON.stringify({"msg":params.name+" is ok"});
                }else{
                    this.body = JSON.stringify({"msg":params.name+" is not ok"});
                }
            }());

        });
        //初始化专用，正常情况下不需要暴露出来
        this.router.get('/user/init',function(){
            UserController("","").init();
        });
        //
        this.router.post('/user/login', function *() {
            var post = (yield parse.form(this));
            this.type = 'application/json';
            this.body = JSON.stringify(post);
        });
    }
};