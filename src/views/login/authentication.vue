<template>
  <div class="authentication-container">
    <h6 class="authentication-title">双因素认证</h6>
    <p class="authentication-desc">该帐户启用了双因素身份验证(2FA)。对于附加安全性，请使用您的PGP私钥并解密以下消息。如果您丢失了您的私钥或在您的配置文件中放置了错误的公钥，请输入下面框中的15个字符继续操作，然后您将永久丢失您的帐户，这对于调整备份vour privale Kevs是非常重要的。</p>
    <p class="authentication-desc">请注意，2FA是市场上所有供应商的管理员。你是个卖主，看到这一切，这是正常的。</p>
    <p class="authentication-desc">{{ cipher_text }}</p>
    <p class="authentication-desc">结束PGP讯息-</p>
    <div class="form-container">
      <el-form :model="authenticationForm" label-position="left" ref="form">
        <el-form-item label="安全代码：" prop="factor">
          <el-input v-model="authenticationForm.factor" placeholder="你加密的安全代码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { goLogin } from '@/api/login.js'
import { setToken } from '@/utils/auth.js'
export default {
  name: 'Authentication',
  data () {
    return {
      authenticationForm: {
        factor: ''
      },
      rulers: {
        factor: [{ required: true, message: '请输入安全代码', trigger: 'blur' }]
      },
      cipher_text: '',
      loginParams: null
    }
  },
  mounted () {
    this.cipher_text = sessionStorage.getItem('cipher_text') || ''
    this.loginParams = sessionStorage.getItem('loginParams') ? JSON.parse(sessionStorage.getItem('loginParams')) : null
  },
  methods: {
    handleLogin () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.goLogin()
      })
    },
    async goLogin () {
      try {
        const params = { ...this.loginParams }
        params.factor = this.authenticationForm.factor
        const res = await goLogin(params)
        if (+res.data.code === 2000) {
          this.$message.success('登录成功')
          setToken(res.data.data)
          this.$router.replace({
            path: '/'
          })
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
  .authentication-container{
    width: 100%;
    padding: 30px 250px;
    box-sizing: border-box;
    .authentication-title{
      font-size: 30px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #343434;
      text-align: center;
      margin-bottom: 21px;
    }
    .authentication-desc{
      font-size: 16px;
      line-height: 20px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #343434;
      margin-bottom: 18px;
      text-align: justify;
      word-break: break-all;
    }
      .form-container{
        width: 100%;
        margin: 43px auto 0;
        .login-btn{
          width: 450px;
          display: block;
          background: linear-gradient(90deg, #008DFF, #0060FF);
          box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
          border-radius: 22px;
          margin-top: 50px;
          margin: 30px auto 0;
        }
        ::v-deep .el-input{
          width: 450px;
        }
        ::v-deep .el-input__inner{
          border-radius: 22px;
        }
      }
  }
</style>
