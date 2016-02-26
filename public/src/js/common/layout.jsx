import {Link} from 'react-router';
import Navbar from "../components/navbar.jsx";
module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState:function(){
        return {
            userName:"admin"
        }
    },
    componentDidMount:function(){
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
                        <h3 className="left">神州通付-考勤管理系统</h3>
                        <div className="right logout">
                            <span className="user-info">{this.state.userName}</span>
                            <div className="out-span" onClick={this.logOut}>退出</div>
                        </div>

                    </div>
                    {this.props.children || <Link to="/">Test Link Jump</Link>}
                </div>
            </div>
        );
    }
});