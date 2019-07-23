<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time|dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!--调用html格式数据-->
        <div class="content" v-html="newsinfo.content"></div>
        <!--评论子组件区域 传id过去子组件 子组件要设置props-->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
//导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            newsinfo:{}//新闻对象
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){
            //获取新闻详情
            this.$http.get("api/getnew/"+this.id).then(result=>{
                if(result.body.status === 0){
                    //console.log(result)
                    this.newsinfo = result.body.message[0];
                }else{
                    Toast("获取新闻失败!")
                }
            })
        }
    },
    components:{//注册组件
        "comment-box":comment
    }
}
</script>
<style lang="less">//把scoped去掉是为了能让content 里面html正常显示
    .newsinfo-container{
        padding:0 4px;
        .title{
            font-size: 16px;
            color: red;
            margin:15px 0;
            text-align: center;//居中对齐
        }
        .subtitle{
            font-size:13px;
            color:#226aff;
            display: flex;
            justify-content:space-between;//两端对齐
        }
    }
</style>
