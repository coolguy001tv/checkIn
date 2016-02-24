/**
 * Created by CoolGuy on 2016/2/24.
 * 考勤用户的数据模型
 */
var conf = require('./conf');//配置文件
var ADODB = require('node-adodb');

// 全局调试开关，默认关闭
ADODB.debug = true;


module.exports = function(id,name){
    //用ID获取用户信息
    var getUserById = function(){
        return new Promise(function(resolve,reject){
            var uid = Number(id);
            if(isNaN(uid)){
                reject(2);//异常
            }
            var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=att2000.mdb;');
            connection
                .query('select * from USERINFO where USERID='+id)
                .on('done',function(data){
                    var records = data.records;
                    console.log(records);
                    resolve(records);
                })
                .on('fail',function(data){
                    console.log('-------------------------------error -----------');
                    console.log(data);
                    reject(data);
                })
        });

    };
    return {
        getUserById:getUserById
    }
};