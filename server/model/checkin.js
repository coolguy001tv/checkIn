var Model = require('./model');

var Checkin = module.exports = function() {
    Model.call(this);
    this.type = 'access';
    this.table = ''
};

Checkin.getInstance = function() {
    var Clazz = this;
    return new Clazz();
};