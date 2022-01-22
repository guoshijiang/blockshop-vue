<template>
  <div class="publish-comment-container">
    <div class="publish-comment-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
    </div>
    <div class="publish-comment-right-container">
      <p class="name-box">评论</p>
      <div class="publish-comment-box">
        <el-input v-model="commentText" type="textarea" class="comment-input" resize="none" :maxlength="100" show-word-limit></el-input>
        <div class="rate-box-item">
          <p class="title">服务</p>
          <el-rate
            class="rate-box"
            v-model="Service_star"
            show-text
            :texts="texts"
            :colors="colors">
          </el-rate>
        </div>
        <div class="rate-box-item">
          <p class="title">质量</p>
          <el-rate
            class="rate-box"
            v-model="quality_star"
            show-text
            :texts="texts"
            :colors="colors">
          </el-rate>
        </div>
        <div class="rate-box-item">
          <p class="title">交易</p>
          <el-rate
            class="rate-box"
            v-model="trade_star"
            show-text
            :texts="texts"
            :colors="colors">
          </el-rate>
        </div>
        <el-button class="submit-btn" @click="addComment">评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import { addComment } from '@/api/comment.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'publishComment',
  components: { accountInfo },
  data () {
    return {
      commentText: '',
      quality_star: 0,
      trade_star: 0,
      Service_star: 0,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      texts: ['差评', '差评', '中评', '好评', '好评'],
      userId: +getUserId() || null
    }
  },
  mounted () {
    this.initBreadcrumb()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '发布评论' }
      ])
    },
    async addComment () {
      try {
        const params = {
          goods_id: +this.$route.query.goodsId,
          order_id: +this.$route.query.orderId,
          user_id: this.userId,
          merchant_id: +this.$route.query.merchantId,
          quality_star: this.quality_star,
          Service_star: this.Service_star,
          trade_star: this.trade_star,
          content: this.commentText
        }
        const res = await addComment(params)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          history.go(-1)
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
  .publish-comment-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .publish-comment-left-container{
      width: 380px;
      margin-bottom: 35px;
    }
    .publish-comment-right-container{
      width: 791px;
      .name-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-top: 10px;
        padding-bottom: 18px;
        border-bottom: 1px solid #F0F0F0;
      }
      .publish-comment-box{
        width: 100%;
        box-sizing: border-box;
        padding: 40px 35px;
        .comment-input{
          width: 400px;
        }
        ::v-deep .el-textarea__inner{
          width: 400px;
          height: 200px;
          background-color: #F5F5F5;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333;
        }
        .submit-btn{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 40px;
          background: #E12218;
          border-radius: 20px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #FFFFFF;
          margin-top: 70px;
        }
      }
    }
  }
  .rate-box-item{
    display: flex;
    align-items: center;
    margin-top: 30px;
    .title{
      margin-right: 20px;
    }
  }
</style>
