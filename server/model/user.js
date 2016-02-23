var Model = require('../model');
var UserController = require('../controller/user.js');

var User = module.exports = function(router) {
    Model.call(this, router);
    this.register();
};

User.prototype = {
    register:function() {
        this.router.get('/user/login', function() {
            this.type = 'application/json';
            var params = this.params;
            //console.log(this.name,this.password);
            var oneUser = UserController(params.name,params.password);
            if(oneUser.check()){
                this.body = JSON.stringify({"msg":params.name+" is ok"});
            }else{
                this.body = JSON.stringify({"msg":params.name+" is not ok"});
            }
        });

        this.router.post('/user/login', function *() {
            var post = (yield parse.form(this));
            this.type = 'application/json';
            this.body = JSON.stringify(post);
        });
    }
};