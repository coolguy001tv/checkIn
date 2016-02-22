/**
 * Created by CoolGuy on 2016/2/22.
 */
var koa = require('koa');
var app = koa();

app.use(function *(){
    this.body = 'Hello World';
});
app.on('error', function(err){
    log.error('server error', err);
});
app.listen(3000);