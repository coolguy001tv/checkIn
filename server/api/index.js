/**
 * Created by CoolGuy on 2016/2/22.
 */
var path = require('path');
module.exports = function(module,method){
    try {
        var m = require(("./"+module+".js"));
        console.log(method+"..............");
        if(m[method]){
            console.log(m[method]+"..............1");
            var result = m[method]();
            return result;
        }
        return '';

    }catch (e){
        console.log(e);
    }
};