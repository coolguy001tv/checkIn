var process = require('process');
var path = require('path');

var config = {
    view:process.env.NODE_ENV == 'development' ? './view/common-debug.html' : './view/common.html',
    controller:'./controller',
    server:{
        port:process.env.NODE_ENV == 'development' ? 3000 : 80
    },
    database:{
        sqlite:{
            path:path.resolve(__dirname, './database/checkInSys.db'),
            init:path.resolve(__dirname, './database/sql/')
        },
        access:{
            path:path.resolve(__dirname, './database/att2000.mdb')
        }
    }
};

module.exports = config;