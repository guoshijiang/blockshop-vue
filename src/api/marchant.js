import request from './index.js'

// 获取商家列表
export function getMarchantList (data) {
  return request({
    url: 'v1/marchant/marchant_list',
    data
  })
}

// 获取店铺详情
export function getMarchantDetail (id) {
  return request({
    url: 'v1/marchant/marchant_detail',
    data: {
      merchant_id: id
    }
  })
}
