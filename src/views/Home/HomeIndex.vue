<template>
  <div>
    <div class="title">推荐歌单</div>
    <van-row gutter="6">
  <van-col span="8" v-for="item in list" :key="item.id">
    <van-image
  width="100%"
  height="3rem"
  :src="item.picUrl"
/>
<p class="song_name">{{item.name}}</p>
  </van-col>
</van-row>


<!-- 最新音乐 -->
<div class="title">最新音乐</div>
<!-- <van-cell title="歌曲名" value="内容"  label="描述信息" v-for="i in 10" :key="i" /> -->
 <SongItemVue v-for="item in musicList" :key="item.id" :title="item.name"
 :label="(item.song.artists[0].name+'-'+item.name)"
 :id="item.id"
 ></SongItemVue>
  </div>
</template>

<script>
import { homeMusic,newMusic } from '@/api'
import SongItemVue from '@/components/SongItem.vue';
// import {newMusic} from '@api'
export default {
  data(){
    return {
      list:[],
      musicList:[]
    }
  },
  components:{
    SongItemVue
  },
  //6、推荐歌单（先静后动）
  //6.1创建标题
  //6.2复制vant的栅格布局组件
  //6.3请求数据并渲染
  // 6.4 样式直接复制md笔记
  //补充（接口字段）；歌单封面；picUrl 歌单名name
 async created(){
  let {data}= await homeMusic({ limit: 6 });
  
  // console.log(res)
  this.list=data.result
  let res=await newMusic({ limit: 20 });
  this.musicList=res.data.result
  console.log(res)
}
}
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

</style>