//入口文件
import Vue from 'vue'
//引入顶部插件
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
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
//导入app组件
import app from './app.vue'
var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router //1.4 把路由对象挂在VM实例上
})