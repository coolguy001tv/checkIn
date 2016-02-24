/**
 * Created by CoolGuy on 2016/2/24.
 */
var Controller = require('../controller');
var parse = require('co-body');
var R = require('./../R.js');
var CheckInDataModel = require('../model/CheckInModel');

var CheckIn = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

CheckIn.prototype = {
    register:function() {

        this.router.get('/get/checkIn', function *() {
            this.type = 'application/json';
            var post = (yield parse.form(this));
            //console.log(params);
            var checkInData = CheckInDataModel({
                name:'',
                startTime:"",
                endTime:"",
                pageIndex:1,
                pageSize:10
            });
            this.body = yield getCheckResult(oneUser);
        });

    }
};