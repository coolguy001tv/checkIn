/**
 * Created by CoolGuy on 2016/2/26.
 */
var Controller = require('../controller');
var InitModel = require('../model/InitModel.js');
var parse = require('co-body');
var R = require('./../R.js');

var Init = module.exports = function(router) {
    Controller.call(this, router);
    this.register();
};
Init.prototype = {
    register:function(){
        //初始化专用，正常情况下不需要暴露出来
        this.router.get('/init',function(){
            this.type = 'application/json';
            InitModel().init();
            this.body = 'OK';

        });
    }
};