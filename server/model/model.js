var Database = require('./database');

var Model = module.exports = function() {
    var self = this;
    this.type = 'sqlite'; // sqlite or access
    this.table = ''; // database table;

    this.connection = function() {
        if(!this.db) {
            this.db = new Database(this.type);
        }
        return this.db;
    };

    this.lang = function(key) {
        return self.lang.data[key];
    };

    this.lang.data = {
        SUCCESS:'成功',
        ERROR:'失败'
    };

    this.lang.set = function(texts) {
        self.lang.data = Object.assign(self.lang.data, texts);
    };
};

Model.getInstance = function() {
    var Clazz = this;
    return new Clazz();
};