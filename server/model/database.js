var config = require('../config');
var ADODB = require('node-adodb');
var sqlite3 = require('sqlite3').verbose();

var Database = module.exports = function(type) {
    this.type = type || 'sqlite';

    if(this.type == 'sqlite') {
        this.conneciton = new sqlite3.Database(config.database.sqlite.path);
    }
    if(this.type == 'access') {
        this.connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+config.database.access.path+';');
    }
};

Database.prototype = {
    instance:function() {
        return this.connection;
    },
    selectPage:function(table, key, pageNum, pageSize, plus, where) {
        var extra = plus + ' limit ' + pageSize + ' offset ' + (pageNum - 1) * pageSize;
        return this.select(table, key, where, extra);
    },
    select:function(table, key, where, plus) {
        var sql = 'select ' + key.join(',') + ' from ' + table + (where ? " where " + where.join(' and ') : '') + ' ' + (plus || "");
        return this.query(sql);
    },
    total:function(table) {
        return this.query("select count(1) as total from " + table);
    },
    query:function *(sql) {
        if(type == 'sqlite') {
            return this.connection.all(sql);
        }
        if(type == 'access') {
            return this.conneciton.query(sql)
                .on('done', function(data) {

                })
                .on('fail', function(err) {
                    throw err;
                });
        }
    },
    update:function *(table, sets, where) {
        var sql = 'update ' + table + ' set ' + sets.join(',') + (where ? ' where ' + where.join(' and ') : '');
        if(type == 'sqlite') {
            return this.connection.run(sql);
        }
        if(type == 'access') {
            return this.query(sql);
        }
    },
    'delete':function *(table, where) {
        var sql = 'delete from ' + table + (where ? ' where ' + where.join(' and ') : '');
        if(type == 'sqlite') {
            return this.connection.run(sql);
        }
        if(type == 'access') {
            return this.query(sql);
        }
    }
};