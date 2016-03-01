/**
 * Created by CoolGuy on 2016/2/24.
 */
var Controller = require('../controller');
var KUserModel = require('../model/KUserModel.js');
var ClassMemeberModel = require('../model/ClassMemberModel');
var parse = require('co-body');
var R = require('./../R.js');


var KUser = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

KUser.prototype = {
    register:function(){
        //获取用户信息
        var getUserInfo = function *(user){
            //console.log(user);
            //注意支持user.id为0的情况，表示所有用户信息
            var method = !(user.id === null || user.id === undefined) ? user.getUserById : user.getUserByName;
            var info = yield method();
            return R.set(info.success,info.msg,info.data);
        };

        //获取所有用户数据
        var getAllUsers = function *(user){
            var info = yield user.getUserById();
            var classMembers = yield ClassMemeberModel().getAllClasses();
            //根据ID找到对应的classId
            var getClassIdByUserId = function(classMemberRows,userId){
                if(!classMemberRows){
                    return -1;
                }
                var classElement = classMemberRows.find(function(value,key,arr){
                    if(value.userId == userId){
                        return true;
                    }
                });
                return classElement ? classElement.classId : -1;
            };
            info.data.forEach(function(value,key,arr){
                value.id = value.USERID;
                value.name = R.setRightWords(value.Name);
                //console.log(new Buffer(value.name));
                value.classes = getClassIdByUserId(classMembers.data,value.id);
                delete  value.USERID;
                delete value.Name;
            });
            return R.set(info.success,info.msg,info.data);
        };


        this.router.get('/getKUserById/:id',function *(){
            this.type = 'application/json';
            var params = this.params;
            var user = KUserModel(params.id);
            this.body = yield getUserInfo(user);

        });
        this.router.get('/getKUserByName/:name',function *(){
            this.type = 'application/json';
            var params = this.params;
            var user = KUserModel(null,params.name);
            this.body = yield getUserInfo(user);
        });
        this.router.get('/getAllKUsers',function *(){
            this.type = 'application/json';
            var user = KUserModel(0);//0表示所有用户
            this.body = yield getUserInfo(user);
        });
        this.router.get('/get/allUsers',function *(){
            this.type = 'application/json';
            var user = KUserModel(0);//0表示所有用户
            this.body = yield getAllUsers(user);
        });
    }

}
