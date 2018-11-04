

Vue.component("test1",{
    template:"<div class = 'component-test'>测试用组件1</div>"
});
Vue.component("test2",{
    template:"<div class = 'component-test'>测试用组件2</div>"
});

Vue.component("tag",{
    template:"#tag",
    props:{
        taglist:{
            type:Array
        },
    },
    data:function(){
        return {
            currentTagList:this.taglist,
            activeTitle:0  // ！！！ 如果改为其他值，即默认初始显示不是第一页，那么在样式特效行为上可能会出现崩坏，暂时不知解决方法以及崩坏原因。
        };
    },
    methods:{
        updateActive(index){
          this.activeTitle = index;
        },
        tabCls(index){
            return this.activeTitle == index;
        },
        tellIndex(){
            _this = this;
            var panelComps = this.$children.filter(function(pannel){
                return pannel.$options.name == "pannelText";
            });
            panelComps.forEach(function(pannel,index){           
                pannel.myIndex = index;
            });
        }
    },
    watch:{
        // activeTitle:function(){
            
        // }
    },
    mounted(){
        this.tellIndex();
    }
});

Vue.component("pannel",{
    name : "pannelText",
    template:"#pannel",
    props:{
        activePannel:{
            type:Number
        },
    },
    data:function(){
        return {
            currentActivePannel:this.activePannel,
            myIndex:"",
            show:"",
        };
    },
    methods:{
        
    },
    watch:{
        activePannel(){
            this.currentActivePannel = this.activePannel;
        },
        currentActivePannel(){
            /*当切换pannel时再次确认myIndex是否和currentActivePannel相等 */
            this.show = this.myIndex == this.currentActivePannel;
        },
        myIndex(){
            /* 主要用于初始化和改变顺序过程，因为在加载pannel组件期间，父元素还没有tellIndex(),所以myIndex和show都为空值，show会因此是true */
            this.show = this.myIndex == this.currentActivePannel;
        }
    },
    mounted:function(){
        // ... */
    }
});

Vue.component("classified",{
    template:"#classified",
    data:function(){
        return {
            items:[{
                data:"0505",
                imgSrc:["img/personalpage/yoom2.jpg","img/personalpage/yoom.jpg"], 
                title:"前端工程师面试成功",
                keyWords:["web前端","自定义","关键词","标签"],
                resume:"大家好，我想要成为一名优秀的前端工程师，因此我每天学习都很开心，所以我非常的喜欢魂魄妖梦，我非常喜欢妖梦。妖梦给了我很多的动力！我是从幻想万华镜中了解到妖梦的，之所以我喜欢，是因为他太萌了，蝴蝶结魅力十足，蝴蝶结赛高，裸腿赛高，波波头赛高！",
                type:"数学建模",
                num:"18843163425"
            },
            {
                data:"0606",
                imgSrc:["img/personalpage/yoom.jpg"],
                title:"数学建模国赛一等奖",
                keyWords:["国赛","数学建模","一等奖","激动"],
                resume:"历经了半个数十家的数学建模培训，虽然劳累，但是收获了国赛一等奖还是非常值得的。",
                type:"红色行动",
                num:"18845123698"
            }],
            the_user_opt : {
                the_user:the_user
            }
        };
    },
    methods:{
        getPersonalMessage(){
            this.$http.post("xxx.php",this.the_user_opt,{emulateJSON:true}).then(function(response){
                // this.items.push(JSON.parse(JSON.stringify(response.body)));
                // console.log(JSON.parse(JSON.stringify(response.body)));
                var _items = JSON.parse(JSON.stringify(response.body))
                for(var item in _items){
                    this.items.push(JSON.parse(JSON.stringify(response.body))[item]);
                }
            },function(){
                console.log("请求失败");
            });
        }
    },
    mounted(){
        this.getPersonalMessage();
    }
});



Vue.component("overview",{
    template:"#overview",
    data:function(){
        return {
            /*item中的信息应该来自于php，本组件向php发送Ajax请求*/
            items:[{
                    data:"0505",
                    imgSrc:["img/personalpage/yoom2.jpg"],
                    title:"前端工程师面试成功",
                    keyWords:["web前端","自定义","关键词","标签"],
                    resume:"大家好，我想要成为一名优秀的前端工程师，因此我每天学习都很开心，所以我非常的喜欢魂魄妖梦，我非常喜欢妖梦。妖梦给了我很多的动力！我是从幻想万华镜中了解到妖梦的，之所以我喜欢，是因为他太萌了，蝴蝶结魅力十足，蝴蝶结赛高，裸腿赛高，波波头赛高！",
                    type:"数学建模",
                    num:"18843163425"
                },
                {
                    data:"0606",
                    imgSrc:["img/personalpage/头像涅普.jpg"],
                    title:"数学建模国赛一等奖",
                    keyWords:["国赛","数学建模","一等奖","激动"],
                    resume:"历经了半个数十家的数学建模培训，虽然劳累，但是收获了国赛一等奖还是非常值得的。",
                    type:"红色行动",
                    num:"18845123698"
                }],
            the_user_opt : {
                the_user:the_user
            }
        };
    },
    methods:{
        getPersonalMessage(){
            this.$http.post("xxx.php",this.the_user_opt,{emulateJSON:true}).then(function(response){
                // this.items.push(JSON.parse(JSON.stringify(response.body)));
                console.log(JSON.parse(JSON.stringify(response.body)));
                var _items = JSON.parse(JSON.stringify(response.body))
                for(var item in _items){
                    this.items.push(JSON.parse(JSON.stringify(response.body))[item]);
                }
                
            },function(){
                console.log("请求失败");
            });
        }
    },
    mounted(){
        this.getPersonalMessage();
    }
        

    
});

new Vue({
    el:"#right",
    data:{
        tagList:["预览全部","我的成就"] // 这个未必用的上
    }
});

