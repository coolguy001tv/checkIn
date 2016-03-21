module.exports = function(source, key) {
    var result = {};
    (source || []).forEach(function(item) {
        result[item[key]] = item;
    });

    return result;
}