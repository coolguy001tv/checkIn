import {Link} from 'react-router';

module.exports = React.createClass({
    render:function() {
        return (
            <div className="wrapper">
                <div className="topbar">
                    This is Topbar content
                </div>
                <div ref={"content"} className="content">
                    {this.props.children || <Link to="/page">Test Link Jump</Link>}
                </div>
            </div>
        );
    }
});