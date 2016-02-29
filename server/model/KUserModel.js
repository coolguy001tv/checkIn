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
                //异常
                resolve(conf.fillResponse(false,conf.response.FAIL,"用户ID异常"));
            }
            var sql = 'select USERID,Name from USERINFO';
            (uid !== 0 ) && (sql +=' where USERID='+id);
            connection
                .query(sql)
                .on('done',function(data){
                    var records = data.records;
                    //console.log(records);
                    resolve(conf.fillResponse(true,conf.response.SUCCESS,"获取成功",records));
                })
                .on('fail',function(data){
                    console.log('-------------------------------error -----------');
                    console.log(data);
                    resolve(conf.fillResponse(false,conf.response.EXCEPTION,"系统异常"));
                })
        });

    };
    //根据名字获取 用户信息
    var getUserByName = function(){
        return new Promise(function(resolve,reject){
            //目前因为数据库读出有乱码情况，只能先部分匹配
            connection
                .query('select USERID,Name from USERINFO where Name like \''+name+'%%\'')
                .on('done',function(data){
                    var records = data.records;
                    //resolve(records);
                    resolve(conf.fillResponse(true,conf.response.SUCCESS,"获取成功",records));
                })
                .on('fail',function(data){
                    console.log('-------------------------------error -----------');
                    console.log(data);
                    resolve(conf.fillResponse(false,conf.response.EXCEPTION,"程序异常"));
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