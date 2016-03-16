var Controller = require('../controller');
var RuleModel = require('../model/rule');
var parse = require('co-body');

var Rule = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};

Rule.prototype = {
    register:function() {
        this.router.get('/rule/list', function *() {
            this.type = Controller.getType('json');

            var rule = new RuleModel();
            var result = yield rule.getList();
            if(result) {
                this.body = Controller.format(result, 0, rule.lang('SUCCESS'));
            }else {
                this.body = Controller.format(null, 1, rule.lang('ERROR'));
            }
        })
    }
};