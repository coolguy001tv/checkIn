/**
 * Created by CoolGuy on 2016/2/24.
 */
var Controller = require('../controller');
var parse = require('co-body');
var R = require('./../R.js');
var CheckInDataModel = require('../model/CheckInModel');
var ClassMememberModel = require('../model/ClassMemberModel');

var CheckIn = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

CheckIn.prototype = {
    register:function() {
        var formatTime = function(date,format){
            //目前只支持
            // format=1: y-m-d h:i:s
            // format=2: y-m-d
            var str = date.getFullYear()+"/"
                    +(date.getMonth()+1) + '/'
                    +(date.getDate())
                    +(format === 1 ?
                        ' '
                        +(date.getHours())+ ':'
                        +(date.getMinutes())+ ':'
                        +(date.getSeconds())
                        : ''
                    );
            return str;
        };
        //获取签到列表
        var getCheckInList = function *(model){
            var len = yield model.listLen();
            var list = yield model.getList();
            //console.log(list);
            var classMember = yield ClassMememberModel().getAllClasses();

            //所属工作日
            var whichDay = function(date){
                var realDate = date;
                if(date.getHours() < 5){//小于凌晨五点认为签到是前一个工作日
                    realDate = new Date(date.valueOf() - 1000*3600*24);
                }
                return realDate;
            };
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
            //对list字段进行相关处理并返回
            list.data.forEach(function(value,key,arr){
                var date = new Date(value.CHECKTIME);
                value.checkInTime = formatTime(date,1);
                //所属工作日
                value.checkInDay = formatTime(whichDay(date),2);
                value.name = value.Name;
                value.classes = getClassIdByUserId(classMember.data,value.USERID);//暂时保持，后面优化

                delete value.CHECKTIME;
                delete value.Name;
            });
            //对数据中每一项的classes进行处理

            //console.log('list', list);
            var resultMap = {
                list:list.data,
                iTotalDisplayRecords:len.data
            };
            var errMsg = list.success ? '' : list.msg;
            errMsg += len.success ? '&' : len.msg;
            if(errMsg === '&'){
                errMsg = '获取成功'
            }
            return R.set(list.success && len.success,errMsg,resultMap);

        };

        this.router.get('/get/checkIn', function *() {
            this.type = 'application/json';
            var post = this.query;
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