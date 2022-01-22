<template>
  <div class="protect-container">
    <div class="header-box">
      <img src="https://iph.href.lu/162x55?fg=666666&bg=cccccc" alt="logo">
    </div>
    <div class="protect-content">
      <div class="protect-box">
        <p class="desc">为了检查，请写下你看到的验证码。</p>
        <h6 class="title">DDOS 保护</h6>
        <img class="verification-code-img" src="https://iph.href.lu/458x133?fg=666666&bg=cccccc" alt="verificationCode">
        <el-input class="verification-code-ipt" v-model="verificationCode" placeholder="请输入验证码" clearable></el-input>
        <el-button type="primary" @click="onNextStep" class="next-btn">参观哥伦布</el-button>
      </div>
    </div>
    <block-footer></block-footer>
  </div>
</template>

<script>
import blockFooter from '@/components/footer.vue'
export default {
  name: 'Protect',
  components: {
    blockFooter
  },
  data () {
    return {
      verificationCode: ''
    }
  },
  methods: {
    onNextStep () {

    }
  }
}
</script>

<style lang="less" scoped>
  .protect-container{
    width: 100%;
    height: 100vh;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .header-box{
      width: 100%;
      height: 110px;
      background: #FFFFFF;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .protect-content{
      width: 100%;
      height: calc(100vh - 170px);
      display: flex;
      justify-content: center;
      align-items: center;
      .protect-box{
        width: 561px;
        height: 456px;
        background: #FFFFFF;
        border: 1px solid #F4F5F7;
        box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 39px 55px 51px;
        .desc{
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #343434;
          text-align: center;
          margin-bottom: 24px;
        }
        .title{
          font-size: 30px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #343434;
          text-align: center;
          margin-bottom: 17px;
        }
        .verification-code-img{
          width: 100%;
          margin-bottom: 14px;
        }
        .verification-code-ipt{
          width: 100%;
          margin-bottom: 41px;
        }
        .next-btn{
          width: 100%;
          background: linear-gradient(90deg, #008DFF, #0060FF);
          box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
          border-radius: 5px;
        }
      }
    }
  }
</style>
