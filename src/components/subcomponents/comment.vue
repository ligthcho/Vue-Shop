<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要杠的内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    <!--不能用i++ 用了就是给i赋值了-->
                    第{{i + 1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === ""?"此用户很懒，啥都没杠":item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button><!--plain留空白-->
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return {
            pageIndex:1,//默认展示第一页数据
            comments:[],//所有的评论数据
            msg:""//评论输入的内容
        };
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){//获取评论
            this.$http
            .get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
            .then(result=>{
                if(result.body.status === 0){
                //this.comments = result.body.message;
                //改 当获取更多时 拼接新数据到旧数据后面
                this.comments = this.comments.concat(result.body.message);
                //console.log(this.comments)
            }else{
                Toast("获取评论失败!");
            }})
        },
        getMore(){//加载更多
            this.pageIndex++
            this.getComments();
        },
        postComment(){//发表评论
            if(this.msg.trim().length == 0){
               return Toast('评论内容不能为空')
            }
            this.$http.post('api/postcomment/'+this.$route.params.id,{
                content:this.msg.trim()})
                .then(function(result){
                    if(result.body.status == 0){
                        //拼接出评论对象
                        var cmt = { 
                            user_name:'匿名用户',
                            add_time:Date.now(),
                            content:this.msg.trim()
                            };
                            this.comments.unshift(cmt);
                            this.msg = "";
                    }
                });
        }
    },
    props:['id']//父组件转id
}
</script>
<style lang="less" scoped>
    .cmt-container{
        h3{
            font-size: 13px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;//缩进
                }
            }
        }
    }
</style>
