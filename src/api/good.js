import request from './index.js'

// 商品查询条件
export function goodsQuery () {
  return request({
    url: 'v1/goods/goods_query_condition'
  })
}

// 商品列表
export function getGoodsList (data) {
  return request({
    url: 'v1/goods/goods_list',
    data
  })
}

// 商品详情
export function getGoodsDetail (data) {
  return request({
    url: 'v1/goods/goods_detail',
    data
  })
}

// 创建订单
export function createOrder (data) {
  return request({
    url: 'v1/order/create_order',
    data
  })
}

// 支付
export function payOrder (data) {
  return request({
    url: 'v1/order/pay_order',
    data
  })
}

// 获取订单列表
export function getOrderList (data) {
  return request({
    url: 'v1/order/order_list',
    data
  })
}

// 获取订单详情
export function getOrderDetail (data) {
  return request({
    url: 'v1/order/order_detail',
    data
  })
}

// 地址列表
export function getAddressList (data) {
  return request({
    url: 'v1/address/address_list',
    data
  })
}

// 添加地址
export function addAddress (data) {
  return request({
    url: 'v1/address/add_address',
    data
  })
}

// 删除地址
export function deleteAddress (data) {
  return request({
    url: 'v1/address/del_address',
    data
  })
}

// 修改地址
export function updateAddress (data) {
  return request({
    url: 'v1/address/upd_address',
    data
  })
}

// 确认收获
export function confirmGood (data) {
  return request({
    url: 'v1/order/confirm_revc_goods',
    data
  })
}

// 退换货申请
export function orderBack (data) {
  return request({
    url: 'v1/order/return_goods_order',
    data
  })
}

// 撤销退换货申请
export function cancleOrderBack (data) {
  return request({
    url: 'v1/order/cancle_return_goods_order',
    data
  })
}

// 添加退货快递
export function addShip (data) {
  return request({
    url: 'v1/order/return_ship_number',
    data
  })
}

// 订单申述
export function orderApproval (data) {
  return request({
    url: 'v1/order/return_goods_approval',
    data
  })
}
