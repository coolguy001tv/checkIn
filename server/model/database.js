var config = require('../config');
var ADODB = require('node-adodb');
var sqlite3 = require('sqlite3').verbose();

var Database = module.exports = function(type) {
    this.type = type || 'sqlite';

    if(this.type == 'sqlite') {
        this.connection = new sqlite3.Database(config.database.sqlite.path);
    }
    if(this.type == 'access') {
        this.connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+config.database.access.path+';');
    }
};

Database.prototype = {
    instance:function() {
        return this.connection;
    },
    selectPage:function *(table, key, pageNum, pageSize, plus, where) {
        var extra = plus + ' limit ' + pageSize + ' offset ' + (pageNum - 1) * pageSize;
        return yield this.select(table, key, where, extra);
    },
    select:function *(table, key, where, plus) {
        var sql = 'select ' + key.join(',') + ' from ' + table + (where ? " where " + where.join(' and ') : '') + ' ' + (plus || "");
        return yield this.query(sql);
    },
    total:function *(table) {
        return yield this.query("select count(1) as total from " + table);
    },
    query:function(sql) {
        var _this = this;
        this.stack(sql);
        if(_this.type == 'sqlite') {
            return new Promise(function(resolve) {
                _this.connection.all(sql, function(error, data) {
                    resolve(data);
                });
            });
        }
        if(_this.type == 'access') {
            return new Promise(function(resolve, reject) {
                _this.connection.query(sql)
                    .on('done', function(data) {
                        resolve(data);
                    })
                    .on('fail', function(err) {
                        reject(err);
                    });
            })
        }
    },
    insert:function *(table, keys, values) {
        var _this = this;
        var sql = 'insert into ' + table + '(' + keys.join(',') + ') values(' + values.join(',') + ')';
        this.stack(sql);
        if(_this.type == 'sqlite') {
            return new Promise(function(resolve) {
                _this.connection.run(sql, function(error, data) {
                    resolve(this.lastID);
                });
            });
        }
        if(_this.type == 'access') {
            return this.query(sql);
        }
    },
    update:function *(table, sets, where) {
        var _this = this;
        var sql = 'update ' + table + ' set ' + sets.join(',') + (where ? ' where ' + where.join(' and ') : '');
        this.stack(sql);
        if(_this.type == 'sqlite') {
            return new Promise(function(resolve) {
                _this.connection.run(sql, function(error, data) {
                    resolve(data);
                });
            });
        }
        if(_this.type == 'access') {
            return this.query(sql);
        }
    },
    'delete':function *(table, where) {
        var _this = this;
        var sql = 'delete from ' + table + (where ? ' where ' + where.join(' and ') : '');
        this.stack(sql);
        if(_this.type == 'sqlite') {
            return new Promise(function(resolve) {
                _this.connection.run(sql, function(error, data) {
                    resolve(data);
                });
            });
        }
        if(_this.type == 'access') {
            return this.query(sql);
        }
    },
    close:function() {
        if(this.type == 'sqlite') {
            this.connection.close();
        }
        if(this.type == 'access') {

        }
    },
    stack:function(message) {
        console.log(message);
        this.message = message;
    }
};