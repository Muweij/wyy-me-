import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/HomeIndex"
import Layout from "@/views/Layout/LayoutIndex"
import Play from "@/views/Play/PlayIndex"
import Search from "@/views/Search/SearchIndex"
//2.1全局注册路由组件
Vue.use(VueRouter)
//2.2创建路由和组件的匹配规则
const routes = [
    {
        path: '/',
        //项目启动默认打开的都是根路径，但是又想直接看到layout页面
        //直接重定向到layout
        redirect: '/layout'
    },
    {
        //layout页面作为一级路由来进行，首页和搜索两个页面的切换
        path: '/layout',
        component: Layout,
        //默认打开home页面
        redirect: '/layout/home',
        children: [
            {
                path: 'home',
                component: Home,
                meta:{
                    title:'首页'
                }
                
            },
            {
                path: 'search',
                component: Search,
                meta:{
                    title:'搜索'
                }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
]
// 2.3配置路由对象
const router=new VueRouter({
    routes
})
export default router