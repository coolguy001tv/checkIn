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
    debugger;

    var getList = function *(){
        //where字符串拼接
        var whereCombine = function(){
            debugger;
            var sql = ' ';
            //todo:考虑异常字符串的情况
            opt.startTime && (sql += ' and CHECKTIME > #' + opt.startTime + '#');
            opt.endTime  && (sql += ' and CHECKTIME < #' + opt.endTime+ '#');
            console.log(sql);
            return sql;
        };
        var querySql = function (where){
            return new Promise(function(resolve,reject){
                var sql =
                    'SELECT top '+ opt.pageSize + ' * ' +
                    'from ( select top '+opt.pageIndex * opt.pageSize+' USERID,CHECKTIME from CHECKINOUT '+
                    where + ' order by CHECKTIME desc'+') ';
                console.log("sql----------------",sql);
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

        }
        //var where = " where 1=1 ";//where语句的拼接
        //if(opt.name) {
        //
        //}else {
        //    where += whereCombine();
        //
        //    return new Promise(function(resolve) {
        //        querySql(where).then(function(value) {
        //            resolve([]);
        //        });
        //    });
        //}

        var promise = new Promise(function (resolve,reject){
            var where = " where 1=1 ";//where语句的拼接
            //有姓名的查询需要在获取完用户ID之后再进行相关操作
            if(opt.name){
                var oneUser = KUserModel(null,opt.name);
                oneUser.getUserByName().then(function(userInfo){
                    var id = userInfo.USERID;
                    where += 'USERID='+id;
                    where += whereCombine();
                    querySql(where).then(function(result){
                        resolve(result);
                    });

                });
                //var userInfo = yield (oneUser.getUserByName());

            }else{
                where += whereCombine();
                querySql(where).then(function(result){
                    resolve(result);
                })

            }
        });
        return promise;


    };
    //获取的中条数
    var listLen = function(){

    };
    return {
        getList:getList,
        listLen:listLen
    }
};
