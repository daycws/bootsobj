//导入系统依赖模块
var express = require('express'),
//HTML5模式
    fs=require('fs'),
    url=require('url'),
    INDEX_HTML=fs.readFileSync(__dirname + '/public/index.html','utf-8'),
    ACCEPTABLE_URLS=['/user/signup','/user/login','/user/edit','/user/userlist','/user/forgetpwd','/user/detail'];
//实例化Express应用
var app = express();
//HTML5模式
app.use(function (req,res,next) {
    var parts=url.parse(req.url);
    var urlCounter=ACCEPTABLE_URLS.length;
    for(var i = 0; i < urlCounter; i++){
        if(parts.pathname.indexOf(ACCEPTABLE_URLS[i]) === 0 ){
            //当我们找到了一条匹配客户端页面路由中规则的配置时
            return res.send(200,INDEX_HTML);
        }
    }
    return next();
});


app.use(require('body-parser')());//解析请求主题
//mongoDB
var credentials=require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));//cookie:浏览器临时存储数据
app.use(require('express-session')());//
var emailService=require('./lib/email.js')(credentials);
//database configuration
var mongoose=require('mongoose');
var options={
    server:{
        socketOptions:{keepAlive:1}
        //keepAlive:保持服务器长时间链接
    }
};
switch (app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString,options);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString,options);
        break;
    default:
        throw new Error('Unknown execution environment:'+app.get('env'));
};


var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');


//设置handlebars 视图引擎及视图目录和视图文件扩展名
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main', // 设置默认布局为main
        extname: '.hbs', // 设置模板引擎文件后缀为.hbs
        //创建一个Handlebars 辅助函数，让它给出一个到静态资源的链接：
        helpers: {
            static: function(name) {
                return require('./lib/static.js').map(name);
            },
            section : function(name, options) {
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            },
        }
    });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'views'));
//Add Static Service
app.use(express.static(__dirname + '/public'));//静态资源
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//导入自定义模块（路由、模型、模式）
var routes_index = require('./routes/index');

// 设置端口号
app.set('port', process.env.PORT || 3005);
//中间件（局部文件）
app.use(function (req,res,next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.discountContext={
        locations:[{product:'book',price:'99.00'}]
    };
    next();
});

//设置路由
app.use('/', routes_index);

//定制404 页面
app.use(function(req, res){
    res.status(404);
    //不使用布局
    res.render('errors/404',{layout: null});//layout:null 不使用模板
});

// 定制500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    //使用指定布局
    res.render('errors/500',{layout: 'error',title:'This pang with error layout'});
});
//启动服务器
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});