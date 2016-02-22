var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var CommonsChunkPlugin = require(path.resolve(node_modules, 'webpack/lib/optimize/CommonsChunkPlugin'));
var react = path.resolve(node_modules, 'react/dict/react.js');
var project = require('./package.json');

var entries = require(path.resolve(__dirname, 'entry.config.js'));
var entries_key = Object.keys(entries);

var config = {
    entry:require(path.resolve(__dirname, 'entry.config.js')),
    output:{
        //publicPath:"http://dev.static0.berbon.com/"+project.name+"/",
        path:"./",
        filename:'dist/js/[name].js',
        chunkFilename:'dist/js/[hash:8].chunk.js'
    },
    externals: {
        "jquery": "jQuery",
        "react": "React",
        "react-dom": "ReactDOM",
        "zepto": "Zepto"
    },
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
        ],
        noParse:[react]
    },
    plugins:[
       /* new CommonsChunkPlugin({
            name:"common",
            filename:"dist/common.js",
            minChunks:3,
            chunks:entries_key
        })*/
    ]
};
module.exports = config;