var Controller = module.exports = function(router) {
    this.router = router;
};

Controller.getType = function(type) {
    var mimeType = "text/html";
    switch(type.toLowerCase()) {
        case 'json':mimeType = 'application/json';break;
    }

    return mimeType;
};

Controller.format = function(data, code, message) {
    code = code || 0;
    message = message || 'success';
    return {
        code:code,
        message:message,
        data:data
    };
};