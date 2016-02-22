/**
 * Created by Administrator on 2016/2/17.
 * 请手动修改adodb.js：
 * function str(key, holder) {
  ...
  switch (typeof value) {
    ...
    case 'date':
        return isFinite(value) ? value + 0 : null;
   ...
  }
 ...
}

 详细参考：https://github.com/nuintun/node-adodb/issues/13
 */
var ADODB = require('node-adodb'),
    connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=att2000.mdb;');
var http = require("http");
//var colors = require('colors/safe');

// 全局调试开关，默认关闭
ADODB.debug = true;

// 不带返回的查询
//connection
//    .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
//    .on('done', function (data){
//        console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
//    })
//    .on('fail', function (data){
//        // TODO 逻辑处理
//    });
//
//// 带返回标识的查询
//connection
//    .executeScalar(
//        'INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)',
//        'SELECT @@Identity AS id'
//    )
//    .on('done', function (data){
//        console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
//    })
//    .on('fail', function (data){
//        // TODO 逻辑处理
//    });

// 带返回的查询
connection
    .query('select top 2 CHECKTIME from CHECKINOUT;')
    .on('done', function (data){
        //console.log(data);
        var records = data.records;
        console.log(records);
    })
    .on('fail', function (data){
        // TODO 逻辑处理
    });
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
}).listen(8081);