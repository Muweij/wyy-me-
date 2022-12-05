<template>
  <div>
  
    <van-search
    @input="inputFn()"
    v-model="value" placeholder="请输入搜索歌曲" shape="round" />
    <div class="search_wrap" v-if="musicList.length==0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap" >
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item " v-for="(item,index) in searchList" :key="index"
          @click="searchFn(item.first)"
          >{{item.first}}</span
        >
      </div>
      </div>
      <div v-else>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <!-- <van-cell :title="item.name"  v-for="item in musicList" :key="item.id" :label="item.ar[0].name+'-'+item.name">
       使用 right-icon 插槽来自定义右侧图标
        <template #right-icon>
        <van-icon name="play-circle-o" class="search-icon" />
         </template>
        </van-cell> -->
        <SongItemVue v-for="item in musicList" :key="item.id" :title="item.name"
 :label="(item.ar[0].name+'-'+item.name)"
 :id="item.id"
 ></SongItemVue>
        </van-list>
      </div>
      

  </div>
</template>

<script>
import { searchResult,searchResultList } from '@/api';
import SongItemVue from '@/components/SongItem.vue';
// import {searchResultList}

export default {
  components:{
    SongItemVue
  },
  data() {
    return {
      list: [],
      value: "", //搜索框绑定的
      searchList: [], //热搜关键词列表
      musicList: [], //搜索结果列表
      loading: false,
      finished: false,
      page: 1,
      timer:''
    };
  },
  methods:{
    async getDataList(){
      if (this.value.length == 0) {
        this.musicList = [];
        return;
      }
      //limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
      let obj = {
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      };
      //注意：getDataList只做请求数据用，不再操纵列表数据，接口返回的结果return出去。在哪调用的在哪处理列表数据
      return await searchResultList(obj);
      // this.musicList=res.data.result.songs
    },
    async searchFn(val){
      this.value = val;
      let res = await this.getDataList();
      this.musicList = res.data.result.songs
      // console.log(res)
    },
    async spanFn(val){
      this.page=1;
      this.finished=false;
      this.value=val
      let res =await this.getDataList()
      this.musicList=res.data.result.songs
    },
    inputFn(){
      //防抖
      if(this.timer) clearTimeout(this.timer)
       this.timer=setTimeout( async ()=>{
        this.page=1
        this.finished=false
        if(this.value.length==0){
        this.musicList=[]
        return
        }
        let res = await this.getDataList();
      this.musicList = res.data.result.songs;
      },2000)
      
    },
    async onLoad() {
      //逻辑
      //页面触底触发了onload事件
      //默认我们是加载了一页数据
      //触发了onload事件，我们就改加载下一页数据了
      this.page++;
      let res = await this.getDataList();
      //判断下一页还有没有数据，如果没数据finished置为true
      if (res.data.result.songs === undefined) {
        this.finished = true; //全部加载完成（list组件不会再触发onload事件）
        this.loading = false; //本次加载完成
        return;
      }
      //思考：新一页的数据，能直接赋值吗？
      //原因：如果赋值，新一页的数据会覆盖旧的数据
      //解决：拼接上前几页的旧数据
      this.musicList = [...this.musicList, ...res.data.result.songs];
      // 加载状态结束
      this.loading = false;
      console.log("页面触底了");
    }
  },
  async created(){
    let res=await searchResult()
    this.searchList=res.data.result.hots
    
  }
}
</script>

<style scoped>
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>