var express=require('express');
var router=express.Router();
// var static=require('../lib/static.js');
var mongoose=require('mongoose');
var svgCaptcha = require('svg-captcha');
var crypto=require('crypto');//密码加密
var User_m=require('../models/user.js');
var credentials=require('../credentials.js');
var emailService=require('../lib/email.js')(credentials);

var formidable=require('formidable');//上传文件插件
const AVATAR_UPLOAD_FOLDER='/avatar_2/';//定义一个常量
var fs=require('fs');

//GET home page
router.get('/',function (req,res,next) {
    //使用默认布局（main.hbs）
    res.render('index',{title:'Express'});//{title:'Express'}:上下文对象
});
// signup
router.get('/signup',function (req,res,next) {
    res.render('signup',{title:'signup'});
});
//contact us
router.get('/contact',function (req,res,next) {
    res.render('contact');
});
//about page
router.get('/about',function (req,res,next) {
    res.render('about');
});
//textform
router.get('/textform',function (req,res,next) {
    res.render('textform');
});
//customjs test
router.get('/customjs',function (req,res,next) {
    res.render('customjs');
});
//angular
router.get('/angular',function (req,res,next) {
    res.render('angular',{fromjs:'This is server JS'});
});
//user
router.get('/user',function (req,res,next) {
    res.render('user');
});
//list
router.get('/list',function (req,res,next) {
    res.render('list',{title:'users list'});
});
//login
router.post('/login',login);
function login(req,res,next) {
    User_m.find({username:req.body.username,hashed_password:hashPW(req.body.password)})
        .select('username age email')
        .exec(function (err,users) {
            var data={
                users:users.map(function (user) {
                    return {
                        _id:user._id,
                        name:user.username,
                        email:user.email,
                        age:user.age,
                    };
                })
            };
            if (data.users.length > 0){
                req.session.userSessionID=data.users[0]._id;
            };
            res.send(data);
        });
};

//captcha
router.get('/captcha',function (req,res,next) {
    var text = svgCaptcha.randomText();
    var captcha = svgCaptcha(text);
    req.session.captcha = text;

    res.set('Content-Type', 'image/svg+xml');
    res.status(200).send(captcha);
})
//singupapp.html/singup
router.post('/singup',function (req,res,next) {
    if(req.session.captcha.toLocaleLowerCase() !== req.body.captcha.toLocaleLowerCase()){
        var data={captchaErrorMsg:'请检查验证码是否正确！'};
        return res.send(data);
    }
    var user=new User_m({username:req.body.username});
    user.set('hashed_password',hashPW(req.body.password));//密码加密
    user.set('email',req.body.email);
    user.set('age',req.body.age);
    user.save(function (err) {//通过save方法保存到数据库
        if(err){
            req.session.error=err;
            console.log(err);
            return res.redirect('/user/signup');
        }else {
            console.log('======register-save======'+user.id+'==='+req.body.username+'==pwd=='+user.hashed_password);
            emailService.send(req.body.email,'Thank you for signup!','不要慌，我在上课练习');
            req.session.user=user.id;
            req.session.username=user.username;
            req.session.msg='Authenticated as'+user.username;
            return res.redirect('/user/userlist');
        };
    });
});
//密码加密
function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
};

//http-list
router.get('/http-list',function (req,res,next) {
        //查询全部记录
        User_m.find({},function (err,users) {
        //查询age="12"的记录
        //User_m.find().where('age').equals('12').exec(function(err,users){

        //查询age>10，从0开始的6条记录的username，age，email字段
        //User_m.find().where('age').gte(10).select('username age email').skip(0).limit(6).exec(function(err,users){

        //查询age=44，从0开始的3条记录的username，age，email字段
        //User_m.find({age:44}).select('username age email').skip(0).limit(3).exec(function(err,users){

        //查询所有记录的age和username字段
        //User_m.find({},{age:true, username:true},function (err,users) {

        //查询age=15的记录的age和username字段
        //User_m.find({age:15},{age:true, username:true},function (err,users) {

        //查询username=yzy的记录
        //User_m.find({username:'yzy'},function (err,users) {
        var data={
            users:users.map(function (user) {
                return {
                    _id:user._id,
                    name:user.username,
                    email:user.email,
                    age:user.age,
                };
            })
        };
        res.send(data);
    });
});
//deluser,删除数据库数据
router.get('/deluser',function (req,res,next) {
    var data={};
    User_m.remove().where('_id').equals(req.query.uid).exec(function (err,users) {
        if(err){
            data={msg:'删除Id：'+req.query.uid+' 失败!!!'};
        }else{
            data={msg:'删除Id：'+req.query.uid+' 成功!!!'};
            console.log('删除Id：'+req.query.uid+' 成功!!!');
        }
        return res.send(data);
    });
});
//userlistForm获取数据
router.get('/get-user-by-uid',function (req,res,next) {
    User_m.find().where('_id').equals(req.query.uid).exec(function (err,users) {
        var data={
            users:users.map(function (user) {
                return {
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    age:user.age,
                    gender:user.gender,
                    address:user.address,
                    phone:user.phone,
                };
            })
        };
        res.send(data);
    });
});
//userlistForm/updata修改保存数据库数据
router.post('/update-user',function (req,res,next) {
    var data={};
    User_m.update({_id:req.body.uid},
        {$set:{email:req.body.email,
            age:req.body.age,
            address:req.body.address,
            phone:req.body.phone,
            gender:req.body.gender,
            update:true}},
        {upsert:false,multi:true}).exec(function (err,users) {
            if(err){
                data={msg:'保存Id：'+req.body.uid+' 失败!!!'};
            }else{
                console.log('保存Id：'+req.body.uid+' 成功!!!');
                data={msg:'保存Id：'+req.body.uid+' 成功!!!'};
            }
            return res.send(data);
        });
});
//上传文件，图片
router.post('/photo/:year/:month/:timestr',function (req,res) {
    var form=new formidable.IncomingForm();
    form.encoding='utf-8';//设置编辑
    form.uploadDir='public'+AVATAR_UPLOAD_FOLDER;
    form.keepExtensions=true;//设置后缀
    form.parse(req,function (err,fields,files) {
        if(err) return res.redirect(404,'/errors/404');
        var extName='';//后缀名
        switch (files.photo.type){
            case 'image/pjpeg':
                extName='jpg';
                break;
            case 'image/jpeg':
                extName='jpg';
                break;
            case 'image/png':
                extName='png';
                break;
            case 'image/x-png':
                extName='png';
                break;
        }
        console.log(files);
        var newPath='public\\avatar_2\\'+req.params.timestr+'.'+extName;
        fs.renameSync(files.photo.path,newPath);//重置路径
        var imgpath='/avatar_2/'+req.params.timestr+'.'+extName;
        return res.redirect('/user/detail?imgpath='+imgpath);
    });
});
module.exports=router;