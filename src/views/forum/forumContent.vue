<template>
  <div class="forum-content-container">
    <p class="article-name">{{ detail && detail.title }}</p>
    <div class="author-info">
      <div class="img-box"><img :src="detail&&detail.photo" alt=""></div>
      <div class="right-info">
        <p class="name">{{ detail&&detail.user_name }}</p>
        <!-- <p class="icon">管理员</p> -->
        <p class="time">{{ detail&&detail.datetime }}</p>
      </div>
    </div>
    <div class="article-content" v-html="detail&&detail.content"></div>
    <div class="login-box">
      <div class="like-box">
        <img @click="forumLike(detail.id, 0)" src="@/assets/images/fabulous.png" alt="">
        <!-- <img src="@/assets/images/fabulous_1.png" alt=""> -->
        <img @click="forumLike(detail.id, 1)" src="@/assets/images/setp.png" alt="">
        <!-- <img src="@/assets/images/setp_1.png" alt=""> -->
      </div>
      <div class="data-box">
        <p class="num">{{ detail && detail.likes }}</p>
        <p class="name">帖子</p>
      </div>
      <div class="data-box">
        <p class="num">{{ detail && detail.views }}</p>
        <p class="name">浏览</p>
      </div>
      <el-button type="primary" v-if="!this.userId" @click="goLogin">登录后回复</el-button>
      <el-button type="primary" v-if="this.userId&&!showMainPublish" @click="showMainPublish = true">评论</el-button>
      <el-button type="primary" v-if="this.userId&&showMainPublish" @click="showMainPublish = false">收起</el-button>
    </div>
    <div class="publish-box" v-if="showMainPublish">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        class="text-area"
        v-model="textarea">
      </el-input>
      <el-button class="publish-btn" type="primary" @click="handleCommentReply(1)">发布</el-button>
    </div>

    <div class="comment-list-box">
      <div
        class="comment-item"
        v-for="item in forumCommentList"
        :key="item.id"
      >
        <div class="top-comment">
          <div class="img-box"><img :src="item.user_photo" alt=""></div>
          <div class="right-info-box">
            <p class="name">{{ item.user_name }}<span>{{ item.datetime }}</span></p>
            <p class="content">{{ item.comment }}</p>
            <div class="reply-box">
              <div class="left" v-if="item.reply">
                <div class="small-img-box"><img :src="item.reply[item.reply.length-1].user_photo" alt=""></div>
                <span class="num">{{ item.reply.length }} 条回复</span>
                <span class="text">最后回复 {{ item.reply[item.reply.length-1].datetime }}</span>
                <i class="el-icon-arrow-right icon" v-if="!item.showChildList" @click="item.showChildList = true"></i>
                <i class="el-icon-arrow-down icon" v-else @click="item.showChildList = false"></i>
              </div>
              <div class="left" v-else></div>
              <div class="right">
                <img @click="replyLike(item.id, 0)" src="@/assets/images/fabulous.png" alt="">
                <!-- <img src="@/assets/images/fabulous_1.png" alt=""> -->
                <img @click="replyLike(item.id, 1)" src="@/assets/images/setp.png" alt="">
                <!-- <img src="@/assets/images/setp_1.png" alt=""> -->
                <el-button type="primary" size="mini" v-if="!userId" @click="goLogin">登录</el-button>
                <el-button type="primary" size="mini" v-else-if="!item.showTextBox" @click="item.showTextBox = true">回复</el-button>
                <el-button type="primary" size="mini" v-else @click="item.showTextBox = false">收起</el-button>
              </div>
            </div>
            <div class="reply-list" v-if="item.showChildList">
              <ul>
                <li
                  v-for="item2 in item.reply"
                  :key="item2.datetime"
                >
                  <div class="left-header-img"><img :src="item2.user_photo" alt=""></div>
                  <div class="right-reply-info-box">
                    <p><span class="name">{{ item2.user_name }}<span class="time">{{ item2.datetime }}</span></span></p>
                    <p class="reply-text">{{ item2.reply }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="text-area-box" v-if="item.showTextBox">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            class="text-area"
            v-model="item.textarea">
          </el-input>
          <el-button class="publish-btn" type="primary" @click="handleCommentReply(2, item)">回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus'
import { getForumDetail, commentForum, createComment, forumLike, replyLike } from '@/api/forum.js'
import { getUserId } from '@/utils/auth.js'
export default {
  name: 'ForumContent',
  data () {
    return {
      userId: +getUserId() || null,
      forumParams: {
        forum_id: +this.$route.query.id
      },
      forumCommentParams: {
        forum_id: +this.$route.query.id,
        page: 1,
        page_size: 10000,
        total: 0
      },
      forumModuleList: [],
      textarea: '',
      detail: null,
      showMainPublish: false,
      forumCommentList: []
    }
  },
  created () {
    this.initBreadcrumb()
  },
  mounted () {
    if (this.userId) {
      this.getUserInfoFn(this.userId)
    }
    this.getForumDetail()
    this.getCommentForum()
  },
  methods: {
    goLogin () {
      this.$router.push({
        path: '/login/login'
      })
    },
    initBreadcrumb () {
      bus.$emit('breadcrumb', [{ name: '论坛子板块' }])
    },
    async getForumDetail () {
      try {
        const res = await getForumDetail(this.forumParams)
        if (+res.data.code === 2000) {
          this.detail = res.data.data
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleCommentList (id) {
      try {
        console.log(id)
      } catch (e) {
        console.log(e)
      }
    },
    async handleCommentReply (type, obj) {
      try {
        let params = {}
        switch (type) {
          case 1:
            params = {
              forum_id: +this.$route.query.id,
              father_cmt_id: 0,
              ctm_reply: this.textarea
            }
            break
          case 2:
            params = {
              forum_id: +this.$route.query.id,
              father_cmt_id: obj.id,
              ctm_reply: obj.textarea
            }
            break
        }
        const res = await createComment(params)
        if (+res.data.code === 2000) {
          this.$message.success('评论成功')
          if (type === 1) this.textarea = ''
          if (type === 2) obj.textarea = ''
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getCommentForum () {
      try {
        const res = await commentForum(this.forumCommentParams)
        if (+res.data.code === 2000) {
          const data = res.data.data
          console.log(data)
          this.forumCommentList = data.form_lst.map(item => {
            item.showChildList = false
            item.showTextBox = false
            item.textarea = ''
            return item
          })
          this.forumCommentParams.total = data.total
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async forumLike (id, type) {
      try {
        const res = await forumLike({
          forum_id: id,
          is_like: type
        })
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async replyLike (id, type) {
      try {
        const res = await replyLike({
          cmt_reply_id: id,
          is_like: type
        })
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .forum-content-container{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    .article-name{
      word-wrap: break-word;
      font-size: 28px;
      color: inherit;
      line-height: 32px;
      overflow: hidden;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .author-info{
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      .img-box{
        height: 46px;
        margin-right: 10px;
        img{
          height: 46px;
        }
      }
      .right-info{
        display: flex;
        align-items: center;
        .name{
          font-size: 20px;
          line-height: 32px;
          color: #337ab7;
          margin-right: 10px;
        }
        .icon{
          font-size: 12px;
          color: #fff;
          padding: 2px 5px;
          background-color: #000;
          margin-right: 10px;
        }
        .time{
          font-size: 12px;
          line-height: 32px;
          color: #777;
        }
      }
    }
    .article-content{
      margin-top: 20px;
      font-size: 16px;
      line-height: 24px;
      color: #333;
      word-break: break-all;
      p{
        margin-bottom: 10px;
      }
      img{
        max-width: 100%;
        display: block;
        margin: 0 auto 10px;
      }
    }
    .login-box{
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .like-box{
        width: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img{
          cursor: pointer;
        }
      }
      .data-box{
        width: 80px;
        margin-right: 10px;
        .num{
          font-size: 20px;
          text-align: center;
          line-height: 22px;
        }
        .name{
          color: #777;
          font-weight: 300;
          font-size: 12px;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
    .publish-box{
      width: 100%;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      .text-area{
        width: 100%;
        margin-bottom: 20px;
      }
      .publish-btn{
        width: 200px;
        align-self: flex-end;
      }
    }
    .comment-list-box{
      width: 100%;
      border-top: 1px solid #eee;
      .comment-item{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        .top-comment{
          width: 100%;
          display: flex;
          .img-box{
            margin-right: 10px;
            img{
              width: 46px;
              height: 46px;
              border-radius: 50%;
            }
          }
          .right-info-box{
            width: 1120px;
            .name{
              font-size: 14px;
              color: #337ab7;
              margin-bottom: 10px;
              span{
                font-size: 12px;
                color: #777;
                margin-left: 5px;
              }
            }
            .content{
              font-size: 16px;
              line-height: 20px;
              color: #333;
            }
            .reply-box{
              margin-top: 20px;
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left{
                display: flex;
                align-items: center;
              }
              .right{
                display: flex;
                align-items: center;
                img{
                  width: 30px;
                  height: 30px;
                  margin-right: 15px;
                  cursor: pointer;
                }
              }
              .small-img-box{
                margin-right: 5px;
                img{
                  display: block;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                }
              }
              .num{
                font-size: 12px;
                color: #337ab7;
                margin-right: 5px;
              }
              .text{
                font-size: 12px;
                color: #333;
                margin-right: 5px;
              }
              .icon{
                font-size: 14px;
                color: #337ab7;
                cursor: pointer;
              }
            }
            .reply-list{
              display: flex;
              border-left: 5px solid #eee;
              padding-left: 60px;
              ul{
                li{
                  display: flex;
                  margin-bottom: 20px;
                  &:last-child{
                    margin-bottom: 0;
                  }
                }
              }
              .left-header-img{
                width: 46px;
                height: 46px;
                margin-right: 10px;
                img{
                  width: 46px;
                  height: 46px;
                  border-radius: 50%;
                }
              }
              .right-reply-info-box{
                .name{
                  font-size: 14px;
                  color: #337ab7;
                  margin-bottom: 15px;
                }
                .time{
                  font-size: 12px;
                  color: #777;
                  margin-left: 5px;
                }
                .reply-text{
                  font-size: 16px;
                  line-height: 20px;
                  color: #333;
                }
              }
            }
          }
        }
        .text-area-box{
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          .text-area{
            width: 100%;
            margin-bottom: 20px;
          }
          .publish-btn{
            width: 100px;
            align-self: flex-end;
          }
        }
      }
    }
  }
</style>
