import RUI from "react-component-lib";
import API from "../common/api.jsx";
import OperationItemRender from '../components/render/OperationItemRender.jsx';

module.exports=React.createClass({
    getInitialState:function(){
        return {
            userList:[],
            pageData:{
                pageSize:10,
                currentPage:1,
                totalNum:1
            }
        }
    },
    userList:[],
    classList:[],
    componentDidMount:function(){
        this.getAllClasses()
    },
    getAllClasses:function(){
        var url=API.GET_ALL_CLASSES;
        var _this=this;
        $.get(url,{},function(jsonData){
            if(jsonData.success){
                var data=jsonData.resultMap || [];
                _this.classList=data;
                _this.getAllUser();
            }else{
                RUI.DialogManager.alert(jsonData.description, '提示');
            }
        },"json")
    },
    getAllUser:function(){
        var url=API.GET_USER_List;
        var _this=this;
        $.get(url,{},function(jsonData){
            if(jsonData.success){
                var data=jsonData.resultMap || [];
                data.forEach(function(item,index){
                    item['index']=index+1;
                    var className=_this.getClassNameById(item.classes);
                    item['className']=className
                })
                _this.userList=data;
                _this.getUserByPageIndex(1);
            }else{
                RUI.DialogManager.alert(jsonData.description, '提示');
            }
        },"json")
    },
    getClassNameById:function(id){
        var _this=this;
        var classObj=_this.classList.find(function(item){
            return item.id==id;
        })
        if(classObj){
            return classObj.className;
        }else{
            return "未知";
        }
    },
    getUserByPageIndex:function(index){
        var list=this.userList;
        var pageSize=this.state.pageData.pageSize,
            totalNum=list.length || 1;
        var pageData={
            pageSize:pageSize,
            currentPage:index || 1,
            totalNum:totalNum
        }
        var startIndex=(index-1)*pageSize || 0;
        var arr=list.slice(startIndex,startIndex+pageSize);
        this.setState({
            userList:arr,
            pageData:pageData
        })
    },
    formatLink:function(type, data){
        if(type == 'detail') {
            return '/page/user/' + data.id;
        }
    },
    render:function(){
        return (<div className='content'>
            <div className="content-title clearfix">
                <span className="site left"></span>
                <div className="special left">员工列表</div>
            </div>
            <div className='list-content'>
                <div className="list-table clearfix">
                    <RUI.Table dataSource={this.state.userList}>
                        <RUI.Column title={"ID号"} dataField={"id"} />
                        <RUI.Column title={"姓名"} dataField={"name"} />
                        <RUI.Column title={"班次"} dataField={'className'} />
                        <RUI.Column title={"部门"}>
                            <RUI.Table.ItemRender>
                                <span>未知</span>
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                        <RUI.Column title={"操作"}>
                            <RUI.Table.ItemRender>
                                <OperationItemRender formatLink={this.formatLink}/>
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                    </RUI.Table>
                    <div className="no-data" style={{display:this.state.userList.length>0?"none":""}}>暂无数据~</div>
                    <RUI.Pagination className="pager" {...this.state.pageData} onPage={this.getUserByPageIndex}  />
                </div>
            </div>
        </div>)
    }
})