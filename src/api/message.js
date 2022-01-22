import request from './index.js'

// 提交反馈
export function createHelpDesk (data) {
  return request({
    url: 'v1/help_desk/create_help_desk',
    data
  })
}

export function getHdList (data) {
  return request({
    url: '/v1/help_desk/hd_list',
    data
  })
}

export function getHdDetail (data) {
  return request({
    url: 'v1/help_desk/hd_detail',
    data
  })
}

export function getQsList (data) {
  return request({
    url: 'v1/question/qs_list',
    data
  })
}

export function getQsDetail (data) {
  return request({
    url: '/v1/question/qs_detail',
    data
  })
}
