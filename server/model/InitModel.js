/**
 * Created by CoolGuy on 2016/2/26.
 * 初始化数据相关
 */
var conf = require('./conf');//配置文件
var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();
module.exports = function(){
    var md5 = crypto.createHash('md5');
    var db = new sqlite3.Database(conf.dbName);
    var init = function(){
        initUser().then(function(data){
            if(data == 1){//需要新增数据
                initClasses();
            }
        });
    };
    //初始化用户名密码
    var initUser = function(){
        return new Promise(function(resolve,reject){
            md5.update('123456');
            var d = md5.digest('hex');
            db.serialize(function(){
                db.run('CREATE TABLE user(id integer primary key autoincrement,name varchar(20),password varchar(32))',function(err){
                    debugger;
                    if(err === null){//创建表成功，说明之前没有数据，此时插入数据
                        db.run('INSERT INTO user(`name`,`password`) values("admin",$password)',{
                            $password:d
                        });
                        resolve(1);//成功且是新增
                    }else{
                        console.log(err,this);
                        resolve(0);//成功，但是已经有表
                    }

                });

            });
        })


    };
    var initClasses = function(){
        db.serialize(function(){
            db.run('CREATE TABLE IF NOT EXISTS classes(id integer primary key autoincrement,className varchar(100),description varchar(500),ruleId int(10))');
            db.run('INSERT INTO  classes(`className`,`description`,`ruleId`) values("非运维班次","非运维相关的班次信息",-1)');
            db.run('INSERT INTO  classes(`className`,`description`,`ruleId`) values("运维班次","运维相关的班次信息",-1)');
            db.run('INSERT INTO  classes(`className`,`description`,`ruleId`) values("未分组","未分组相关的班次信息",-1)');
            db.run('INSERT INTO  classes(`className`,`description`,`ruleId`) values("无班次","不需要打卡等相关的班次信息",-1)');
        });
        db.close();
    };
    return {
        init:init
    }
}