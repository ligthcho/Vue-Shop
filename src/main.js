//入口文件
import Vue from 'vue'
//引入顶部插件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import './lib/mui/css/mui.min.css'





//导入app组件
import app from './app.vue'
var vm = new Vue({
    el: "#app",
    render: c => c(app)
})