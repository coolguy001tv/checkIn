通用协议字段
*description	Y	String	描述	响应描述(如果code= J000997,可以直接展示的异常信息)
* success	Y	bool	成功标志	true、false，本次是否成功
* resultMap	Y	String	自定义属性	Key-value方式的键值对，响应参数都从这里面取。视具体服务而定。

除非特殊说明，所有协议都应该同时支持以下2种方式，并且字段按照协议文档出现先后顺序来
* /user/login/admin/1234和
* /user/login {name:admin,password:1234}这两种格式

## 登录(新数据库)--实现
* 链接： /user/login
* 方式： POST
* 字段: 
    ```
    {
        name:"admin",//用户名
        password:"123456"//密码
    }
    ```
    
* 回调：
    ```
    {
        description:"",
        success:true,
        resultMap:""//resultMap始终为空
    }
    ```
    
## 获取考勤记录(老数据库)+新数据--老数据库实现
* 不支持方式1
* 链接： /get/checkIn
* 方式： GET
* 字段：
    ```
    {
        startTime:"",//起始时间，格式为2015/1/20，可以为空
        endTime:"",
        name:"",//可选，用户名
        pageIndex:1,//从1开始
        pageSize:10,//默认为10
    }
    ```
    
* 回调：
    ```
    {
        description:"",
        success:true,
        resultMap: {
            list: [{
                    name:"",
                    classes:1,//班次
                    checkInDay:"",//考勤所属的工作日（按照凌晨5点结算，也就是说，第二天5点之前都算前一个工作日
                    checkInTime:""//考勤日期 
            }]
        },
        iTotalDisplayRecords:100//查询结果总条数
    }
    ```
    
## 获取所有用户(老数据库)+新数据库--老数据库实现
* 链接： /get/allUsers
* 方式： GET
* 字段：
```
    {    
    }
```
* 回调：
    ```
    {
        description:"",
        success:true,
        resultMap:{
            list:[{
                id:"",
                name:"",
                classes:1,//班次ID (暂时没做)
            }]
        }
    }
    ```

## 获取所有班次(新数据库)--完成
* 链接： /get/allClasses
* 方式： GET
* 字段：
```
{
}
```
* 回调：
```
{
    description:"",
    success:true,
    resultMap:{
        list:[{
            id:1,
            className:"",//班次名
            classDescrip:"",//班次描述
            classRule:"",//班次规则(当前版本留空)
        }]
    }
}
```

## 设置班次（新数据库）--实现
* 链接： /set/class
* 方式： POST
* 字段
```
{
    users:[1,2,3,4],//用户ID数组
    classId:1,//设置的 班次ID
}
```
* 回调：
```
{
    description:"",
    success:true,
    resultMap:null
}
```


