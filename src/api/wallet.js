import request from './index.js'

// 获取资产列表
export function getWalletAssetList (data) {
  return request({
    url: 'v1/uwallet/wallet_fund_asset',
    data
  })
}

// 充币
export function getWalletDeposit (data) {
  return request({
    url: 'v1/uwallet/wallet_deposit',
    data
  })
}

// 获取可提现金额
export function getWalletAmount (data) {
  return request({
    url: 'v1/uwallet/wallet_withdraw_amount',
    data
  })
}

// 提币
export function getWalletWithdraw (data) {
  return request({
    url: 'v1/uwallet/wallet_withdraw',
    data
  })
}

// 充提币记录
export function getWalletRecord (data) {
  return request({
    url: 'v1/uwallet/wallet_record',
    data
  })
}
