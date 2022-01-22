<template>
  <div class="order-admin-container">
    <div class="order-admin-left-container">
      <!-- 账户信息 -->
      <shop-info :detail="this.detail"></shop-info>
      <!-- 店铺成长 -->
      <shop-growth :detail="this.detail"></shop-growth>
    </div>
    <div class="order-admin-right-container">
      <p class="name-box">订单管理</p>
      <!-- 订单详情 -->
      <div class="order-detail">
        <div class="order-detail-item">
          <p class="title">全部</p>
          <p class="date"><router-link to="/allOrder">{{ detail && detail.order_stat.waid_pay_order_num }}</router-link></p>
        </div>
        <div class="order-detail-item">
          <p class="title">待发货</p>
          <p class="date"><router-link to="/waitDeliver">{{ detail && detail.order_stat.wait_send_order_num }}</router-link></p>
        </div>
        <div class="order-detail-item">
          <p class="title">已发货</p>
          <p class="date"><router-link to="/deliver">{{ detail && detail.order_stat.send_order_num }}</router-link></p>
        </div>
        <div class="order-detail-item">
          <p class="title">待处理</p>
          <p class="date"><router-link to="/waitHandle">{{ detail && detail.order_stat.wait_return_order_num }}</router-link></p>
        </div>
        <div class="order-detail-item">
          <p class="title">待退款</p>
          <p class="date"><router-link to="/waitBack">{{ detail && detail.order_stat.wait_return_order_num }}</router-link></p>
        </div>
        <div class="order-detail-item">
          <p class="title">已完成</p>
          <p class="date"><router-link to="/completeOrder">{{ detail && detail.order_stat.wait_return_order_num }}</router-link></p>
        </div>
      </div>
      <!-- 买家反馈 -->
      <div class="buyer-box">
        <div class="title-box">
          <p class="title">买家反馈</p>
          <p class="more"><router-link :to="{ path: '/buyerFeedback', query: {id: this.userInfo&&this.userInfo.mct_id} }">更多</router-link></p>
        </div>
        <ul class="feedback-box">
          <li class="title">
            <div></div>
            <p>质量</p>
            <p>服务</p>
            <p>交易</p>
          </li>
          <li>
            <div><img src="@/assets/images/goodh.png" alt="goodh">好评</div>
            <p>{{ detail && detail.comment_stat.quality_best }}</p>
            <p>{{ detail && detail.comment_stat.serice_best }}</p>
            <p>{{ detail && detail.comment_stat.trade_best }}</p>
          </li>
          <li>
            <div><img src="@/assets/images/zhongping.png" alt="zhongping">中评</div>
            <p>{{ detail && detail.comment_stat.quality_good }}</p>
            <p>{{ detail && detail.comment_stat.service_good }}</p>
            <p>{{ detail && detail.comment_stat.trade_good }}</p>
          </li>
          <li>
            <div><img src="@/assets/images/chaping-xuanzhong.png" alt="chaping-xuanzhong">差评</div>
            <p>{{ detail && detail.comment_stat.quality_bad }}</p>
            <p>{{ detail && detail.comment_stat.service_bad }}</p>
            <p>{{ detail && detail.comment_stat.trade_bad }}</p>
          </li>
        </ul>
        <ul class="feedback-box score-box">
          <li class="title">
            <p>纠纷</p>
            <p>质量平均率</p>
            <p>服务平均率</p>
            <p>交易平均率</p>
          </li>
          <li>
            <p> <span class="green-text">{{ detail && detail.adjust_victor }}</span>胜/<span class="red-text">{{ detail && detail.adjust_fail }}</span>败</p>
            <p>{{ detail && detail.comment_stat.quality_avg }} <img src="@/assets/images/xingxing.png" alt="xingxing"> </p>
            <p>{{ detail && detail.comment_stat.service_avg }} <img src="@/assets/images/xingxing.png" alt="xingxing"></p>
            <p>{{ detail && detail.comment_stat.trade_avg }} <img src="@/assets/images/xingxing.png" alt="xingxing"></p>
          </li>
        </ul>
      </div>
      <!-- 商品管理 -->
      <shop-admin-box :detail="detail"></shop-admin-box>
    </div>
  </div>
</template>

<script>
// import accountInfo from '@/components/accountInfo'
import shopGrowth from '@/components/shopGrowth.vue'
import shopInfo from '@/components/shopInfo.vue'
import shopAdminBox from '@/components/shopAdminBox.vue'
import { getUserId } from '@/utils/auth.js'
import { getMarchantDetail } from '@/api/becomeSeller.js'
import bus from '@/bus'
export default {
  name: 'orderAdmin',
  components: {
    // accountInfo,
    shopGrowth,
    shopAdminBox,
    shopInfo
  },
  data () {
    return {
      userId: +getUserId() || null,
      detail: null
    }
  },
  async mounted () {
    this.initBreadcrumb()
    if (this.userId) {
      await this.getUserInfoFn(this.userId)
    }
    this.getMarchantDetail()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '商家详情' }
      ])
    },
    async getMarchantDetail () {
      try {
        const res = await getMarchantDetail(this.userInfo.mct_id)
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
  .order-admin-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .order-admin-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .order-admin-right-container{
      width: 810px;
      margin-bottom: 30px;
      .name-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-top: 10px;
        padding-bottom: 18px;
        border-bottom: 1px solid #F0F0F0;
      }
      .order-detail{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 40px 40px 0;
        .order-detail-item{
          width: 25%;
          margin-bottom: 40px;
          p{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #666666;
            text-align: center;
            &.title{
              margin-bottom: 10px;
            }
            &.date{
              a{
                font-weight: 600;
                color: #1652B5;
                &:hover{
                  border-bottom: 1px solid #1652B5;
                }
              }
              &.red{
                color: #C00202;
              }
            }
          }
        }
      }
      .buyer-box{
        width: 100%;
        .title-box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 26px;
          box-sizing: border-box;
          padding: 0 20px;
          p.title{
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-bottom: 14px;
          }
        }
        .feedback-box{
          width: 100%;
          li{
            width: 100%;
            height: 44px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            &.title{
              background-color: #F0F0F0;
            }
            p{
              width: 50px;
              text-align: center;
            }
            div{
              width: 70px;
              height: 44px;
              display: flex;
              align-items: center;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              img{
                width: 20px;
                height: 20px;
                margin-right: 10px;
              }
            }
          }
        }
        .score-box{
          li{
            p{
              width: 105px;
              display: flex;
              justify-content: center;
              align-items: center;
              .red-text{
                color: #DA0000;
              }
              .green-text{
                color: #0CA345;
              }
            }
          }
        }
      }
    }
  }
</style>
