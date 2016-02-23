/**
 * Created by CoolGuy on 2016/2/23.
 */
function User(username,password){
    var check = function(){
        return false;
    };
    return {
        check:check
    }
}

module.exports = User;