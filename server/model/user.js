var Model = require('../model');
var parse = require('co-body');

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

        this.router.post('/user/login', function *() {
            var post = (yield parse.form(this));
            this.type = 'application/json';
            this.body = JSON.stringify(post);
        });
    }
};