## 注意事项

* 请不要在Promise对象中使用yield，node会在执行过程中出现不可知的问题导致程序不能正常跑完
* 后端通用返回码（返回字段时请考虑采用）：
    * J000000：处理成功
    * J000997：业务异常，它所对应的description，都可以向客户端展示
    * J000998：系统异常
    * J000999：系统错误
    