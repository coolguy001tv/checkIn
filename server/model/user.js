var Model = require('../model');
var UserController = require('../controller/user.js');
var parse = require('co-body');
var R = require('./../R.js');

var User = module.exports = function(router) {
    Model.call(this, router);
    this.register();
};

User.prototype = {
    register:function() {
        var getCheckResult = function *(oneUser){
            var check = yield oneUser.check();
            //console.log("I am the result",check);
            return R.set(check == 0, "",'');
        };

        this.router.post('/user/login/:name/:password', function *() {
            this.type = 'application/json';
            var params = this.params;
            //console.log(params);
            var oneUser = UserController(params.name,params.password);

            this.body = yield getCheckResult(oneUser);
        });
        //
        this.router.post('/user/login', function *() {
            var post = (yield parse.form(this));
            this.type = 'application/json';
            console.log(post);
            var oneUser = UserController(post.name,post.password);
            this.body = yield getCheckResult(oneUser);
        });
        //初始化专用，正常情况下不需要暴露出来
        this.router.get('/user/init',function(){
            UserController("","").init();
        });

    }
};