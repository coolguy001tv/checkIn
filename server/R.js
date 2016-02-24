/**
 * Created by CoolGuy on 2016/2/24.
 * 用于处理最终的结果的格式
 */
module.exports = {
    set:function(success,msg,resultMap){
            return JSON.stringify({
                success:success,
                description:msg,
                resultMap:resultMap
            });
        }
    //根据错误码确定错误信息
    ,getMesssageByErrCode:function(errCode) {
        var msg = '';
        switch (errCode){
            case 'J000000':msg = '成功';break;
            default: msg = '失败';break;
        }
        return msg;
    }


};