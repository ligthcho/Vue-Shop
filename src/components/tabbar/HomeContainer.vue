<template>
  <div>
    <swiper :lunbotuList="lunbotuList" :isFull="true"></swiper>
    <!--六宫格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodlist">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //使用vue-resource前面不能带斜线
      this.$http.get("api/getlunbo").then(result => {
        //console.log(result.body);
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message;
          this.lunbotuList.forEach((item,i) => {
            console.log(i)
            if(i==0)
                item.img = "http://img1.imgtn.bdimg.com/it/u=220853970,1880286793&fm=26&gp=0.jpg";
            else if(i == 1)
                item.img = "http://img5.imgtn.bdimg.com/it/u=3220585992,1098625497&fm=26&gp=0.jpg";
            else
                item.img = "http://img1.imgtn.bdimg.com/it/u=1494362931,2812054376&fm=26&gp=0.jpg";
          });
        } else {
          Toast("加载失败");
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
.mui-col-xs-4 {
  //修改iphone plus 底部显示问题
  width: 33.33333333%;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;

  img {
    width: 100%;
    // height: 60%;
  }
}
</style>
