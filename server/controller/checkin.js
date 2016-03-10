var Controller = require('../controller');
var parse = require('co-body');

var Checkin = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

Checkin.prototype = {
    register:function() {
        this.router.get('/')
    }
};