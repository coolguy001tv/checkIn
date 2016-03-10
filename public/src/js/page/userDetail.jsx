import RUI from "react-component-lib";
import API from "../common/api.jsx";
import OperationItemRender from '../components/render/OperationItemRender.jsx';

module.exports=React.createClass({
    getInitialState:function() {
        return {
            user:{}
        };
    },
    componentDidMount:function() {
        $.ajax({
            url:"/kuser/detail/" + this.props.params.id,
            dataType:'json',
            success:function(response) {
                console.log(response);
            }
        });
    },
    render:function(){
        return (<div className='content'>
            <div className="content-title clearfix">
                <span className="site left"></span>
                <div className="special left">员工详情</div>
            </div>
            <div className='list-content'>
                <div className="list-table clearfix">

                </div>
            </div>
        </div>)
    }
})