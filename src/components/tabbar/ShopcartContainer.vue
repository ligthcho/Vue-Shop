<template>
  <div class="cart-container">
    <div class="goodslist">
      <!--商品列表区域-->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodid="item.id"></numbox>
                <a href="#" @click.prevent="removeGood(i,item.id)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--结算区域-->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner total-count">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.total}}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
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
    },
    removeGood(index,id){
      //1.通过索引删除 组件中的商品 
      //2.同时需要删除并同步存在本地商品
      this.goodslist.splice(index,1);
      this.$store.commit('removeToCart',id)
    },
    selectedChanged(id,val){
      //每次点击开关，把最新的快关状态，同步到store中
      this.$store.commit("updateToGoodSelected",{id,selected:val})
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
    .total-count{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red{
        color: red;
        font-weight: bold;
        font-size: 13px;
      }
  }
  }
  
}
</style>
