require("../../css/login.scss");
import {History} from "react-router";
import API from "../common/api.jsx";
module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState:function() {
        return {
            notice:""
        };
    },
    render:function(){
        return (<div>
            <div className="login-center">
                <h1>考勤管理系统</h1>
                <div className="form-content">
                    <form onSubmit={this.loginFunc}>
                    <label>用户名</label>
                    <input ref="userName" type="text" />
                    <label>密码</label>
                    <input ref="passWord" type="password" />
                    <input type="submit" value="登录" />
                    <span className="notice red-color text-center">{this.state.notice}</span>
                    </form>
                </div>
            </div>
        </div>);
    },
    loginFunc:function(){
        var userName=this.refs.userName.value;
        var passWord=this.refs.passWord.value;
        var _this=this;
        if(userName && passWord){
            //发送协议
            var url=API.LOGIN;
            $.post(url,{name:userName,password:passWord},function(jsonData){
                if(jsonData.code === 0){
                    //sessionStorage 存储
                    var loginInfo= jsonData.data;
                    window.sessionStorage.setItem("loginInfo",JSON.stringify(loginInfo));
                    setTimeout(function() {
                        _this.context.router.push('/page/list');
                    }, 50);
                    return;
                }else{
                    _this.setState({
                        notice:jsonData.description
                    })
                }
            },"json")
        }else{
            this.setState({
                notice:"用户名和密码不能为空"
            })
        }
        return false;
    }
});