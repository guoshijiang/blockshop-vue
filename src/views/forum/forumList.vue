<template>
<div>
  <div class="btn-box" v-if="!this.userId">
    <el-button type="primary" @click="goLogin">登录以发表</el-button>
  </div>
  <div class="forum-list-container">
    <p class="title-box">有趣的文章</p>
    <div class="forum-child-box" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
      <div
        class="forum-container-item"
        v-for="item in forumModuleList"
        :key="item.form_id"
      >
        <div class="left-forum-box">
          <div class="icon"><i class="el-icon-chat-dot-round"></i></div>
          <div class="name-info-box list-box">
            <p class="name"><router-link :to="{ path: '/forumContent', query: { id: item.form_id } }">{{ item.title }}</router-link></p>
            <div class="keyword-box">
              ·<p>{{ item.data_time }}</p>·
              <p class="custom-name">{{ item.user_name }}</p>
            </div>
          </div>
        </div>
        <div class="right-forum-box">
          <div class="data-box">
            <p class="num">{{ item.likes }}</p>
            <p class="name">赞同</p>
          </div>
          <div class="data-box">
            <p class="num">{{ item.answers }}</p>
            <p class="name">评论</p>
          </div>
          <div class="data-box">
            <p class="num">{{ item.views }}</p>
            <p class="name">浏览</p>
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
</div>
</template>

<script>
import bus from '@/bus'
import { getChildModuleForumList } from '@/api/forum.js'
import { getUserId } from '@/utils/auth.js'
export default {
  name: 'ForumList',
  data () {
    return {
      userId: +getUserId() || null,
      forumParams: {
        level_cat_id: this.$route.query.id,
        page: 1,
        page_size: 10,
        total: 0
      },
      forumModuleList: [],
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.forumModuleList.length >= +this.forumParams.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.initBreadcrumb()
  },
  mounted () {
    if (this.userId) {
      this.getUserInfoFn(this.userId)
    }
    this.getChildModuleForumList()
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
    async getChildModuleForumList () {
      try {
        const res = await getChildModuleForumList(this.forumParams)
        if (+res.data.code === 2000) {
          const data = res.data.data
          if (data.form_lst) this.forumModuleList = [...this.forumModuleList, ...data.form_lst]
          this.forumParams.total = data.total
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    load () {
      this.loading = true
      this.forumParams.page++
      this.getChildModuleForumList()
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-box{
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .forum-list-container{
    width: 100%;
    .title-box{
      width: 100%;
      font-size: 14px;
      line-height: 20px;
      color: #777;
      padding: 10px;
    }
    .forum-child-box{
      width: 100%;
      height: 800px;
      overflow: auto;
      padding-bottom: 100px;
      .hint-text{
        width: 100%;
        font-size: 16px;
        line-height: 20px;
        color: #ccc;
        text-align: center;
      }
    }
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
          display: flex;
          align-items: center;
          &.list-box{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
          }
          .name{
            word-wrap: break-word;
            overflow: hidden;
            font-size: 18px;
            line-height: 22px;
            margin: 0;
            color: #337ab7;
            cursor: pointer;
          }
          .keyword-box{
            display: flex;
            font-size: 12px;
            line-height: 16px;
            color: #777;
            .keyword-icon{
              padding: 0 5px;
              background-color: #f5f5f5;
              color: #337ab7;
              margin-right: 5px;
            }
            .custom-name{
              color: #337ab7;
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
  }
</style>
