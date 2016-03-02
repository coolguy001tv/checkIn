/**
 * Created by CoolGuy on 2016/2/26.
 */
var Controller = require('../controller');
var ClassModel = require('../model/ClassModel.js');
var ClassMemberModel = require('../model/ClassMemberModel.js');
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
            classes.data.forEach(function(value,key,arr){
                value.classDescrip = value.description;
                value.classRule = value.ruleId;
                delete value.description;
                delete value.ruleId;

            });
            return R.set(classes.success,classes.msg,classes.data);
        };
        var setClass = function *(classId,users){
            var classes = yield ClassMemberModel().setClass(classId,users);
            return R.set(classes.success,classes.msg);
        };
        var getClassByUserId = function *(uId){
            var classMember = yield ClassMemberModel().getClassByUserId(uId);
            return R.set(classMember.success,classMember.msg,classMember.data);
        };

        this.router.get('/classes/list',function *(){
            this.type = 'application/json';
            var classes = ClassModel();
            this.body = yield getClasses(classes);
        });
        this.router.get('/classes/list/:id',function *(){
            this.type = 'application/json';
            var params = this.params;
            //console.log(params);
            var classes = ClassModel(params.id);
            this.body = yield getClasses(classes);
        });
        this.router.post('/classes/setting',function *(){
            var post = (yield parse.form(this));
            this.type = 'application/json';
            var users = post.users;
            var classId = post.classId;
            this.body = yield setClass(classId,users);
        });
        this.router.get('/classes/userId/:id',function *(){
            this.type = 'application/json';
            var params = this.params;
            this.body = yield getClassByUserId(params.id);

        });
    }
};