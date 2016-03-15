var Controller = require('../controller');
var Database = require('../model/database');
var UserModel = require('../model/user');
var config = require('../config');
var parse = require('co-body');
var path = require('path');

var User = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

User.prototype = {
    register:function(){
        // 同步考勤中的异常信息
        this.router.post('/user/login', function *() {
            this.type = Controller.getType('json');

            var post = yield parse.form(this);
            var user = UserModel.getInstance();
            var data = yield user.login(post);

            if(data) {
                this.body = Controller.format(data.toJSON(), 0, user.lang('SUCCESS'));
            }else {
                this.body = Controller.format(null, 1, user.lang('LOGIN_PASSWORD'));
            }
        });

        this.router.get('/user/list', function *() {

        });
    }
};