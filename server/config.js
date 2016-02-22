var process = require('process');

var config = {
    view:process.env.NODE_ENV == 'development' ? './view/common-debug.html' : './view/common.html',
    server:{
        port:process.env.NODE_ENV == 'development' ? 3000 : 80
    }
};

module.exports = config;