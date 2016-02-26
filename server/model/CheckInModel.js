/**
 * Created by CoolGuy on 2016/2/24.
 */
var conf = require('./conf');
var ADODB = require('node-adodb');
var KUserModel = require('./KUserModel');
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+conf.accessDbName+';');
// 全局调试开关，默认关闭
ADODB.debug = true;

module.exports = function CheckInModel(obj){
    var opt = {
        name:obj.name || '',
        startTime:obj.startTime || '',
        endTime:obj.endTime || '',
        pageIndex:obj.pageIndex || 1,
        pageSize:obj.pageSize || 10
    };

    //where字符串拼接
    var whereCombine = function(){
        debugger;
        var sql = ' ';
        //todo:考虑异常字符串的情况
        opt.startTime && (sql += ' and CHECKTIME > #' + opt.startTime + '#');
        opt.endTime  && (sql += ' and CHECKTIME < #' + opt.endTime+ '#');
        //console.log(sql);
        return sql;
    };
    //获取最终结果，目前用在查询列表和查询总条数上
    //根据是否传入用户名进行不同的逻辑处理
    var getResult = function(querySql){
        return new Promise(function(resolve,reject){
            //程序异常
            if(typeof  querySql !== 'function'){
                reject(-1);
            }
            var where = " where 1=1 ";//where语句的拼接
            //有姓名的查询需要在获取完用户ID之后再进行相关操作
            if(opt.name){
                var oneUser = KUserModel(null,opt.name);
                oneUser.getUserByName().then(function(userInfo){
                    //console.log(userInfo);
                    var id = userInfo[0].USERID;
                    where += ' and CHECKINOUT.USERID='+id;
                    where += whereCombine();
                    querySql(where).then(function(result){
                        resolve(result);
                    });
                });
            }else{
                where += whereCombine();
                querySql(where).then(function(result){
                    resolve(result);
                })
            }
        })

    };
    var getList = function *(){
        //根据where语句查询结果
        var querySql = function (where){
            return new Promise(function(resolve,reject){
                var sql =
                    'SELECT top '+ opt.pageSize + ' * ' +
                    'from ( select top '+opt.pageIndex * opt.pageSize+' USERINFO.Name as Name,CHECKINOUT.CHECKTIME as CHECKTIME' +
                    ' from (USERINFO inner join CHECKINOUT on USERINFO.USERID=CHECKINOUT.USERID) '+
                    where + ' order by CHECKTIME desc'+') order by CHECKTIME asc';

                connection
                    .query(sql)
                    .on('done',function(data){
                        var records = data.records;
                        //console.log(records);
                        resolve(records);
                    })
                    .on('fail',function(data){
                        console.log('------------------error -----------');
                        console.log(data);
                        reject(data);
                    })
            })
        };
        return getResult(querySql);


    };
    //获取的中条数
    var listLen = function(){
        var querySql = function(where){
            return new Promise(function(resolve,reject){
                var sql = 'SELECT count(*) from  CHECKINOUT ' + where;
                connection
                    .query(sql)
                    .on('done',function(data){
                        var records = data.records;
                        //console.log(records);
                        resolve(records[0].Expr1000);//Expr1000是access自动生成的字段
                    })
                    .on('fail',function(data){
                        console.log('------------------error -----------');
                        console.log(data);
                        reject(data);
                    })
            });


        };

        return getResult(querySql);
    };
    return {
        getList:getList,
        listLen:listLen
    }
};
