/**
 * Created by CoolGuy on 2016/2/24.
 * 考勤用户的数据模型
 */
var conf = require('./conf');//配置文件
var ADODB = require('node-adodb');
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+conf.accessDbName+';');
// 全局调试开关，默认关闭
ADODB.debug = true;


module.exports = function(id,name){
    //用ID获取用户信息,id为0表示获取所有用户信息
    var getUserById = function(){
        return new Promise(function(resolve,reject){
            var uid = Number(id);
            if(isNaN(uid)){
                reject(2);//异常
            }
            var sql = 'select USERID,Name from USERINFO';
            (uid !== 0 ) && (sql +=' where USERID='+id);
            connection
                .query(sql)
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
    //根据名字获取 用户信息
    var getUserByName = function(){
        return new Promise(function(resolve,reject){
            connection
                .query('select * from USERINFO where Name=\"'+name+'\"')
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
    }
    return {
        id:id,
        name:name,
        getUserById:getUserById,
        getUserByName:getUserByName
    }
};