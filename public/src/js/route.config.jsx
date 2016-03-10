import loader from './common/loader.jsx';
import Layout from './common/layout.jsx';
import List from './page/list.jsx';
module.exports = [
    {
        // 带有公共模块的
        path:'page',
        component:Layout, //loader(require('./common/layout.jsx')),
        route:[
            {
                path:'list',
                component:loader(require("bundle?lazy!./page/list.jsx"))
            },
            {
                path:'error',
                component:loader(require("bundle?lazy!./page/error.jsx"))
            },
            {
                path:'member',
                component:loader(require("bundle?lazy!./page/member.jsx"))
            },
            {
                path:'user',
                component:loader(require("bundle?lazy!./page/userList.jsx"))
            },
            {
                path:'user/:id',
                component:loader(require("bundle?lazy!./page/userDetail.jsx"))
            }
        ]
    },
    {
        path:'login',
        component:loader(require("./page/login.bundle.jsx"))
    },
    {
        path:"/",
        component:loader(require("./page/login.bundle.jsx"))
    }
];