require("../../css/login.scss");
import {History} from "react-router";
module.exports = React.createClass({
    getInitialState:function() {
        return {
            notice:""
        };
    },
    render:function(){
        return (<div>
            <div className="login-center">
                <h1>神州通付---考勤管理系统</h1>
                <div className="form-content">
                    <label>用户名</label>
                    <input ref="userName" type="text" />
                    <label>密码</label>
                    <input ref="passWord" type="password" />
                    <input type="submit" value="登录" onClick={this.loginFunc}  />
                    <span className="notice red-color text-center">{this.state.notice}</span>
                </div>
            </div>
        </div>);
    },
    loginFunc:function(){
        var userName=this.refs.userName.value;
        var passWord=this.refs.passWord.value;
        if(userName && passWord){
            //发送协议
            console.log(this.props);
            this.props.history.pushState(null,'/page/list');
        }else{
            this.setState({
                notice:"用户名和密码不能为空"
            })
        }
    }
});