var register = new Vue({  // 注册组件
    el:"#register",
    data:{
        reg_message:{
            number:"",
            email:"",
            password:"",
            identify:""
        },
        count_down:undefined,
        subbtnClass:{
            "reg-subbtn btn btn-primary":true,
            "disabled_btn":false
        }
    },
    methods:{
        checked(){ // 用来检查表单完成情况
            var unfinished = "";
            for(key in this.reg_message){
                if(this.reg_message[key] == ""){
                    unfinished += key + " ";
                }
            }
            if(unfinished){
                alert("忘记填写" + unfinished + "了");
            }
        },
        countDown:function(){
            var reg= /\d+/g;
            var realNum = this.count_down.match(reg); //匹配打一个数组
            console.log(typeof realNum[0]);
            realNum = Number(realNum[0]);
            if(realNum == 0){
                clearInterval(int);
                this.subbtnClass.disabled_btn = false;
                this.count_down = ""
                
            } else {
                realNum--;
                this.count_down = "( " + realNum + " )";
            }
        },
        submit:function(){
            this.checked();
            if(this.subbtnClass.disabled_btn == false){
                this.$http.post("xxx.php",this.reg_message,{emulateJSON:true}).then(function(response){
                console.log("注册信息为：" + response.body);
                },function(){
                    console.log("注册请求失败");
                });
                this.count_down = "( 3 )";
                int = setInterval(this.countDown,1000);
                this.subbtnClass.disabled_btn = true;
            } else {
                return;
            }
            
        },
        confirmPassword:function(){
            var check = this.$refs.confirmPassword.value === this.reg_message.password ? true : false;
            if(check == false){
                console.log("两次输入的密码不一致");  // console改成DOM操作即可
            } else {
                console.log("验证密码成功");  // console改成DOM操作即可
            }
        }
    },
    mounted () {
        console.log("mounted！ from：v_homepage.js,component:register !");
        // console.log(this.$refs.reg_subbtn.className);
    }
});

var login = new Vue({
    el:"#login",
    data:{
        log_message:{
            number:"",
            password:"",
            identify:""
        },
        remember:false // 用于判断是否选择记住我，默认应该为false
    },
    methods:{
        checked(){ // 用来检查表单完成情况
            var unfinished = "";
            for(key in this.log_message){
                if(this.log_message[key] == ""){
                    unfinished += key + " ";
                }
            }
            if(unfinished){
                alert("忘记填写" + unfinished + "了");
            }
        },
        submit(){
            this.checked();
            this.rememberMe();
            this.$http.post("xxx.php",this.log_message,{emulateJSON:true}).then(function(response){
                console.log("登录信息为：" + response.body);
            },function(){
                console.log("登陆请求失败");
            });
            
        },
        /* 记住我发送Cookie */
        setCookie(name,value,expireDays){
            // "name=value; expires=GMTSting;
            var exdate = new Date();
            if(expireDays == null){
                document.cookie = name + "" + escape(value) + ";"
            } else {
                exdate.setDate(exdate.getDate() + expireDays);
                document.cookie = name + "=" + escape(value) + ";" + " " + "expires=" + exdate.toGMTString() + ";";
            }
        },
        getCookie(name){
            // "name=value; expires=GMTSting;
            if(document.cookie.length > 0){
                var cookie_list =  document.cookie;
                var start = cookie_list.indexOf(name);
                if(start != -1){
                    // "firetCookie=asd; firstCookie=sss"
                    var end = document.cookie.indexOf(";",start)
                    if(end == -1){
                        end = document.cookie.length;
                    }
                    // console.log("cookie的值为:" + cookie_list.substring(start,end));
                    return unescape(cookie_list.substring(start + name.length + 1,end)); // 进行解码，加1是因为还有=号
                } else {
                    console.log("没有相应name的cookie");
                    return false;
                };
            } else {
                console.log("没有任何的可使用的cookie");
                return false;
            }
        },
        delCookie(name){ // 删除Cookie
                var cval = this.getCookie(name);
                if(cval != false || cval == ""){
                    this.setCookie(name,cval,-1);
                } 
                return;
        },
        rememberMe(){ // 应该绑定在“登陆”按钮上，判断是否需要记住并发送cookie
            if(this.remember){
                var log_message_json = JSON.stringify(this.log_message);
                this.setCookie("logmessage",log_message_json,10);
            } else {
                this.delCookie("logmessage"); // 如果取消了记住我就不发送cookie同时删除之前的cookie
            }
        },
        useOldMessage(){
            if(this.getCookie("logmessage")){
                var obj_log_message = JSON.parse(this.getCookie("logmessage"));
                this.log_message.number = obj_log_message.number;
                this.log_message.password = obj_log_message.password;
            } else {
                return;
            }   
        },
    },
    mounted(){
        console.log("mounted！ from：v_homepage.js,component:login !");
        this.useOldMessage();
        
    }
});