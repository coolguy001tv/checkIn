/**
 * Created by CoolGuy on 2016/2/23.
 */
module.exports = {
    dbName:'checkInSys.db',
    accessDbName:'server/att2000.mdb',
    response:{
        SUCCESS:"J000000",
        FAIL:"J000997",//业务异常
        EXCEPTION:"J000998",//系统异常
        SYSTEM_ERROR:"J000999"//系统错误
    },
    //方便填充响应
    fillResponse:function(success,code,msg,data){
        return {
            success:success,
            code:code,
            msg:msg,
            data:data
        }
    }
}