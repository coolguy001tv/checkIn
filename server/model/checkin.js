var Model = require('./model');

var Checkin = module.exports = function() {
    Model.call(this);
    this.type = 'access';
    this.table = ''
};

Checkin.prototype = {
    getList:function *(opts) {
        var pages = Object.assign({
            pageIndex:1,
            pageSize:10
        }, opts);

        var result = yield this.connection().selectPage('checkins', ['*'], pages.pageIndex, pages.pageSize, 'order by time desc')
        var total = yield this.connection().total('checkins');

        return {
            list:result,
            total:total
        };
    }
};

Checkin.getInstance = function() {
    var Clazz = this;
    return new Clazz();
};