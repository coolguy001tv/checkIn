## checkIn
checkIn Sys

*注意* 记得下载完Node_modules后务必参考[node-adodb issues](https://github.com/nuintun/node-adodb/issues/13)或按照下文进行源码修改:

手动修改 *adodb.js*：

    function str(key, holder) {
    ...
    switch (typeof value) {
        ...
        case 'date':
        return isFinite(value) ? value + 0 : null;
    ...
    }
    ...

如何运行：

* 执行npm run dev-static
* 执行npm run dev-server

