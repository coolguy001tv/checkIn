module.exports = {
    accessString:function(str) {
        return str ? str.split('\u0000')[0] : '';
    }
};