<template>
    <div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
              <img :src="item.img" alt="" :class="{fullwidth:isFull}">
          </mt-swipe-item>
        </mt-swipe> 
    </div>
</template>
<script>
export default {
    data(){
        return {}
    },
    props:["lunbotuList","isFull"]
}
</script>
<style lang="less" scoped>
    .mint-swipe{
        height:200px;
    }
    //交集选择器：获取的是同级中的某一个p.roe{   }两个选择器之间没有空格  &
    //后代选择器:获取的是父级下的所有子孙 .rod p{ } 两个选择器之间有一个空格 不加&   
    .mint-swipe-item{
        // &:nth-child(1){
        //     background-color: red;
        // }
        // &:nth-child(2){
        //     background-color: blue;
        // }
        text-align: center;
        img{
            //width: 100%;
            height: 100%;
        }
        .mui-media-body{
            font-size: 13px;
        }
        .fullwidth{//解决轮播图宽度问题
            width: 100%;
        }
    }
</style>
