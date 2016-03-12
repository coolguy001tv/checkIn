import {Link} from 'react-router';

module.exports = React.createClass({
    setData:function(data) {
        this.setState(data);
    },
    getInitialState:function() {
        return {};
    },
    getDefaultProps:function() {
        return {
            useDelete:false,
            useEdit:false,
            useDetail:true,
            formatLink:function(type, data) {
                return "";
            }
        };
    },
    render:function() {
        return <div>
            {this.props.useDetail && <Link to={this.props.formatLink('detail', this.state)}>查看</Link>}
            {this.props.useEdit && <Link to={this.props.formatLink('edit', this.state)}>编辑</Link>}
            {this.props.useDelete && <Link to={this.props.formatLink('delete', this.state)}>删除</Link>}
        </div>;
    }
})