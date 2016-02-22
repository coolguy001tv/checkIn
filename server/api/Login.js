/**
 * Created by CoolGuy on 2016/2/22.
 */
function Login(userName,password){
    var check = function(){
        console.log("check it");
        return {
            success:1
        };
    };

    return {
        check:check
    }
}
module.exports = Login;