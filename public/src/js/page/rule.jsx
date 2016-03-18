import RUI from 'react-component-lib';
import API from "../common/api.jsx";
require("../../css/member.scss");

var OperationItemRender = React.createClass({
    setData:function(data) {
        this.setState(data);
    },
    onAddUser:function() {
        this.props.onAddUser && this.props.onAddUser(this.state);
    },
    onEditClass:function() {
        this.props.onEditClass && this.props.onEditClass(this.state);
    },
    render:function() {
        return <div>
            <RUI.Button className="primary margin-right-10" onClick={this.onAddUser}>添加成员</RUI.Button>
            <RUI.Button onClick={this.onEditClass}>编辑</RUI.Button>
        </div>;
    }
});

module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState:function(){
        return {
            sourceData:[],
            userList:[],
            pageData:{},
            checkedAll:false
        }

    },
    curClassObj:{},
    userList:[],
    submitList:[],
    componentDidMount:function(){
        this.getUserList();
        this.getClassList();
    },
    getUserList:function(){
        var url=API.GET_USER_List;
        var _this=this;
        this.userList=[];
        $.get(url,{},function(jsonData){
            if(jsonData.success){
                var data=jsonData.resultMap;
                var list=data || [];
                _this.userList=list;
            }else{
                RUI.DialogManager.alert(jsonData.description, '提示');
            }
        },"json")
    },
    getClassList:function(){
        $.get(API.GET_RULE_LIST,{},function(jsonData){
            if(jsonData.code === 0){
                var list = jsonData.data || [];
                this.setState({
                    sourceData:list
                });
            }else{
                RUI.DialogManager.alert(jsonData.description, '提示');
            }
        }.bind(this),"json")
    },
    addUserFunc:function(dataObj){
        this.curClassObj=dataObj;  //当前选中的班次
        this.refs.userName.value="";
        this.searchUser();
        this.refs.dialog.show()
    },
    editClassDetail:function(dataObj){
        this.context.router.push('/page/rule/add/' + dataObj.id);
    },
    addClass:function(){
        this.context.router.push('/page/rule/add');
    },
    searchList:[], //按条件搜索出的用户列表
    searchUser:function(){
        var keyWords=this.refs.userName.value;
        keyWords=$.trim(keyWords);
        this.searchList=[];
        var list=[];
        this.userList.forEach(function(item){
            var name=item.name;
            if(keyWords=="" || name.indexOf(keyWords)>=0){
                list.push($.extend({},item));
            }
        })
        this.searchList=list;
        var classId=this.curClassObj.id || 0;
        this.searchList.forEach(function(item){
            if(item.classes && item.classes==classId){
                item.checked=true;
                item.disabled=true;
            }else{
                item.checked=false;
                item.disabled=false;
            }
        })
        this.getUserByPageIndex(1);
    },
    getUserByPageIndex:function(index){
        var list=this.searchList;
        var pageSize=10;
        var totalNum=list.length || 1;
        var pageData={
            pageSize:pageSize,
            currentPage:index || 1,
            totalNum:totalNum
        }
        var startIndex=(index-1)*pageSize || 0;
        var arr=list.slice(startIndex,startIndex+pageSize);
        this.setState({
            userList:arr,
            pageData:pageData,
            checkedAll:false
        })
    },
    dialogSubmit:function(){
        var _this=this;
        var list=[];
        this.searchList.forEach(function(item){
            if(!item.disabled && item.checked){
                list.push(item.id)
            }
        })
        if(list.length<=0){
            return true;
        }
        var url=API.SET_CLASSES;
        $.post(url,{users:list,classId:this.curClassObj.id},function(jsonData){
            if(jsonData.success){
                _this.userList.forEach(function(item){
                    if($.inArray(item.id,list)>=0){
                        item.classes=_this.curClassObj.id;
                    }
                })
                _this.refs.dialog.hide();
            }else{
                RUI.DialogManager.alert(jsonData.description, '提示');
            }
        },"json")
        return false;
    },
    checkedAll:function(e){
        var selected=e.data.selected;
        var list=this.state.userList;
        var boolStr=selected?true:false;
        list.forEach(function(item){
            if(!item.disabled){
                item.checked=boolStr;
            }
        })
        this.setState({
            userList:list,
            checkedAll:boolStr
        })
    },
    checkedOne:function(e){
        var selected=e.data.selected;
        var userId=e.data.value;
        var list=this.state.userList;
        var boolStr=selected?true:false;
        var userObj=list.find(function(item){
            return item.id==userId;
        })
        userObj.checked=boolStr;
        if(!boolStr){
            this.setState({
                checkedAll:boolStr
            })
        }
    },
    render:function(){
        var _this=this;
        return (<div className='content'>
            <div className="content-title clearfix">
                <span className="site left"></span>
                <div className="special left">班次管理</div>
            </div>
            <div className='list-content'>
                <div>
                    <RUI.Button onClick={this.addClass}>新增班次</RUI.Button>
                </div>
                <div className="list-table clearfix">
                    <RUI.Table dataSource={this.state.sourceData}>
                        <RUI.Column title={"班次"} dataField={"name"} />
                        <RUI.Column title={"描述"} dataField={'description'} />
                        <RUI.Column title={"操作"}>
                            <RUI.Table.ItemRender>
                                <OperationItemRender onAddUser={this.addUserFunc} onEditClass={this.editClassDetail} />
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                    </RUI.Table>
                    <div className="no-data" style={{display:this.state.sourceData.length>0?"none":""}}>暂无数据~</div>
                </div>
            </div>
            <RUI.Dialog ref="dialog" title="选择员工" buttons="submit,cancel" onSubmit={this.dialogSubmit}>
                <div className="user-dialog clearfix">
                    <div>
                        <span>员工姓名：</span>
                        <input type="text" ref="userName" className="margin-right-20 rui-input" />
                        <RUI.Button className="primary" onClick={this.searchUser}>查询</RUI.Button>
                    </div>
                    <div className="margin-top-10 rui-table">
                        <ul className="width-25 rui-table-column" key={Math.random()}>
                            <li className="rui-table-title rui-table-column-item">
                                <RUI.Checkbox selected={this.state.checkedAll}  onChange={this.checkedAll} />
                            </li>
                            {
                                this.state.userList.map(function(item,index){
                                    return (<li className={(item.disabled?"li-disabled":"")+" rui-table-column-item "} key={index}>
                                        <RUI.Checkbox selected={item.checked} value={item.id} onChange={_this.checkedOne} disable={item.disabled} />
                                    </li>)
                                })
                            }
                        </ul>
                        <ul className="width-25 rui-table-column">
                            <li className="rui-table-title rui-table-column-item">
                                员工编号
                            </li>
                            {
                                this.state.userList.map(function(item){
                                    return (<li className={(item.disabled?"li-disabled":"")+" rui-table-column-item "}>
                                        {item.id}
                                    </li>)
                                })
                            }
                        </ul>
                        <ul className="width-25 rui-table-column">
                            <li className="rui-table-title rui-table-column-item">
                                姓名
                            </li>
                            {
                                this.state.userList.map(function(item){
                                    return (<li className={(item.disabled?"li-disabled":"")+" rui-table-column-item "}>
                                        {item.name}
                                    </li>)
                                })
                            }
                        </ul>
                        <ul className="width-25 rui-table-column">
                            <li className="rui-table-title rui-table-column-item">
                                所属部门
                            </li>
                            {
                                this.state.userList.map(function(item){
                                    return (<li className={(item.disabled?"li-disabled":"")+" rui-table-column-item "}>
                                        未知
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                    <div className="no-data" style={{display:this.state.userList.length>0?"none":""}}>暂无数据~</div>
                    <RUI.Pagination className="pager" {...this.state.pageData} onPage={this.getUserByPageIndex}  />
                </div>
            </RUI.Dialog>
        </div>)
    }
})