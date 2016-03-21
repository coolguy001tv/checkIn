var Controller = require('../controller');
var Database = require('../model/database');
var config = require('../config');
var map = require('../util/map');
var parse = require('co-body');
var fs = require('fs');
var path = require('path');

var Sync = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};
Sync.prototype = {
    register:function(){
        // 同步日期段内考勤的异常信息
        this.router.get('/sync/date/:start/:end', function *() {
            var params = this.params;
            var start = params.start || Date.now();
            var startDate = new Date();
            startDate.setTime(start);
            startDate.setHours(5);
            startDate.setMinutes(30);
            startDate.setSeconds(1);

            var end = params.end || Date.now() + 86400 * 1000;
            var endDate = new Date();
            endDate.setTime(end);
            endDate.setHours(5);
            endDate.setMinutes(30);
            endDate.setSeconds(1);

            this.type = Controller.getType('json');

            var db = new Database('sqlite');
            var rules = yield db.select('rules', ['*']);
            var users = yield db.select('users', ['*']);
            rules = rules.map(function(item) {
                item.rule = JSON.parse(item.rule);
                item.rule.error = eval(`(${item.rule.error})`);
                item.rule.extra = eval(`(${item.rule.extra})`);
                return item;
            });
            var rules = map(rules, 'id');

            var errors = [];
            var validated = [];
            for(var i=0;i<users.length;i++) {
                var user = users[i];

                // 查询当天该用户的记录
                var currents = yield db.select('checkins', ['*'], [
                    `time >= ${startDate.getTime()}`,
                    `time <= ${endDate.getTime()}`,
                    `validated=0`,
                    `userid=${user.id}`
                ], 'order by time desc');

                // 统一更新状态为已验证过
                validated = validate.concat(currents.map(function(item) {
                    return item.id;
                }));

                var rule = rules[user.ruleid];
                if(!rule) {
                    continue;
                }
                var late = rule.rule.error.call(null, currents.map(function(item) {
                    return item.time;
                }));

                console.log(late);
            }

            this.body = 'success';
        });

        // 同步考勤中的异常信息
        this.router.get('/sync/error', function *() {
            this.type = Controller.getType('json');

            var db = new Database('sqlite');
            var result = yield db.select('checkins', ['*'], ['validated=0']);
            var rules = yield db.select('rules', ['*']);
            rules = rules.map(function(item) {
                item.rule = JSON.parse(item.rule);
                item.rule.error = eval(`(${item.rule.error})`);
                item.rule.extra = eval(`(${item.rule.extra})`);
                return item;
            });

            var validated = [];
            var errors = [];
            var dateMap = {};
            var userIds = [];
            // 分隔到某一天
            result.forEach(function(item) {
                validated.push(item.id);

                var date = new Date();
                date.setTime(item.time);

                var day = new Date();
                day.setTime(item.time);

                if(date.getHours() <= 5 && date.getMinutes() <= 30) {
                    day.setTime(day.getTime() - 86400 * 1000);
                }
                day.setHours(5);
                day.setMinutes(30);
                day.setSeconds(1);

                if(!dateMap[item.userid]) {
                    userIds.push(item.userid);
                    dateMap[item.userid] = {};
                }
                if(!dateMap[item.userid][day.getTime()]) {
                    dateMap[item.userid][day.getTime()] = [];
                }
                dateMap[item.userid][day.getTime()].push(item);
            });

            // 获取单个用户的规则信息
            var users = yield db.select('users', ['*'], [`id in (${userIds.join(',')})`]);
            Object.keys(dateMap).forEach(function(userid) {
                var user = users.find(function(user) {
                    return user.id == userid;
                });
                var rule = rules.find(function(rule) {
                    return rule.id == user.ruleid;
                });
                var data = dateMap[userid];
                for(var key in data) {
                    var day = data[key];
                    day.sort(function(a, b) {
                        return a.time - b.time;
                    });
                    var timeList = day.map(function(item) {
                        return item.time;
                    });
                    var time = rule.rule.error.call(null, timeList);
                    if(time > 0) {
                        errors.push(day[0]);
                    }
                }
            });

            this.body = errors;
        });

        // 同步考勤中的加班信息
        this.router.get('/sync/extra', function *() {

        });
    }
};