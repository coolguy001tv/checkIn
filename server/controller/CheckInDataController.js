/**
 * Created by CoolGuy on 2016/2/24.
 */
var Controller = require('../controller');
var parse = require('co-body');
var R = require('./../R.js');

var CheckIn = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

CheckIn.prototype = {
    register:function() {

        this.router.get('/get/checkIn', function *() {
            this.type = 'application/json';
            var params = this.params;
            //console.log(params);
            var oneUser = UserController(params.name,params.password);
            this.body = yield getCheckResult(oneUser);
        });

    }
};