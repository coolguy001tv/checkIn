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
                reject(-1);//用户名错误
            }
            db.serialize(function(){
                db.get("select * from classMembers where userId=?",userId,function(err,row){
                    if(row){
                        resolve(row.classId);//直接返回ID值
                    }else{
                        reject(-2);//没有记录
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
                        resolve(rows);
                    }else{
                        reject(-5);//系统异常
                    }
                });
            })
        })

    };
    //设置班次
    var setClass = function(id,users){
        return new Promise(function(resolve,reject){
            if(!id){
                reject(-1);//如果不存在ID，直接返回
            }
            if(!users || !users.length || !(users instanceof Array)){
                reject(-2);//用户数组不存在，或者压根不是数组，直接返回
            }
            //以下代码应当得到优化，否则效率很低（虽然在小数据量情况下没有啥）
            db.serialize(function(){
                users.forEach(function(value,key,arr){
                    //先更新，如果更新的行数为0，就插入 （不能先插入数据判断是否失败，这样会导致新的数据更新不上）
                    db.get("UPDATE classMembers SET classId=? where userId=?",[id,value],function(err,row){
                        //console.log(value,id);
                        if(err){//update理论上并不会出问题
                            console.log(err);
                            reject(-3);//逻辑错误
                        }
                        if(!row){//没有update成功，说明没有数据，插入一条
                            db.run("INSERT INTO classMembers(userId,classId) VALUES(?,?)",[value,id],function(err){
                                if(err){
                                    reject(-4);//逻辑错误
                                }
                            });
                        }
                    })


                });
            });
            //先假定能够执行到这里的都是OK的
            resolve(0);
        });


    };
    return {
        getClassByUserId:getClassByUserId,
        getAllClasses:getAllClasses,
        setClass:setClass
    }
};