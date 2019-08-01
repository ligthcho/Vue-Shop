import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodList from './components/goods/GoodList.vue'
import GoodInfo from './components/goods/GoodInfo.vue'
import GoodDesc from './components/goods/GoodDesc.vue'
import GoodComment from './components/goods/GoodComment.vue'
//创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        { path: '/', redirect: '/home' },
        { path:'/home',component:HomeContainer},
        { path:'/search',component:SearchContainer},
        { path:'/member',component:MemberContainer},
        { path:'/shopcart',component:ShopcartContainer},
        { path:'/home/newslist',component:NewsList},
        { path:'/home/newsinfo/:id',component:NewsInfo},
        { path:'/home/photolist',component:PhotoList},
        { path:'/home/photoinfo/:id',component:PhotoInfo},
        { path:'/home/goodlist',component:GoodList},
        { path:'/home/goodinfo/:id',component:GoodInfo,name:'goodInfo'},
        { path:'/home/gooddesc/:id',component:GoodDesc,name:'goodDesc'},
        { path:'/home/goodcomment/:id',component:GoodComment,name:'goodComment'}
    ],
    linkActiveClass:'mui-active' //覆盖默认路由高亮类，默认类叫router-link-active
})
export default router