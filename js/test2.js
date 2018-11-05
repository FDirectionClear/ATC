Vue.component("fang",{
    template:"#fang",
    props:{
        value:{
            type:String
        }
    },
    data:function(){
        return{currentValue:this.value};
    },
    methods:{
        update(){
            this.currentValue = this.currentValue + "哈哈";
            this.$emit("input",this.currentValue)
        }
    },
    watch:{
        value(){
            this.currentValue = this.value;
        }
    }
});

new Vue({
    el:"#app",
    data:{
        g:"方向明"
    },
    methods:{
        /* */
    }
});

