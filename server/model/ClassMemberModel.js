/**
 * Created by CoolGuy on 2016/2/29.
 */
var conf = require('./conf');//配置文件
var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();
module.exports = function(){
    var db = new sqlite3.Database(conf.dbName);
    //根据用户ID获取用户的班次
    var getClassByUserId = function(userId){
        return new Promise(function(resolve,reject){
            if(!userId){
                //reject(-1);
                // 用户名错误
                resolve(conf.fillResponse(false,conf.response.FAIL,"请传入用户ID"))
            }
            db.serialize(function(){
                db.get("select * from classMembers where userId=?",userId,function(err,row){
                    if(row){
                        //直接返回ID值
                        resolve(conf.fillResponse(true,conf.response.SUCCESS,'获取成功',row.classId));
                        //resolve(row.classId);
                    }else{
                        resolve(conf.fillResponse(false,conf.response.FAIL,'找不到该用户对应的记录'))
                        //reject(-2);//没有记录
                    }
                })
            });
        });
    };
    //获取所有用户对应的班次信息
    var getAllClasses = function(){
        return new Promise(function(resolve,reject){
            db.serialize(function(){
                db.all("select * from classMembers",function(err,rows){
                    if(!err){
                        //resolve(rows);
                        resolve(conf.fillResponse(true,conf.response.SUCCESS,'获取成功',rows));
                    }else{
                        //reject(-5);//系统异常
                        resolve(conf.fillResponse(false,conf.response.EXCEPTION,'系统异常'));
                    }
                });
            })
        })

    };
    //设置班次
    var setClass = function(id,users){
        return new Promise(function(resolve,reject){
            if(!id){
                // 如果不存在ID，直接返回
                resolve(conf.fillResponse(false,conf.response.FAIL,"设置的ID不存在"));
                return;
            }
            if(!users || !users.length || !(users instanceof Array)){
                //用户数组不存在，或者压根不是数组，直接返回
                resolve(conf.fillResponse(false,conf.response.FAIL,"用户数组有问题"));
                return;
            }
            //以下代码应当得到优化，否则效率很低（虽然在小数据量情况下没有啥）
            db.serialize(function(){
                users.forEach(function(value,key,arr){
                    //先更新，如果更新的行数为0，就插入 （不能先插入数据判断是否失败，这样会导致新的数据更新不上）
                    db.get("UPDATE classMembers SET classId=? where userId=?",[id,value],function(err,row){
                        //console.log(value,id);
                        if(err){//update理论上并不会出问题
                            console.log(err);
                            resolve(conf.fillResponse(false,conf.response.EXCEPTION,"更新数据出错"));
                        }
                        if(!row){//没有update成功，说明没有数据，插入一条
                            db.run("INSERT INTO classMembers(userId,classId) VALUES(?,?)",[value,id],function(err){
                                if(err){
                                    //逻辑错误
                                    resolve(conf.fillResponse(false,conf.response.EXCEPTION,"插入数据异常"));
                                }
                            });
                        }
                    })


                });
            });
            //先假定能够执行到这里的都是OK的
            resolve(conf.fillResponse(true,conf.response.SUCCESS,"更新成功"));
        });


    };
    return {
        getClassByUserId:getClassByUserId,
        getAllClasses:getAllClasses,
        setClass:setClass
    }
};