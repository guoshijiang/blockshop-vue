<template>
<div>
  <div class="top-btn-box">
    <el-button type="primary" @click="goForumPublish" class="bth" v-if="this.userInfo">发布帖子</el-button>
    <el-button type="primary" @click="goLogin" class="bth" v-else>登录以发布</el-button>
  </div>
  <div class="forum-container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
    <div
      class="forum-container-item"
      v-for="item in forumList"
      :key="item.id"
    >
      <div class="left-forum-box">
        <div class="icon"><i class="el-icon-chat-dot-round"></i></div>
        <div class="name-info-box">
          <p class="name"><router-link :to="{ path: '/forumChild', query: { id: item.id } }">{{ item.title }}</router-link></p>
          <p class="desc">{{ item.abstruct }}</p>
        </div>
      </div>
      <div class="right-forum-box">
        <div class="data-box">
          <p class="num">{{ item.theme_num }}</p>
          <p class="name">主题</p>
        </div>
        <div class="data-box">
          <p class="num">{{ item.topic_num }}</p>
          <p class="name">帖子</p>
        </div>
        <div class="span-line"></div>
        <div class="lately-box" v-if="item.lastest_form">
          <p class="time"><img :src="item.lastest_form.user_photo" alt="">{{ item.lastest_form.data_time }}</p>
          <div class="conversation-box">{{ item.lastest_form.lst_comment }}</div>
        </div>
      </div>
    </div>
    <p v-if="loading" class="hint-text">加载中...</p>
    <p v-if="noMore" class="hint-text">没有更多了</p>
  </div>
</div>
</template>

<script>
import bus from '@/bus'
import { getMainForumList } from '@/api/forum.js'
import { getUserId } from '@/utils/auth.js'
export default {
  name: 'Forum',
  data () {
    return {
      userId: +getUserId() || null,
      forumParams: {
        page: 1,
        page_size: 10,
        total: 0
      },
      forumList: [],
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.forumList.length >= +this.forumParams.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.initBreadcrumb()
    this.initForumList()
  },
  mounted () {
    if (this.userId) {
      this.getUserInfoFn(this.userId)
    }
  },
  methods: {
    goLogin () {
      this.$router.push({
        path: '/login/login'
      })
    },
    initBreadcrumb () {
      bus.$emit('breadcrumb', [{ name: '论坛主题' }])
    },
    goForumPublish () {
      this.$router.push({
        path: '/publishForum'
      })
    },
    async getMainForumList (params) {
      try {
        const res = await getMainForumList(params)
        if (+res.data.code === 2000) {
          const data = res.data.data
          this.forumList = [...this.forumList, ...data.form_lst]
          this.forumParams.total = data.total
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    initForumList () {
      this.getMainForumList(this.forumParams)
    },
    async load () {
      try {
        this.loading = true
        this.forumParams.page++
        await this.getMainForumList(this.forumParams)
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top-btn-box{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  .btn{
    background: linear-gradient(90deg, #008DFF, #0060FF);
    box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
  }
}
  .forum-container{
    width: 100%;
    height: 800px;
    overflow: auto;
    padding-bottom: 100px;
    .forum-container-item{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      margin-bottom: 20px;
      .left-forum-box{
        display: flex;
        width: 600px;
        .icon{
          background-color: #fda34b;
          color: #fff;
          font-size: 17px;
          line-height: 17px;
          padding: 13px;
          border-radius: 50%;
          margin-right: 15px;
          width: 46px;
          height: 46px;
          margin-top: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .name-info-box{
          .name{
            word-wrap: break-word;
            overflow: hidden;
            font-size: 18px;
            line-height: 22px;
            margin: 0;
            color: #337ab7;
            cursor: pointer;
          }
          .desc{
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            color: #777;
            margin-top: 5px;
            min-height: 25px;
          }
          .icon-list{
            display: flex;
            li{
              display: flex;
              align-items: center;
              margin-right: 5px;
              font-size: 12px;
              font-weight: 400;
              line-height: 16px;
              color: #777;
              margin-top: 5px;
              min-height: 25px;
              .icon-img{
                width: 23px;
                height: 23px;
                background-color: #7CAFC2;
                border-radius: 50%;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
              }
            }
          }
        }
      }
      .right-forum-box{
        width: 550px;
        display: flex;
        align-items: center;
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
        .span-line{
          width: 6px;
          height: 55px;
          background-color: #fda34b;
          margin: 0 40px;
        }
        .lately-box{
          width: 250px;
          .time{
            font-weight: 300;
            font-size: 12px;
            color: #999;
            display: flex;
            align-items: center;
            img{
              width: 24px;
              height: 24px;
              margin-right: 3px;
            }
          }
          .conversation-box{
            font-size: 12px;
            line-height: 14px;
            color: #333;
          }
        }
      }
    }
    .hint-text{
      width: 100%;
      font-size: 16px;
      line-height: 20px;
      color: #ccc;
      text-align: center;
    }
  }
</style>
