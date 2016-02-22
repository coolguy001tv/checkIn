import {Link} from 'react-router';

module.exports = React.createClass({
    render:function() {
        return <div>
            {this.props.children || (
                <div>
                    <span>This is a default page</span>
                    <Link to="/page/login">Jump to Login</Link>
                </div>
            )}
        </div>;
    }
});