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
        //获取签到列表
        var getCheckInList = function *(model){
            var len = yield model.listLen();
            var list = yield model.getList();
            var resultMap = {
                list:list,
                iTotalDisplayRecords:len
            };
            return R.set(true,"获取成功",resultMap);

        };

        this.router.get('/get/checkIn', function *() {
            this.type = 'application/json';
            var post = (yield parse.form(this));
            //console.log(params);
            var checkInDataModel = CheckInDataModel({
                name:post.name,
                startTime:post.startTime,
                endTime:post.endTime,
                pageIndex:post.pageIndex || 1,
                pageSize:post.pageSize || 10
            });
            this.body = yield getCheckInList(checkInDataModel);
        });

    }
};