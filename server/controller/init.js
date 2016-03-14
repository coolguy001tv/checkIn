var Controller = require('../controller');
var Database = require('../model/database');
var config = require('../config');
var parse = require('co-body');
var fs = require('fs');
var path = require('path');

var Init = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};
Init.prototype = {
    register:function(){
        //初始化专用，正常情况下不需要暴露出来
        this.router.get('/init/database',function(){
            this.type = Controller.getType('json');

            var db = new Database('sqlite');
            var result = fs.readdirSync(config.database.sqlite.init).map(function(file) {
                var sql = fs.readFileSync(path.resolve(config.database.sqlite.init, file), 'utf-8');
                return db.conneciton.run(sql);
            });

            this.body = result;
        });

        this.router.get('/init/user', function *() {
            this.type = Controller.getType('json');

            var db = new Database('sqlite');
            var access = new Database('access');

            var result = yield access.select('USERINFO', ['USERID', 'NAME', 'Badgenumber']);
            var sqls = [];
            if(result.valid) {
                var crypto = require('crypto');
                var string = require('../util/string');
                var md5 = crypto.createHash('md5');
                md5.update('123456');
                var password = md5.digest('hex');
                sqls = result.records.map(function(item) {
                    var sql = "insert into users(name,password,employid,lasttime,role,ruleid) values('"+string.accessString(item.NAME)+"','"+password.toString()+"','"+item.Badgenumber+"',"+Date.now().toString()+",1,1)";
                    db.connection.run(sql);
                    return sql;
                });
            }

            this.body = 'success' + sqls;
        });

        this.router.get('/init/update', function *() {
            this.type = Controller.getType('json');

            var db = new Database('sqlite');
            var access = new Database('access');
            var system = yield db.select('system', ['checkinid']);

            var last = system instanceof Array && system.length > 0 ? system[0].checkinid : 0;
            var date = new Date();
            date.setTime(last || Date.now());
            var result = yield access.select('CHECKINOUT', ['USERID', 'CHECKTIME'], ['CHECKTIME > CDATE(\'' + date.toLocaleString() + '\')']);

            // import to sqlite
            if(result.valid) {
                result.records.forEach(function(item) {
                    db.connection.run('insert into checkins(time,userid) values(?,?)',
                        [Date.parse(item.CHECKTIME).toString(), item.USERID]
                    );
                    last = Date.parse(item.CHECKTIME);
                });
            }
            yield db.update('system', ["checkinid='"+last+"'"]);

            db.close();
            access.close();

            this.body = 'success ' + (result.valid && result.records.length);
        });
    }
};