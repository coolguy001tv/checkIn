var path = require('path');

var config = {
    entry:{
        index:"./public/src/js/index.jsx"
    },
    output:{
        path:"./public/",
        filename:'dist/[name].js',
        chunkFilename:'dist/[hash:8].chunk.js'
    },
    externals: [
        {
            "jquery": "jQuery",
            "react": "React",
            "react-dom": "ReactDOM",
            "zepto": "Zepto"
        },
        require('webpack-require-http')
    ],
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                loader:'babel'
            },
            {
                test:/\.(scss|sass)?$/,
                loader:'style!css!sass'
            },
            {
                test:/\.css?$/,
                loader:'style!css'
            },
            {
                test:/\.(jpg|png|gif|jpeg)?$/,
                loader:'url?limit=20480&name=dist/images/[name].[hash:8].[ext]'
            },
            {
                test:/\.(eot|woff(2)?|ttf|svg)?(@.+)*$/,
                loader:'url?limit=20480&name=dist/other/[name].[hash:8].[ext]'
            }
        ]
    }
};
module.exports = config;