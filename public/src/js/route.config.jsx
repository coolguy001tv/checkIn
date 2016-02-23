import loader from './common/loader.jsx';

module.exports = [
    {
        path:'page',
        component:loader(require("./page/default.bundle.jsx")),
        route:[
            {
                path:'login',
                component:loader(require("./page/login.bundle.jsx")),
            }
        ]
    }
];