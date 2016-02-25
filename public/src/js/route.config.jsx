import loader from './common/loader.jsx';
import Layout from './common/layout.jsx';
import List from './page/list.jsx';
module.exports = [
    {
        // 带有公共模块的
        path:'page',
        component:Layout, //loader(require('./common/layout.jsx')),
        route:[{
            path:'list',
            component:require("./page/list.jsx")
        },{
            path:'member',
            component:require("./page/member.jsx")
        },{
            path:'user',
            component:require("./page/userList.jsx")
        }]
    },
    {
        path:'login',
        component:loader(require("./page/login.bundle.jsx"))
    },
    {
        path:"/",
        component:loader(require("./page/default.bundle.jsx"))
    }
];