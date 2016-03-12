/**
 * Created by CoolGuy on 2016/2/26.
 *
 */
var conf = require('./conf');//配置文件
var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();

module.exports = function(id){
    var db = new sqlite3.Database(conf.dbName);
    //根据班次ID获取班次
    var getClass = function(){
        return new Promise(function(resolve,reject){
            var where = '';
            //获取所有班次信息
            if( !(id === null || id === undefined)){
                if(!isNaN(id)){
                    where += ' where id ='+id;
                }
                //id异常情况下假定是所有数据
            }
            db.serialize(function(){
                db.all("select * from classes"+where,function(err,rows){
                    if(err){
                        resolve(conf.fillResponse(false,conf.response.EXCEPTION,"程序异常"));
                        return;
                    }
                    //console.log(rows);
                    resolve(conf.fillResponse(true,conf.response.SUCCESS,"获取成功",rows));
                });

            })

        })
    };
    return {
        id:id,
        getClass:getClass
    }
};