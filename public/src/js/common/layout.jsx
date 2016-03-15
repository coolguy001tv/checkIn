import {Link} from 'react-router';
import Navbar from "../components/navbar.jsx";
module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState:function(){
        return {
            userName:""
        }
    },
    componentDidMount:function(){
        var loginInfo=window.sessionStorage.getItem("loginInfo");
        if(loginInfo && JSON.parse(loginInfo).name){
            var userName=JSON.parse(loginInfo).name;
            this.setState({
                userName:userName
            })

        }else{
            this.context.router.push('/login');
        }
        $(".logout").hover(function(){
            $(this).addClass("logout-more");
            $(".out-span").fadeIn('slow')
        },function(){
            $(this).removeClass("logout-more");
            $(".out-span").hide();
        })
    },
    logOut:function(){
        //退出登录
        window.sessionStorage.removeItem("loginInfo");
        this.context.router.push('/login');
    },
    render:function() {
        return (
            <div className="wrapper">
                <div className="topbar">
                </div>
                <Navbar></Navbar>
                <div ref={"content"} className="main-content">
                    <div className="top-title clearfix">
                        <h3 className="left">考勤管理系统</h3>
                        <div className="right logout">
                            <span className="user-info">{this.state.userName}</span>
                            <div className="out-span" onClick={this.logOut}>退出</div>
                        </div>

                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});