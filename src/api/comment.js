import request from './index.js'

// 添加评论
export function addComment (data) {
  return request({
    url: 'v1/comment/add_comment',
    data
  })
}

// 评论列表
export function getCommentList (data) {
  return request({
    url: 'v1/comment/comment_list',
    data
  })
}

// 删除评论
export function deleteComment (data) {
  return request({
    url: 'v1/comment/del_commet',
    data
  })
}
