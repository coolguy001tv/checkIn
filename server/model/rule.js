var Model = require('./model');

var Rule = module.exports = function() {
    Model.call(this);
    this.table = 'rules';
};

Rule.prototype = {
    id:0,
    name:'',
    description:'',
    rule:null,
    setData:function(data) {
        Object.keys(data).forEach(function(key) {
            this[key] = data[key];
        }.bind(this));

        return this;
    },
    getList:function *() {
        return yield this.connection().select(this.table, ['*']);
    },
    save:function *() {
        var result = null;
        if(this.id) {
            result = yield this.connection().update(this.table, [

            ], [
                'id=' + this.id
            ]);
        }else {
            result = yield this.connection().insert(this.table, [
                'name', 'description', 'rule'
            ], [
                `'${this.name}'`, `'${this.description}'`, `'${JSON.stringify(this.rule)}'`
            ]);
            this.id = result;
        }

        return this;
    },
    toJSON:function() {
        return {
            id:this.id,
            name:this.name,
            description:this.description,
            rule:this.rule
        };
    }
};

Rule.getInstance = function() {
    var Clazz = this;
    return new Clazz();
};