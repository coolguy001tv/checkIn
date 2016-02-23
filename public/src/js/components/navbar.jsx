import {Link, History} from 'react-router';
import RUI from "react-component-lib";
require("../../css/navbar.scss");
module.exports = React.createClass({
    render:function(){
        return (<div className="menu">
            <ul>
                <li><Link to="/page/list" activeClassName="active">考勤记录</Link></li>
                <li><Link to="/page/member" activeClassName="active">团队管理</Link></li>
            </ul>
        </div>);
    }
})
