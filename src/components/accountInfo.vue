<template>
  <div class="account-info-box">
    <div class="account-info-left" v-if="userId">
      <div class="header-img-box">
        <img :src="userInfo && userInfo.photo" alt="header-img">
      </div>
      <p>{{ (userInfo && userInfo.user_name) || "--" }}</p>
      <span>{{ userInfo && userInfo.is_merchant ? '卖家' : '买家' }}</span>
    </div>
    <div class="account-info-right" v-if="userId">
      <div class="info-item">
        <p class="info-label"><span></span>加入时间：</p>
        <p class="info-text">{{ userInfo && userInfo.join_time }}</p>
      </div>
      <div class="info-item">
        <p class="info-label"><span></span>信任级别：</p>
        <p class="info-text">等级{{ userInfo && userInfo.trust_level }}</p>
      </div>
      <div class="info-item">
        <p class="info-label"><span><img src="@/assets/images/ziyuan-2.png" alt="ziyuan-2"></span>订单总计：</p>
        <p class="info-text red-text">{{ userInfo && userInfo.btc_order_amount }} BTC</p>
      </div>
      <div class="info-item">
        <p class="info-label"><span><img src="@/assets/images/XMR.png" alt="XMR.png"></span>订单总计：</p>
        <p class="info-text red-text">{{ userInfo && userInfo.usdt_order_amount }} USDT</p>
      </div>
      <div class="info-item last-info-item">
        <p class="info-label"><span></span>调解信息(胜/败）</p>
        <p class="info-text"><span class="green-text">{{ userInfo && userInfo.adjust_victor }}</span><span class="red-text">/{{ userInfo && userInfo.adjust_fail }}</span></p>
      </div>
    </div>
    <div class="login-btn-box" v-if="!userId">
      <el-button type="primary" @click="goLogin">去登录</el-button>
    </div>
  </div>
</template>

<script>
import { getUserId } from '@/utils/auth.js'
export default {
  name: 'accountInfo',
  data () {
    return {
      userId: +getUserId() || null
    }
  },
  methods: {
    goLogin () {
      this.$router.push({
        path: '/login/login'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .account-info-box{
    width: 100%;
    box-sizing: border-box;
    padding: 31px 8px 13px 12px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #F4F5F7;
    .account-info-left{
      .header-img-box{
        width: 110px;
        height: 110px;
        img{
          display: block;
          width: 100%;
          border-radius: 50%;
        }
      }
      p{
        font-size: 16px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #666666;
        text-align: center;
        margin-top: 14px;
      }
      span{
        display: block;
        margin: 7px auto;
        width: 49px;
        height: 17px;
        text-align: center;
        background: #FF6600;
        border-radius: 9px 8px 8px 8px;
        font-size: 12px;
        line-height: 17px;
        font-family: PingFang SC;
        font-weight: 200;
        color: #FDFDFD;
      }
    }
    .account-info-right{
      width: 250px;
      font-size: 15px;
      line-height: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #343434;
      padding-top: 25px;
      .info-item{
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        &.last-info-item{
          margin-bottom: 0;
          padding-right: 30px;
        }
        .info-label{
          display: flex;
          flex-shrink: 0;
          span{
            width: 24px;
            height: 24px;
            margin-right: 5px;
            img{
              width: 100%;
            }
          }
        }
        .red-text{
          color: #FF0000;
        }
        .green-text{
          color: #04BC00;
        }
      }
    }
    .login-btn-box{
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
