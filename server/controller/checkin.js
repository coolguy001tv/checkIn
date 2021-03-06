var Controller = require('../controller');
var parse = require('co-body');
var CheckinModel = require('../model/checkin');
var UserModel = require('../model/user');
var URL = require('../util/url');

var Checkin = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

Checkin.prototype = {
    register:function() {
        this.router.get('/checkin/list', function *() {
            this.type = Controller.getType('json');
            var url = new URL(this.request.url);

            var checkin = new CheckinModel();
            checkin.type = 'sqlite';
            var result = yield checkin.getList(url.getParams());
            if(result) {
                var user = new UserModel();
                var ids = result.list.map(function(item) {
                    return item.userid;
                });
                var users = yield user.getListByIds(ids);

                result.list = result.list.map(function(item) {
                    item.user = users.find(function(sub) {
                        return sub.id == item.userid;
                    });
                    return item;
                });

                this.body = Controller.format(result, 0, checkin.lang('SUCCESS'));
            }else {
                this.body = Controller.format(null, 1, checkin.lang('ERROR'));
            }
        })
    }
};