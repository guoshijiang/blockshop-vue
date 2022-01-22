import request from './index.js'

// 获取开通商家需要支付的费用
export function getOpenFee () {
  return request({
    url: 'v1/marchant/marchant_open_fee'
  })
}

// 设置商家信息
export function openMarchant (data) {
  return request({
    url: 'v1/marchant/open_marchant',
    data
  })
}

// 编辑商家信息
export function updateMarchant (data) {
  return request({
    url: 'v1/marchant/update_marchant',
    data
  })
}

// 获取商家详情
export function getMarchantDetail (merchantId) {
  return request({
    url: 'v1/marchant/marchant_detail',
    data: {
      merchant_id: merchantId
    }
  })
}

// 添加商品
export function addGood (data) {
  return request({
    url: 'v1/marchant/mct_add_goods',
    data
  })
}

// 编辑商品
export function updateGood (data) {
  return request({
    url: 'v1/marchant/mct_upd_goods',
    data
  })
}

// 删除商品
export function deleteGood (goodsId) {
  return request({
    url: 'v1/marchant/mct_del_goods',
    data: {
      goods_id: goodsId
    }
  })
}
// 发快递
export function addShipNumber (data) {
  return request({
    url: 'v1/marchant/add_order_ship_number',
    data
  })
}

// 商家同意或者拒绝退换货
export function acceptRejectReturn (data) {
  return request({
    url: 'v1/marchant/accept_reject_return',
    data
  })
}

// 商家确认退款
export function returnMoney (id) {
  return request({
    url: 'v1/marchant/return_money',
    data: {
      order_id: id
    }
  })
}
