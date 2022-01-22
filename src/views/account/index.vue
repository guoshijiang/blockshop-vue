<template>
<div class="account-container">
  <div class="account-basic-info">
    <div class="img-box">
      <img :src="this.userInfo&&this.userInfo.photo" alt="touxiang_d">
    </div>
    <div class="right-info">
      <p class="name">{{ (this.userInfo&&this.userInfo.user_name) || "--" }}<span>供应商级别2</span></p>
      <p class="basic">加入时间： <span>{{ (this.userInfo&&this.userInfo.join_time) || "--" }}</span></p>
      <p class="basic">信任级别： <span>等级{{ userInfo && userInfo.trust_level }}</span></p>
    </div>
  </div>
  <div class="account-tab-container">
    <el-tabs v-model="activeBasic" type="card">
      <el-tab-pane label="修改个人资料" name="1"><edit /></el-tab-pane>
      <el-tab-pane label="修改密码" name="2"><pin :type="2" /></el-tab-pane>
      <el-tab-pane label="修改PIN" name="3"><pin :type="3" /></el-tab-pane>
      <el-tab-pane label="编辑PGP" name="4"><pgp /></el-tab-pane>
      <el-tab-pane label="忘记密码" name="5"><forget /></el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import edit from './components/edit.vue'
import forget from './components/forget.vue'
import pgp from './components/pgp.vue'
import pin from './components/pin.vue'
import { getUserId } from '@/utils/auth.js'
export default {
  name: 'Account',
  data () {
    return {
      activeBasic: '1'
    }
  },
  mounted () {
    const userId = +getUserId() || null
    if (userId) {
      this.getUserInfoFn(userId)
    }
    if (this.$route.query && this.$route.query.tab) {
      this.activeBasic = this.$route.query.tab
    }
  },
  components: {
    edit,
    forget,
    pgp,
    pin
  }
}
</script>

<style lang="less" scoped>
  .account-container{
    width: 100%;
    .account-basic-info{
      width: 100%;
      box-sizing: border-box;
      padding: 22px;
      display: flex;
      .img-box{
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 28px;
        img{
          display: block;
          max-width: 110px;
          max-height: 110px;
        }
      }
      .right-info{
        p{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          display: flex;
          align-items: center;
          margin-bottom: 23px;
          &:last-child{
            margin-bottom: 0;
          }
          &.name{
            margin-top: 8px;
            span{
              display: block;
              font-size: 12px;
              height: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 20px;
              padding: 0 10px;
              background: #1652B5;
              border-radius: 10px;
              margin-left: 10px;
            }
          }
          &.basic{
            span{
              margin-left: 40px;
            }
          }
        }
      }
    }
    .account-tab-container{
      ::v-deep .el-tabs__item.is-active{
        color: #333;
        background-color: #F0F0F0;
      }
    }
  }
</style>
