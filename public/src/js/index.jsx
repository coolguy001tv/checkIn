/**
 * Created by CoolGuy on 2016/2/22.
 */
import { Router, Route, Link, hashHistory} from 'react-router';
import Layout from './common/layout.jsx';
import routes from './route.config.jsx';

function renderRoute(data, index) {
    return <Route {...data} key={index}>
        {(data.route || []).map(renderRoute)}
    </Route>;
}
var routeList = (
    <Router history={hashHistory}>
        {routes.map(renderRoute)}
    </Router>
);
ReactDOM.render(routeList, document.getElementById('wrapper'));