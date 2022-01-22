import request from './index.js'

// 获取新闻列表
export function getNewsList (data) {
  return request({
    url: 'v1/news/get_news_list',
    data
  })
}

// 获取新闻详情
export function getNewDetail (data) {
  return request({
    url: 'v1/news/news_detail',
    data
  })
}

// 商家屏蔽名单
export function getBlackList (data) {
  return request({
    url: 'v1/blacklist/get_blacklist_list',
    data
  })
}

// 加入屏蔽名单
export function addBlackList (data) {
  return request({
    url: 'v1/blacklist/add_blacklist',
    data
  })
}
// 移除屏蔽名单
export function removeBlackList (data) {
  return request({
    url: 'v1/blacklist/remove_blacklist',
    data
  })
}

// 收藏商品列表
export function getGoodsCollectList (data) {
  return request({
    url: 'v1/goods_collect/get_goods_collect_list',
    data
  })
}
// 添加商品列表
export function addGoodsCollect (data) {
  return request({
    url: 'v1/goods_collect/add_goods_collect',
    data
  })
}
// 移除商品列表
export function removeGoodsCollect (data) {
  return request({
    url: 'v1/goods_collect/remove_goods_collect',
    data
  })
}

// 收藏店铺列表
export function getMctCollectList (data) {
  return request({
    url: 'v1/marchant_collect/get_mct_collect_list',
    data
  })
}
// 添加店铺列表
export function addMctCollect (data) {
  return request({
    url: 'v1/marchant_collect/add_mct_collect',
    data
  })
}
// 移除店铺列表
export function removeMctCollect (data) {
  return request({
    url: 'v1/marchant_collect/remove_mct_collect',
    data
  })
}
