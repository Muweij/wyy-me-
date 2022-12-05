<template>
  <div>
    <van-cell center :title="title" :label="label" :id="id">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template #right-icon>
    <van-icon name="play-circle-o" class="search-icon" @click="playFn()"/>
  </template>
</van-cell>
  </div>
</template>

<script>
export default {
props:{
    title:String,
    label:String,
    id:Number
},
methods:{
  playFn(){
    this.$router.push({
      path:'/play',
      query:{
        id:this.id
      }
    })
  }
}
}
</script>

<style>

</style>