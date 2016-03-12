var Database = require('./database');

var Model = module.exports = function() {
    this.type = 'sqlite'; // sqlite or access
    this.table = ''; // database table;
};

Model.prototype = {
    getConnection:function() {
        if(!this.db) {
            this.db = new Database(this.type);
        }
        return this.db;
    }
};

Model.getInstance = function() {
    var Clazz = this;
    return new Clazz();
};