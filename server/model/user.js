var Model = require('../model');

var User = module.exports = function(router) {
    Model.call(this, router);
    this.register();
};

User.prototype = {
    register:function() {
        this.router.get('/user/login', function() {
            this.type = 'application/json';
            this.body = '{errcode:1, msg:"user is not exist"}';
        });
    }
};