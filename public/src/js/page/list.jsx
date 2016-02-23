import Navbar from '../components/navbar.jsx';
require("../../css/list.scss");
module.exports = React.createClass({
    render:function(){
        console.log("打卡记录");
        console.log("list",this.props);
        return (<div>打卡记录</div>);
    }
});