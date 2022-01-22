<template>
  <div class="header-container">
    <div class="header-box">
      <router-link to="/"><img src="@/assets/images/logo.jpg" alt="logo" class="logo"></router-link>
      <div class="login-info-box" v-if="userInfo">
        <div class="header-img">
          <img :src="userInfo&&userInfo.photo" alt="touxiang_d">
        </div>
        <div class="right-info-box">
          <div class="name-box">
            <p class="name">登陆人：{{ (userInfo&&userInfo.user_name) || "--" }}</p>
            <p class="btn" @click="handleRemove">注销</p>
          </div>
          <div class="balance-box">
            <p>BTC：<span>{{ userInfo&&userInfo.btc_wt_stat.balance }}</span>   /USDT：<span>{{ userInfo&&userInfo.usdt_wt_stat.balance }}</span></p>
          </div>
          <div class="operation-box">
            <p><router-link to="/account">设置</router-link></p>
            <p><router-link to="/becomeSeller">我的自动商店</router-link></p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="login-box">
          <p @click="goLogin">登录</p>
          <p @click="goRegister">注册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken, getUserId } from '@/utils/auth.js'
import { mapMutations } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      userId: +getUserId() || null
    }
  },
  mounted () {
    if (this.userId) {
      this.getUserInfoFn()
    }
  },
  methods: {
    ...mapMutations(['REMOVE_USER_INFO']),
    handleRemove () {
      removeToken()
      this.$store.commit('REMOVE_USER_INFO')
      this.$router.push({
        path: '/login/login'
      })
    },
    goLogin () {
      this.$router.push({
        path: '/login/login'
      })
    },
    goRegister () {
      this.$router.push({
        path: '/login/register'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .header-container{
    width: 100%;
    background-color: #fff;
    .header-box{
      width: 1200px;
      box-sizing: border-box;
      padding: 15px 15px 10px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo{
        width: 161px;
        height: 54px;
      }
    }
    .login-info-box{
      display: flex;
      .header-img{
        max-width: 80px;
        max-height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 21px;
        img{
          display: block;
          max-width: 80px;
          max-height: 80px;
        }
      }
      .right-info-box{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name-box{
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          .name{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
          }
          .btn{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1652B5;
            cursor: pointer;
          }
        }
        .balance-box{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          margin-bottom: 10px;
          span{
            color: #FF0000;
          }
        }
        .operation-box{
          display: flex;
          justify-content: space-between;
          a{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
          }
          p{
            cursor: pointer;
          }
        }
      }
    }
    .login-box{
      width: 100px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      font-size: 18px;
      color: #1652B5;
      cursor: pointer;
    }
  }
</style>
