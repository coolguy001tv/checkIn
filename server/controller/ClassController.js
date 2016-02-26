/**
 * Created by CoolGuy on 2016/2/26.
 */
var Controller = require('../controller');
var ClassModel = require('../model/ClassModel.js');
var parse = require('co-body');
var R = require('./../R.js');
var ClassController = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};
ClassController.prototype = {
    register:function(){
        //获取班次数据，如果传入的ID为空,则获取所有班次
        var getClasses = function *(classModel){
            var classes = yield classModel.getClass();
            classes.forEach(function(value,key,arr){
                value.classDescrip = value.description;
                value.classRule = value.ruleId;
                delete value.description;
                delete value.ruleId;

            });
            return R.set(true,'获取成功',classes);
        };
        this.router.get('/get/allClasses',function *(){
            this.type = 'application/json';
            var classes = ClassModel();
            this.body = yield getClasses(classes);
        });
        this.router.get('/get/allClasses/:id',function *(){
            this.type = 'application/json';
            var params = this.params;
            //console.log(params);
            var classes = ClassModel(params.id);
            this.body = yield getClasses(classes);
        });
    }
};