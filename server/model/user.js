var Model = require('./model');
var parse = require('co-body');

var User = module.exports = function(data) {
    Model.call(this);

    this.table = 'users';
    this.lang.set({
        LOGIN_PASSWORD:'用户名密码错误'
    });

    data && this.setData(data);
};

User.getInstance = function() {
    var Clazz = this;
    return new Clazz();
};

User.prototype = {
    id:0,
    name:'',
    password:'',
    employid:0,
    lasttime:0,
    role:0,
    ruleid:0,

    setData:function(data) {
        Object.keys(data).forEach(function(key) {
            this[key] = data[key];
        }.bind(this));

        return this;
    },
    login:function *(data) {
        var db = this.connection();

        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        md5.update(data.password);
        var password = md5.digest('hex');

        var result = yield db.select(this.table, ['*'], ['name=\'' + data.name + '\'', 'password=\'' + password + '\'']);
        if(result && result.length) {
            return new User(result[0]);
        }else {
            return null;
        }
    },
    toJSON:function() {
        return {
            id:this.id,
            name:this.name,
            employid:this.employid,
            lasttime:this.lasttime || Date.now(),
            role:this.role,
            ruleid:this.ruleid
        };
    }
};