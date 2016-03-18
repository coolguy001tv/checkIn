import RUI from 'react-component-lib';
import API from '../common/api.jsx';
require("../../css/list.scss");
module.exports = React.createClass({
    getInitialState:function(){
        return {
            sourceData:[],
            pageData:{
                pageSize:10,
                currentPage:1,
                totalNum:1
            }
        }
    },
    name:"",
    getName:function(e){
        this.name=e.target.value;
    },
    searchData:{
        name:"",
        startTime:"",  //  2015/1/20
        endTime:""
    },
    componentDidMount:function(){
        this.getDataList(1);
    },
    getDataList:function(pageIndex){
        var _this=this;
        var postData=_this.searchData;
        var pageSize=_this.state.pageData.pageSize;
        var url=API.GET_CHECKIN_LIST;
        postData.pageIndex=pageIndex || 1;
        postData.pageSize=pageSize;
        $.get(url,postData,function(jsonData){
            if(jsonData.success){
                var data=jsonData.resultMap;
                var totalNum=data.iTotalDisplayRecords || 0;
                var list=data.list || [];
                list.forEach(function(item,index){
                    item.index=(pageIndex-1)*pageSize+index+1;
                })
                _this.setState({
                    sourceData:list,
                    pageData:{
                        pageSize:pageSize,
                        currentPage:pageIndex,
                        totalNum:totalNum
                    }
                })

            }else{
                alert(jsonData.description)
            }
        },"json");

    },
    searchBtn:function(){
        var searchTime=this.refs.datePicker.getValue();
        var name=this.name;
        var startTime=this.getTime(searchTime.startValue),
            endTime=this.getTime(searchTime.endValue);
        this.searchData={
            name:name,
            startTime:startTime,  //  2015/1/20
            endTime:endTime
        }
        this.getDataList(1);
    },
    getTime:function(time){
        if(time){
            var date = new Date(time);
            var Y = date.getFullYear() ,
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ,
                D = date.getDate(),
                h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) ,
                m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()),
                s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
            return Y+"/"+M+"/"+D;
            //return Y+M+D+h+m+s;
        }
        return "";
    },
    exportBtn:function(){
        RUI.DialogManager.alert('暂不支持该功能', '提示');
    },
    render:function(){
        return (<div className='content'>
            <div className="content-title clearfix">
                <span className="site left"></span>
                <div className="special left">考勤记录</div>
            </div>
            <div className='list-content'>
                <div className="list-top clearfix">
                    <div className='params'>
                        <span>考勤日期：</span>
                        <RUI.DatePicker ref="datePicker" range={true} className="date-picker"/>
                    </div>
                    <div className='params'>
                        <span>姓名：</span>
                        <RUI.Input ref="name" onChange={this.getName} />
                    </div>
                    <div className="params">
                        <RUI.Button className="search-btn primary" onClick={this.searchBtn}>查询</RUI.Button>
                        <RUI.Button onClick={this.exportBtn}>导出</RUI.Button>
                    </div>
                </div>
                <div className="list-table clearfix">
                    <RUI.Table dataSource={this.state.sourceData}>
                        <RUI.Column title={"序号"} dataField={"index"}/>
                        <RUI.Column title={"日期"} dataField={"checkInDay"} />
                        <RUI.Column title={"姓名"} dataField={"name"} />
                        <RUI.Column title={"签到时间"} dataField={"checkInTime"} />
                        <RUI.Column title={"备注"} dataField={"note"} />
                    </RUI.Table>
                    <div className="no-data" style={{display:this.state.sourceData.length>0?"none":""}}>暂无数据~</div>
                    <RUI.Pagination {...this.state.pageData} className="pager" onPage={this.getDataList} />
                </div>
            </div>
        </div>);
    }
});