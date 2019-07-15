//入口文件
import Vue from 'vue'
//引入顶部插件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
//引入样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//1.1 导入路由
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//1.3 导入自己的router.js路由模块
import router from './router.js'


//导入app组件
import app from './app.vue'
var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router //1.4 把路由对象挂在VM实例上
})