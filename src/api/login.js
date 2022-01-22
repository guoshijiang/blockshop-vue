import request from './index.js'

// 注册接口
export function goRegister (data) {
  return request({
    url: 'v1/user/register',
    data
  })
}

// 登录接口
export function goLogin (data) {
  return request({
    url: 'v1/user/login',
    data
  })
}

// 是否开启双因子认证
export function changeClose2Fa (data) {
  return request({
    url: 'v1/user/open_close_2fa',
    data
  })
}

// 获取双因子认证
export function get2Fa (data) {
  return request({
    url: 'v1/user/get_2fa',
    data
  })
}

// 修改密码
export function updataPassword (data) {
  return request({
    url: 'v1/user/update_password',
    data
  })
}

// 修改pin码
export function updataPin (data) {
  return request({
    url: 'v1/user/update_pin_code',
    data
  })
}

// 重置密码
export function forgetPassword (data) {
  return request({
    url: 'v1/user/forget_pwd',
    data
  })
}

// 修改个人信息
export function updataUserInfo (data) {
  return request({
    url: 'v1/user/update_user_info',
    data
  })
}

// 获取个人信息
export function getUserInfo (id) {
  return request({
    url: 'v1/user/get_user_info',
    data: {
      user_id: id
    }
  })
}
