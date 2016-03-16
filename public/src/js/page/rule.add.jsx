import RUI from 'react-component-lib';
import API from "../common/api.jsx";
import {Link} from "react-router";
require("../../css/member.scss");


module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    save:function() {
        var data = {
            name:this.refs.name.state.value,
            description:this.refs.description.state.value,
            rule:{
                extra:this.refs.extraRule.value,
                error:this.refs.errorRule.value
            }
        };

        $.post(API.ADD_RULE, data, function(response) {
            if(response.code === 0) {

            }
        })
    },
    render:function(){
        return (
        <div>
            <div className='content'>
                <div className="content-title clearfix">
                    <span className="site left"></span>
                    <div className="special left">班次管理 - 新增班次</div>
                </div>
                <div className='list-content'>
                    <div className="list-table clearfix">
                        <div className="user-dialog clearfix">
                            <form id="addRuleForm">
                                <div>
                                    <span>班次名称：</span>
                                    <RUI.Input ref="name" />
                                </div>
                                <div style={{marginTop:10}}>
                                    <span>班次描述：</span>
                                    <RUI.Input ref="description" className="large" />
                                </div>
                                <div style={{marginTop:10}}>
                                    <span>加班规则：<span style={{fontSize:12,color:'#cacaca'}}>(请开发人员帮助填写)</span></span>
                                </div>
                                <div style={{marginTop:10}}>
                                    <textarea style={{border:'1px solid #eceaea',width:'100%',height:240}} ref="extraRule" />
                                </div>
                                <div style={{marginTop:10}}>
                                    <span>迟到规则：<span style={{fontSize:12,color:'#cacaca'}}>(请开发人员帮助填写)</span></span>
                                </div>
                                <div style={{marginTop:10}}>
                                    <textarea style={{border:'1px solid #eceaea',width:'100%',height:240}} ref="errorRule" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer js-footer">
                <div className="user-handle">
                    <Link to="/page/rule" className="rui-button">返回</Link>
                    <RUI.Button className="primary" style={{marginLeft:'10px'}} onClick={this.save}>保存</RUI.Button>
                </div>
            </div>
        </div>)
    }
})