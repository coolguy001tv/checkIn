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
                        //统一修改登录失败的情况
                        console.log(err);
                        resolve({success:false,code:conf.response.EXCEPTION,msg:"系统异常"})//系统异常
                    }
                    if(result){//说明找到了该条记录，登录成功
                        resolve({success:true,code:conf.response.SUCCESS,msg:"登录成功"});//成功
                    }else{
                        resolve({success:false,code:conf.response.FAIL,msg:"请检查用户名或密码是否有误"});//没有找到
                    }
                });
            });
            db.close();
        });
    };
    return {
        check:check/*,
        init:init*/
    }
}

module.exports = User;