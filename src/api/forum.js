import request from './index.js'

// 获取父模块列表
export function getMainForumList (data) {
  return request({
    url: 'v1/forum/forum_main_topic_list',
    data
  })
}

// 获取子模块列表
export function getChildForumList (data) {
  return request({
    url: 'v1/forum/forum_child_topic_list',
    data
  })
}

// 获取子模块帖子列表
export function getChildModuleForumList (data) {
  return request({
    url: 'v1/forum/forum_topic_list',
    data
  })
}

// 获取帖子详情
export function getForumDetail (data) {
  return request({
    url: 'v1/forum/forum_topic_detail',
    data
  })
}

// 评论列表
export function commentForum (data) {
  return request({
    url: 'v1/forum/forum_topic_comment_list',
    data
  })
}

// 获取分类和主题名称
export function getFtcList (data) {
  return request({
    url: 'v1/forum/get_ftc_list',
    data
  })
}

// 发布帖子
export function createForum (data) {
  return request({
    url: 'v1/forum/create_forum_topic',
    data
  })
}

// 发布评论
export function createComment (data) {
  return request({
    url: 'v1/forum/forum_comment_reply',
    data
  })
}

// 上传图片接口 -- 用于富文本编辑器
export function uploadFile (data) {
  return request({
    url: 'v1/image/upload_file',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 点赞帖子
export function forumLike (data) {
  return request({
    url: 'v1/forum/forum_like',
    data
  })
}

// 点赞回复
export function replyLike (data) {
  return request({
    url: 'v1/forum/comment_reply_like',
    data
  })
}
