var Model = require('./model');

var Rule = module.exports = function() {
    Model.call(this);
    this.table = 'rules';
};

Rule.prototype = {
    getList:function *() {
        return yield this.connection().select(this.table, ['*']);
    }
};

Rule.getInstance = function() {
    var Clazz = this;
    return new Clazz();
};