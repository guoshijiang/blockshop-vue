<template>
  <div class="forget-container">
    <div class="forget-content-container">
      <h6 class="forget-title">忘记密码</h6>
      <p class="forget-desc">请键入您的用户名和注册时生成的一串助记词来重置。</p>
      <div class="form-container">
        <el-form :model="forgetForm">
          <el-form-item>
            <el-input v-model="forgetForm.username" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="forgetForm.securityCode" placeholder="pin码" clearable></el-input>
          </el-form-item>
          <div class="verification-code-box">
            <img src="https://iph.href.lu/458x133?fg=666666&bg=cccccc" alt="verificationCode">
          </div>
          <el-form-item>
            <el-input v-model="forgetForm.verificationCode" placeholder="请输入验证码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onNextStep" class="login-btn">继续</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forget',
  data () {
    return {
      forgetForm: {
        username: '',
        securityCode: '',
        verificationCode: ''
      }
    }
  },
  methods: {
    onNextStep () {

    }
  }
}
</script>

<style lang="less" scoped>
  .forget-container{
    width: 100%;
    .forget-content-container{
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 44px 0;
      background-color: #fff;
      .forget-title{
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #343434;
        margin-bottom: 22px;
      }
      .forget-desc{
        font-size: 16px;
        line-height: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #343434;
        text-align: center;
      }
      .form-container{
        width: 450px;
        margin: 43px auto 0;
        .select-box{
          width: 450px;
        }
        .verification-code-box{
          width: 100%;
          margin-bottom: 22px;
          img{
            width: 100%;
          }
        }
        .login-btn{
          width: 450px;
          background: linear-gradient(90deg, #008DFF, #0060FF);
          box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
          border-radius: 22px;
          margin-top: 50px;
        }
        ::v-deep .el-input__inner{
          border-radius: 22px;
        }
      }
    }
  }
</style>
