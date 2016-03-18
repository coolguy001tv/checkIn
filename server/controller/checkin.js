var Controller = require('../controller');
var parse = require('co-body');
var CheckinModel = require('../model/checkin');
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
            var result = yield checkin.getList();
            if(result && result.length) {
                this.body = Controller.format(result, 0, rule.lang('SUCCESS'));
            }else {
                this.body = Controller.format(null, 1, rule.lang('ERROR'));
            }
        })
    }
};