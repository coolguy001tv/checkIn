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
                path:'rule',
                component:loader(require("bundle?lazy!./page/rule.jsx"))
            },
            {
                path:'rule/add',
                component:loader(require('bundle?lazy!./page/rule.add.jsx'))
            },
            {
                path:'rule/add/:id',
                component:loader(require('bundle?lazy!./page/rule.add.jsx'))
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