//入口文件
import Vue from 'vue'
//引入顶部插件
// import { Header, Swipe, SwipeItem,Button,Lazyload  } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//一次导入终身受用
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
//注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//调用本地存储把购物车的数据拿出来
var cart = JSON.parse(localStorage.getItem('cart') || '[]')
var store = new Vuex.Store({ //	//Vue.Stroe()首字母大写
    state: { //调用方法:this.$store.state.***
        cart: cart //购物车数组 {id,count,price,selected:flase}
    },
    mutations: { //调用方法:this.$store.commit('方法的名称','按需传递唯一的参数')
        addToCart(state, goodinfo) {
            var flag = false

            state.cart.some(item => {
                if (item.id == goodinfo.id) {
                    item.count += parseInt(goodinfo.count)
                    flag = true
                    return true
                }
            })

            if (!flag) {
                state.cart.push(goodinfo)
            }
            //把更新后的cart，存到本地
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateToCart(state, goodinfo) { //购物车页：更新购物车数量
            //更新cart
            state.cart.some(item => {
                if (item.id == goodinfo.id) {
                    item.count = parseInt(goodinfo.count)
                    return true
                }
            })
            //把更新后的cart，存到本地
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeToCart(state,id){
            //根据Id,删除store中那条商品数据
            state.cart.some((item,i)=>{
                if(item.id == id){
                    state.cart.splice(i,1)
                    return true;
                }
            })
            //把更新后的cart，存到本地
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateToGoodSelected(state,info){//把状态更新到本地model中
            state.cart.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            //把最新的 所有购物车商品的状态保存到store中去
            localStorage.setItem('cart',JSON.stringify(state.cart))
        }

    },
    getters: { //调用方法: $store.getters.***
        getAllCount(state) { //相当于计算属性，也相当于filters
            var c = 0;
            state.cart.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {//重新组合{88:88} 给numbox用
            var o = {}
            state.cart.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodSelected(state,id){//控制购物车单个商品是否选中 {99:flase} 
            var o ={}
            state.cart.forEach(item =>{
                o[item.id] = item.selected //自定义添加属性 selected
            })
            return o
        },
        getGoodsCountAndAmount(state){//计算购物车总价
            var o ={
                count:0,//勾选的数量
                total:0//勾选的总价
            }
            state.cart.forEach(item =>{
                if(item.selected){
                    o.count +=item.count,
                    o.total +=item.price * item.count
                }
            })
            return o
        }
    }
})

//引入样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//1.1 导入路由
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//1.3 导入自己的router.js路由模块
import router from './router.js'

//2.1 导入 vue-resource 
import VueResource from 'vue-resource'
//2.2 安装vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post时候表单数据格式
Vue.http.options.emulateJSON = true;
//定义全局的过滤器
//导入格式化时间的插件
import moment from 'moment'
////过滤时间
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

//导入图片查看器  安装npm i vue-preview -s
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入app组件
import app from './app.vue'
var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router, //1.4 把路由对象挂在VM实例上
    store //挂载状态管理对象
})