/**
 * Created by CoolGuy on 2016/2/24.
 */
module.exports = function CheckInModel(obj){
    var opt = {
        name:obj.name || '',
        startTime:obj.startTime || '',
        endTime:obj.endTime || '',
        pageIndex:obj.pageIndex || 1,
        pageSize:obj.pageSize || 10
    };
    var getList = function(){
        
    };
    return {
        getList:getList
    }
};
