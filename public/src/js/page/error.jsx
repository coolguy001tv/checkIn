import RUI from 'react-component-lib';
require("../../css/error.scss");

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
    render:function(){
        return (<div className='content'>
            <div className="content-title clearfix">
                <span className="site left"></span>
                <div className="special left">异常记录</div>
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