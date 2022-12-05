<template>
  <div>
    <van-nav-bar :title="activeTitle" fixed/>
    <!-- <div>我是layout页面</div> -->
    <!-- <div>{{$route}}</div> -->
    <div class="main">
      <router-view />
    </div>
    
    <!-- 属性：route,是否开启路由模式 -->
    <van-tabbar route>
    <van-tabbar-item replace to='/layout/home' icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
  
</template>

<script>
//3、tabar组件的使用
//3.1找到vant的tabbar组件
//3.2找到tabbar组件的路由模式
//3.3修改复制过来的代码to改成我们自己的路由路径
//3.4配置二级路由的容器router-view

//4、标题栏的使用
//4.2删除组件没用的属性，只保留title
//4.4对activeTitle变量默认显示页面初始显示的标题
//思考：切换路由的时候，标题没变？
//4.5在watch里面侦听路由对象的变化，对activeTitle重新赋值
export default {
  data() {
    return {
      active: 0,
      activeTitle:this.$route.meta.title
    };
  },
  methods:{},
  watch:{
    $route(){
      this.activeTitle=this.$route.meta.title
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>