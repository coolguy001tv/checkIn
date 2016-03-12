import {Link, History} from 'react-router';
import RUI from "react-component-lib";
require("../../css/navbar.scss");
module.exports = React.createClass({
    render:function(){
        return (<div className="menu">
            <ul>
                <li><Link to="/page/list" activeClassName="active">考勤记录</Link></li>
                <li><Link to="/page/error" activeClassName="active">异常记录</Link></li>
                <li><Link to="/page/report" activeClassName="active">报表统计</Link></li>
                <li><Link to="/page/member" activeClassName="active">班次管理</Link></li>
                <li><Link to="/page/user" activeClassName="active">员工列表</Link></li>
            </ul>
        </div>);
    }
})
