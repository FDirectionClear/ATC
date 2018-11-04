new Vue({
    el:"#left",
    data:{
        avatar:"",
        nickname:"F.DirctionClear",
        manifesto:"我是一名二次元爱好者",
        manifestoText:""
    },
    methods:{
        updateMani(msg){
            // console.log("index接收到请请求");
            // console.log(msg);
            this.manifesto = msg;
        }
    },
    
});
