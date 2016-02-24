/**
 * Created by CoolGuy on 2016/2/23.
 */
var sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto');
var conf = require('./conf');//配置文件
function User(username,password){
    var db = new sqlite3.Database(conf.dbName);
    var md5 = crypto.createHash('md5');
    var check = function (){
        //return 1;
        return new Promise(function(resolve,reject){
            db.serialize(function(){
                md5.update(password);
                var d = md5.digest('hex');
                console.log(username,d);
                db.get("SELECT * from user where name=? and password=?",[username,d],function(err,result){
                    if(err){
                        console.log(err);
                        reject(2)//失败
                    }
                    if(result){//说明找到了该条记录，登录成功
                        resolve(0);//成功
                    }else{
                        resolve(1);//没有找到
                    }
                });
            });
            db.close();
        });
    };
    var init = function(){
        md5.update('123456');
        var d = md5.digest('hex');
        db.serialize(function(){
            db.run('CREATE TABLE IF NOT EXISTS user(name varchar(20),password varchar(32))');
            db.run('INSERT INTO user(`name`,`password`) values("admin",$password)',{
                $password:d
            });

        });
        db.close();
    };
    return {
        check:check,
        init:init
    }
}

module.exports = User;