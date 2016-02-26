/**
 * Created by CoolGuy on 2016/2/26.
 */
var conf = require('./conf');//配置文件
var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();

module.exports = function(id){
    var db = new sqlite3.Database(conf.dbName);
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
                    console.log(rows);
                    resolve(rows);
                });

            })

        })
    };
    return {
        id:id,
        getClass:getClass
    }
};