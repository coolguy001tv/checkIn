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
    /**
     * 针对该项目中的文件将不正常的编码转成正常的编码格式
     * 具体来说，对于3个字的，会去除掉最后的 ?盟；
     * 对于2个字的，会去除最后的盟
     * 该方法没有考虑带英文字的情况，如果遇到了需要重新考虑
     * words:string
     * return:string
     */
    ,setRightWords:function(words){
        var buf = new Buffer(words);
        //为了简化，并不判断字数
        //目前发现3个字时会添加如下的5个字符
        var index = buf.indexOf(new Buffer([0,0x3f,0xe7,0x9b,0x9f]));
        (index !== -1) && (buf = buf.slice(0,index));
        //2个字时添加以下4个字符
        index = buf.indexOf(new Buffer([0,0xe7,0x9b,0x9f]));
        (index !== -1) && (buf = buf.slice(0,index));
        var rightWords = buf.toString();
        //console.log(buf);
        return rightWords;
    }
};