<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goGoodDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button><!--plain留空白-->
    </div>
</template>
<script>
export default {
    data(){
        return{
           pageindex:1,//分页的页数
            goodslist:[]//存放商品列表的数组
        }
    },
    created(){
        this.getGoodsList();      
    },
    methods:{
        getGoodsList(){
            //获取商品列表
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then(result=>{
                if(result.body.status === 0){
                    //this.goodslist = result.body.message;
                     //改 当获取更多时 拼接新数据到旧数据后面
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){//加载更多
            this.pageindex++
            this.getGoodsList();
        },
        goGoodDetail(id){
            this.$router.push({name:"goodInfo",params:{id}})
        }
    }
}
</script>
<style lang="less" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;//设置换行
        padding: 5px;
        justify-content: space-between;
        .goods-item{
             margin: 3px 0;
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            padding: 2px;
            min-height: 293px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;//改成纵向布局 两端对齐
            img{
                width: 100%;//充满
            }
            .title{
                font-size: 14px;
                overflow: hidden;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding:5px;
                }
                .price{
                    .now{
                        font-size: 16px;
                        color: red;
                        font-weight: bold;
                    }
                    .old{
                        text-decoration: line-through;//划线
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>
