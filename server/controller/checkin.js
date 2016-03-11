var Controller = require('../controller');
var parse = require('co-body');
var R = require('ramda');

var checkin = require('../model/checkin').getInstance();

var Checkin = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

Checkin.prototype = {
    register:function() {
        this.router.get('/checkin/list', function *() {
            this.type = Controller.getType('json');
            this.body = Controller.format(yield checkin.getList());
        })
    }
};