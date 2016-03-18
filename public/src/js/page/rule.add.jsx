import RUI from 'react-component-lib';
import API from "../common/api.jsx";
import {Link} from "react-router";
require("../../css/member.scss");


module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    componentDidMount:function() {
        if(this.props.params.id) {
            $.get("/rule/detail", {
                id:this.props.params.id
            }, function(response) {
                if(response.code === 0) {
                    this.setState({
                        data:response.data
                    });
                }
            }.bind(this))
        }
    },
    getInitialState:function() {
        return {
            data:null
        };
    },
    save:function() {
        var data = {
            name:this.refs.name.state.value,
            description:this.refs.description.state.value,
            rule:{
                extra:this.refs.extraRule.state.value,
                error:this.refs.errorRule.state.value
            }
        };

        try {
            eval(`(${data.rule.extra})`);
            eval(`(${data.rule.error})`);
            if(this.state.data) {
                data.id = this.state.data.id;
            }

            data.rule = JSON.stringify(data.rule);
            $.post(API.ADD_RULE, data, function(response) {
                if(response.code === 0) {
                    RUI.DialogManager.alert('保存成功', '提示');
                    this.context.router.push('/page/rule');
                }
            }.bind(this));
        }catch(e) {
            RUI.DialogManager.alert('有语法错误');
        }
    },
    render:function(){
        var extraRuleProps = {
            style:{
                border:'1px solid #eceaea',width:'100%',height:240
            },
            ref:"extraRule"
        };
        var errorRuleProps = {
            style:{
                border:'1px solid #eceaea',width:'100%',height:240
            },
            ref:"errorRule"
        };
        if(this.state.data) {
            var func = JSON.parse(this.state.data.rule);
            extraRuleProps.value = func.extra;
            errorRuleProps.value = func.error;
        }
        return (
        <div>
            <div className='content'>
                <div className="content-title clearfix">
                    <span className="site left"></span>
                    <div className="special left">班次管理 - {this.state.data ? '编辑' : '新增'}班次</div>
                </div>
                <div className='list-content'>
                    <div className="list-table clearfix">
                        <div className="user-dialog clearfix">
                            <form id="addRuleForm">
                                <div>
                                    <span>班次名称：</span>
                                    <RUI.Input ref="name" value={this.state.data && this.state.data.name} />
                                </div>
                                <div style={{marginTop:10}}>
                                    <span>班次描述：</span>
                                    <RUI.Input ref="description" className="large" value={this.state.data && this.state.data.description} />
                                </div>
                                <div style={{marginTop:10}}>
                                    <span>加班规则：<span style={{fontSize:12,color:'#cacaca'}}>(请开发人员帮助填写)</span></span>
                                </div>
                                <div style={{marginTop:10}}>
                                    <RUI.Textarea {...extraRuleProps} />
                                </div>
                                <div style={{marginTop:10}}>
                                    <span>迟到规则：<span style={{fontSize:12,color:'#cacaca'}}>(请开发人员帮助填写)</span></span>
                                </div>
                                <div style={{marginTop:10}}>
                                    <RUI.Textarea {...errorRuleProps} />
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