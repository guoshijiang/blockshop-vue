<template>
  <div class="news-detail-container">
    <div class="news-detail-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="news-detail-right-container">
      <p class="title">{{ detail && detail.title }}</p>
      <div class="info-box">
        <div class="auth-info">
          <img :src="detail && detail.image" alt="favico">
          <p>{{ detail && detail.author }}</p>
        </div>
        <p>创建时间：{{ detail && detail.created_at }}</p>
        <p>创建时间：{{ detail && detail.updated_at }}</p>
        <p>阅读量：{{ detail && detail.views }}</p>
      </div>
      <div class="content-box" v-html="detail&&detail.content">
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getUserId } from '@/utils/auth.js'
import { getNewDetail } from '@/api/news.js'
import bus from '@/bus'
export default {
  name: 'newsDetail',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      userId: +getUserId() || null,
      detail: null
    }
  },
  mounted () {
    this.initBreadcrumb()
    this.getNewDetail()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '公告详情' }
      ])
    },
    async getNewDetail () {
      try {
        const params = {
          news_id: +this.$route.query.id
        }
        const res = await getNewDetail(params)
        if (+res.data.code === 2000) {
          this.detail = res.data.data
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
  .news-detail-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .news-detail-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .news-detail-right-container{
      width: 791px;
      margin-bottom: 30px;
      .title{
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 60px;
        margin-bottom: 20px;
      }
      .info-box{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        .auth-info{
          display: flex;
          align-items: center;
          img{
            width: 20px;
          }
          p{
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
      .content-box{
        padding-right: 30px;
        text-align: justify;
      }
    }
  }
</style>
