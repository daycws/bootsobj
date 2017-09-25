angular.module('dateFormatApp',[])
    .controller('dateController',['$scope','$filter',function ($scope,$filter) {
        var self=this;//隔离作用域
        //获取当前时间戳三种方式
        // self.timestamp=Date.parse(new Date());
        // self.timestamp=(new Date()).valueOf();
        // self.timestamp=new Date().getTime();
        self.getShowDateStr=function (input) {
            self.out='';
            self.dateStr=input;//1479457833278
            //Y-M-D H:I:S
            self.Y=$filter('date')(self.dateStr,'yyyy');
            self.M=$filter('date')(self.dateStr,'MM');
            self.D=$filter('date')(self.dateStr,'dd');
            self.H=$filter('date')(self.dateStr,'HH');
            self.I=$filter('date')(self.dateStr,'mm');
            self.S=$filter('date')(self.dateStr,'ss');
            //获取当前时间
            var nowDate=new Date();
            self.nowDate=nowDate;
            //当前年
            var nowYear=nowDate.getFullYear();
            //当前月，记得加1
            var nowMonth=(nowDate.getMonth()+1);
            //当前日
            var nowDay=nowDate.getDate();
            //当前时
            var nowHour=nowDate.getHours();
            //判断时间
            if(self.Y != nowYear){
                self.out += self.Y+'-';
            }
            if(self.M != nowMonth || self.Y != nowYear && self.M == nowMonth){
                self.out += self.M+'-';
            }
            if(self.D != nowDay || self.M != nowMonth && self.D == nowDay || self.M == nowMonth && self.D == nowDay){
                self.out += self.D+' ';
            }
            self.out += self.H+':'+self.I;
            return self.out;
        };
    }]);