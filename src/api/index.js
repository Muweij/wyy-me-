import request from "@/utils/request"

//请求推荐歌单的接口
//可选参数；limit:取出数量,默认30
//接口地址'/personalized'
//请求方式；get
export const homeMusic = (params)=>{
  return request({
    url:'/personalized',
    method:'get',
    params,
})
}
export const newMusic =(params)=>{
  return request({
    method:'get',
    url:'/personalized/newsong',
    params,
  })
}
export const searchResult =()=>{
  return request({
    method:'get',
    url:'/search/hot',
  })
}
export const searchResultList=(params)=>{
  return request({
    url:'/cloudsearch',
    params
  })
}
export const getSongByIdAPI = (id) => request({
  url: `/song/detail?ids=${id}`,
  method: "GET"
})

// 播放页 - 获取歌词
export const getLyricByIdAPI = (id) => request({
  url: `/lyric?id=${id}`,
  method: "GET"
})