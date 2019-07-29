<template>
  <div class="cart-container">
    <div class="goodslist">
      <!--商品列表区域-->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodid="item.id"></numbox>
                <a href="#" class>删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--结算区域-->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">结算区域11</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/cart-numbox.vue";
export default {
  data() {
    return {
      goodslist: []
    }
  },
  created(){
      this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      //根据store里面的id，获取商品列表
      var idArr = [];
      this.$store.state.cart.forEach(element => {
        idArr.push(element.id);
      });

      if (idArr.length <= 0) {
        return;
      }
      //获取购物车商品列表
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    }
  },
  components: {
    numbox
  }
};
</script>
<style lang="scss" scoped>
.cart-container {
  background-color: #eee;
  overflow: hidden; //解决外边距塌陷
  .goodslist {
    .mui-card-content-inner {
      display: flex;
      align-items: center; //居中
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column; //改方向
      justify-content: space-between;
      p {
        display: flex;
        justify-content: space-between;
      }
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>
