import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue'


//创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        { path:'/home',component:HomeContainer},
        { path:'/search',component:SearchContainer},
        { path:'/member',component:MemberContainer},
        { path:'/shopcart',component:ShopcartContainer}
    ],
    linkActiveClass:'mui-active' //覆盖默认路由高亮类，默认类叫router-link-active
})
export default router