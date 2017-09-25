var tbapp=angular.module('userTableApp',['ngTable']);
tbapp.component('userTable',{
    templateUrl:'template/user-table.component.hbs',
    controller:userTableController
});
userTableController.$inject=['NgTableParams'];
function userTableController(NgTableParams) {
    var data=[
        {
            "realName":"袁朝阳",                      //用户名
            "loginName":"785908907",                 //登录名
            "nicName":"木木夕",                     //昵称
            "gender":"1",                            //1：男， 0：女
            "birthday":"12.05",                      //生日
            "createTime":"1477561301180",            //创建时间(时间戳 Date.now())
            "title":"Web工程师",                     //职位
            "phone":"18380449935",                   //电话
            "address":"成都",                         //地址
            "email":"785908907@qq.com",              //email
            "entryTime":"1469007770599",             //入职时间(时间戳 Date.now())
            "department":"w1603",                    //部门
            "des":"这是袁朝阳的个人信息"              //描述
        },
        {
            "realName":"李小勇",
            "loginName":"940114239@qq.com",
            "nicName":"lyfer",
            "gender":"1",
            "birthday":"9/24",
            "age":"21",
            "createTime":"1477558132877",
            "title":"student",
            "phone":"18487114947",
            "QQ":"940114239",
            "address":"云南省昆明市",
            "email":"94011423@qq.com",
            "entryTime":"1477558132877",
            "department":"school",
            "bloodType":"A型",
            "description":"暂无"
        },
        {
            "realName":"汪斌",
            "loginName":736190433,
            "nicName":"Joyce Wang",
            "gender":1,
            "birthday":"04.01",
            "createTime":1477559460061,
            "title":"student",
            "phone":15775690702,
            "email":"736190433@qq.com",
            "address":"四川省蓬安县",
            "entry":"2016.07.20",
            "department":"开发部",
            "dec":"I am a students",
            "hobby":"reading"
        },
        {
            "realName": "王科龙",
            "loginName": "wkl",
            "nicName": "hahaha",
            "gender": "1",
            "birthday": "1995.1.15",
            "createTime":1477559460061,
            "title":"student",
            "phone": "188-2805-6273",
            "adress": "川A",
            "email": "764409244@qq.com"
        },
        {
            "realName":"鲜正权",                                          //真实姓名
            "userId":1,                                                   //唯一ID
            "userName":"Lunch",                                           //用户名
            "nicName":"Lunch",                                           //昵称
            "loginName":"545865468",                                      //登录名
            "gender":1,                                                   //1：男， 0：女
            "birthday":"1997-01-17",                                      //生日
            "createTime":1477556838857,                                   //创建时间(时间戳 Date.now())
            "title":"Web全栈工程师",                                      //职位
            "phone":13096190117,                                          //电话号码
            "address":"成都市高新区",                                     //地址
            "email":"545865468@qq.com",                                   //邮箱
            "entryTime":"2016-10-27",                                     //入职时间
            "department":"Web开发",                                       //部门
            "description":"不可描述",                                     //描述
            "love":"玩游戏，打代码",                                      //爱好
            "QQ":545865468                                                //qq号码
        },
        {
            "realName":"张晓炎",
            "loginName":"77874289",
            "nicName":"AiFengWu",
            "gender":"men",
            "birthday":"8/14",
            "createTime":"1477564772078",
            "title":"none",
            "phone":"1612345612",
            "address":"Mars",
            "email":"77874289@qq.com",
            "entryTime":"none",
            "department":"none",
            "des":"none"
        },
        {
            "realName":"李春梅",
            "loginName":"1056986909",
            "nicName":"专属幸福",
            "gender":"0",
            "birthday":"12,24",
            "createTime":"1247356800000",
            "title":"engineer",
            "phone":"18313939872",
            "address":"云南省昭通市",
            "email":"lichunmeilxf@16.com",
            "Entry":"14532480000",
            "department":"开发部门",
            "des":"简单就是快乐，简单就是幸福",
            "hoby":"乒乓球"
        },
        {
            "realName":"陆顺其",
            "loginName":"454757929",
            "nicName":"lsq",
            "gender":1,
            "birthday":"8.3",
            "createTime":1477568228459,
            "title":"Web Engineer",
            "phone":"18200401547",
            "email":"ggshun7@126.com",
            "address":"chengdu",
            "entertime":1477568339044,
            "department":"",
            "description":"personal message"
        },
        {
            "realName":"涂世银",
            "loginName":"GardnerTu",
            "nicName":"dragon' crow",
            "gender":"male",
            "title":"student",
            "department":"leading end",
            "entry time":"2016-7-20",
            "birthday":"1993-04-29",
            "phone":"18314119593",
            "email":"577436650@qq.com",
            "QQ":"577436650",
            "address":"incubation park",
            "description":"I'm a slow worker,but I never work backwords",
            "createTime":"2016-10-27"
        },
        {
            "realName":"魏瑞希", //真实姓名
            "loginName":"weiruixiup",  //登录名
            "nicName":"up", //昵称
            "gender":1, //性别：1为男士   2为女士
            "birthday":"2000-01-01", //出生日期      使用时间戳
            "createTime":"1477558392825",  //创建时间
            "title":"web前栈开发工程师", //职位描述
            "phone":"13990909990",  //电话号码
            "email":"123456@qq.com",  //电子邮箱
            "address":"成都高新区", //地址
            "entryTime":"2016-07-20",  //入职时间
            "department":"项目开发",  //所属部门
            "description":"负责前端工作的安排和代码的编写" //职位描述
        },
        {
            "realName": "胥驰",
            "loginName": "543182193",
            "nicName": "anoko",
            "gender": "1",
            "birthday": "8.7",
            "createTime": "1477567392741",
            "title": "engineer",
            "phone": "157XXXX1006",
            "address": "chendgu",
            "email": "543182193@qq.com",
            "hiredate": "2016-10-27",
            "department": "F.F.F",
            "description": "handsome"
        },
        {
            "realName":"蔡黎明",
            "loginName":"1401629898@qq.com",
            "nicName":"丑八怪",
            "gender":"1",
            "birthday":"8/3",
            "age":"22",
            "createTime":"1477558132877",
            "title":"student",
            "phone":"18687450949",
            "QQ":"1401629898",
            "address":"云南省曲靖市麒麟区",
            "email":"1401629898@qq.com",
            "entryTime":"1477558132877",
            "department":"school",
            "bloodType":"O型",
            "description":"暂无"
        },
        {
            "realName":"蒋鹏成",
            "loginName":"JungleBatMan",
            "nicName":"447494332",
            "gender":1,
            "birthday":"1994-10-01",
            "createTime":1400955894025,
            "title":"WEB Engineer",
            "phone":"18408282750",
            "email":"447494332@qq.com",
            "address":"ChengDu",
            "hireDate":1400955894025,
            "department":"VAMPIRE",
            "decription":"jungle's information",
            "hobbies":"fish"
        },
        {
            "realName": "李建文",
            "loginName": "568349804",
            "nicName": "卿成土",
            "gender": 1,
            "birthday": "1995-04-03",
            "createTime": 1477557726835,
            "title": "Developer",
            "phone": "15198903412",
            "email": "568349804@qq.com",
            "address": "Yunnan",
            "entryTime": 1477557726835,
            "department": "school",
            "description": "Smlion Li"
        },
        {
            "realName":"李雨晨",
            "loginName":"295196216",
            "nicName":"MajorKilling",
            "gender":1,
            "birthday":"9.10",
            "createTime":1400955893000,
            "title":"WEB Engineer",
            "phone":"15775691173",
            "email":"lkkchen@qq.com",
            "address":"chengdu",
            "entertime":1400955893000,
            "department":"S.H.E.I.L.D",
            "description":"阿晨的一些信息"
        },
        {
            "realName":"宁凯",
            "loginName":"982649299",
            "nicName":"|o寕*剀じせ",
            "gender":"1",
            "birthday":"09-25-1995",
            "createTime":"1477568047752",
            "title":"WEB Front End Engineer",
            "phone":"18883870816",
            "email":"98269299@qq.com",
            "address":"YiZhou road Ladd East Side 10th Floor, Chengdu China",
            "hiredata":"1477567647752",
            "department":"WEB Front End",
            "description":"WEB Front End Engineer"
        },
        {
            "realName":"蒲绍华",
            "loginName":"1129395026",
            "nicName":"Mr.Nobody",
            "gender":1,
            "birthday":"6/28",
            "createTime":1248051600000,
            "title":"Web前端开发工程师",
            "phone":"+8615281622157",
            "email":"1129395026@qq.com",
            "address":"四川省成都市高新区",
            "hireDate":1468976400000,
            "department":"前端开发部",
            "description":"This is Some Information about Shaohua Pu"
        },
        {
            "realName":"唐建",
            "loginName":"450543931",
            "nicName":"似水无痕",
            "gender":1,
            "birthday":"12/21/1988",
            "createTime":1477563330389,
            "title":"Web前端开发工程师",
            "phone":"18190334914",
            "email":"xgy_tangjian@163.com",
            "address":"成都市高新区",
            "entryTime":1477324800000,
            "department":"软件开发部",
            "description":"全栈开发工程师"
        },
        {
            "realName":"汪琪",
            "loginName":"491955882",
            "nicName":"唯一",
            "gender":"1",
            "birthday":"10.30",
            "registrationTime":"1121824800000",
            "title":"Web Engineer",
            "phone":"13540663106",
            "address":"成都高新区",
            "email":"491955882@qq.com",
            "createTime":1468980000000,
            "section":"Web",
            "describe":"汪琪的一些信息",
            "interest":"basketball",
            "QQ":"491955882"
        },
        {
            "realName":"王国栋",
            "loginName":"631362287",
            "nicName":"Mark",
            "gender":"1",
            "birthday":"1993-04-10",
            "createTime":1477568290735,
            "title":"designer",
            "phone":"18698427313",
            "adress":"成都",
            "email":"631362287@qq.com",
            "入职时间":"2016-10-27",
            "department":"web",
            "qq":"631362287",
            "description":"nice guy"
        },
        {
            "realName":"王帅",
            "loginName":875484737,
            "nicName":"越幸运&越努力",
            "gender":"1",
            "birthday":"3.30",
            "createTime":1477562400000,
            "title":"web工程师",
            "phone":18382196395,
            "email":"875484737@qq.com",
            "address":"成都",
            "entryTime":1469008800000,
            "department":"w1603",
            "des":"this is JSON"
        },
        {
            "realName": "肖康",
            "loginName": "Kerwin",
            "nicName": "Kerwin",
            "gender": 1,
            "birthday":"1996.11.25",
            "createTime":1477557317800,
            "title":"WEB前端工程师",
            "phone":17623202231,
            "address":"四川-成都",
            "email":"kerwin_work@163.com",
            "entryTime":"2016.07.20",
            "department":"w1603",
            "describe":"student",
            "QQ": 2077083
        },
        {
            "realName": "杨晓亮",
            "loginName": "937019931",
            "nicName": "丑九怪",
            "gender": 1,
            "birthday": "12/20",
            "createTime": 1477557828054,
            "title": "student",
            "phone": "18788054436",
            "address": "云南",
            "email": "937019931@qq.com",
            "entryTime": 1477557828054,
            "department": "school",
            "description": "暂无"
        }];
    this.tableParams=new NgTableParams({},{
        dataset:data
    });
};