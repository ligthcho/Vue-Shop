<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time|dateFormat}}</span>
            <span>点击:{{photoinfo.click}}次</span>
        </p>

        <hr>

        <!--缩略图区域-->
        <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100"
         @click="$preview.open(index, list)" :key="item.src"> -->
         <div class="thumbs">
             <vue-preview  :slides="list" @close="handleClose"></vue-preview>
         </div>
         
        <!--图片内容区域-->
        <div class="content" v-html="photoinfo.content"></div>

        <!--放置一个现成的评论子组件-->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>
<script>
import comment from "../subcomponents/comment.vue"
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoinfo:[],//图片详情
            list:[]//缩略图区域
        };
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){//获取图片的详情
            //获取图片的详情
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]
                }
            }) 
        },
        getThumbs(){//获取缩略图 方法： https://www.cnblogs.com/ldq678/p/10917355.html
            this.$http.get("api/getthumimages/"+this.id).then(result => {
                if(result.body.status === 0){
                    //循环每个图片数据,补全控件需要的属性
                    result.body.message.forEach(element => {
                        element.w = 600;
                        element.h = 400;
                        element.msrc = element.src;
                    });
                    this.list = result.body.message;
                }
            })
        },
        handleClose(){
        console.log('close event')
      }
    },
    components:{//注册 评论子组件
        'cmt-box':comment
    }
}
</script>
<style lang="less" scoped>
    .photoinfo-container{
        padding:3px;
        h3{
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;//两端对齐
        }
        .content{
            line-height: 30px;
            font-size: 13px;
        }
    }
</style>
<style lang="less">
//给缩略图设置样式 https://www.cnblogs.com/liyanyan665/p/11192637.html
        .thumbs {
        /deep/ .my-gallery {
        display: flex;
        flex-wrap: wrap;
        figure {
        width: 30%;
        margin: 5px;
        img {
        width: 100%;
        box-shadow: 0 0 8px #ccc;
        }
        }
        }
        }
</style>