<template>
    <div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
              <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
		                    <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                            <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            lunbotuList:[]
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){//使用vue-resource前面不能带斜线
            this.$http.get("api/getlunbo").then(result =>{
                //console.log(result.body);
                if(result.body.status === 0){
                    this.lunbotuList = result.body.message;
                }else{
                    Toast('加载失败')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .mint-swipe{
        height:200px;
    }
    //交集选择器：获取的是同级中的某一个p.roe{   }两个选择器之间没有空格  &
    //后代选择器:获取的是父级下的所有子孙 .rod p{ } 两个选择器之间有一个空格 不加&   
    .mint-swipe-item{
        &:nth-child(1){
            background-color: red;
        }
        &:nth-child(2){
            background-color: blue;
        }
        img{
            width: 100%;
            height: 100%;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
        img{
            width: 60%;
            height: 60%;
        }
    }
</style>
