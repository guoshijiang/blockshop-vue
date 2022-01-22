<template>
  <div class="login-container">
    <div class="login-content-container">
      <h6 class="login-title">登录哥伦布</h6>
      <p class="login-desc">欢迎来到哥伦布，请登录进入市场。如果您没有帐户，您可以注册访问列表。注册是免费的，向每个人开放。<br />如果您丢失了密码，请使用“忘记密码”表单重新设置您的密码。</p>
      <div class="form-container">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="账号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="passworld">
            <el-input v-model="loginForm.passworld" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="timeout">
            <el-input placeholder="请输入内容" v-model="loginForm.timeout" class="input-with-select">
              <el-select v-model="loginForm.time_unit" slot="prepend" placeholder="请选择">
                <el-option label="分钟" :value="0"></el-option>
                <el-option label="小时" :value="1"></el-option>
                <el-option label="天" :value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <div class="verification-code-box">
            <verification-code ref="verificationCode" :code="loginForm.verificationCode"></verification-code>
          </div>
          <el-form-item prop="verificationCode">
            <el-input v-model="loginForm.verificationCode" placeholder="请输入验证码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import verificationCode from '@/components/verificationCode.vue'
import { goLogin, get2Fa } from '@/api/login.js'
import { setToken } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'Login',
  components: {
    verificationCode
  },
  data () {
    return {
      loginForm: {
        username: '',
        passworld: '',
        timeout: null,
        verificationCode: '',
        time_unit: 0
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        passworld: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        timeout: [{ required: true, message: '请选择登录时长', trigger: 'change' }],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.verificationCodeValida, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initBreadcrumb()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '登录' }
      ])
    },
    handleLogin () {
      try {
        this.$refs.loginForm.validate((valid) => {
          if (!valid) return false
          const params = {
            user_name: this.loginForm.username,
            password: this.loginForm.passworld,
            login_time: +this.loginForm.timeout,
            time_unit: this.loginForm.time_unit
          }
          get2Fa({
            user_name: this.loginForm.username
          }).then(res => {
            if (+res.data.code === 2000) {
              if (res.data.data && res.data.data.cipher_text) {
                sessionStorage.setItem('loginParams', JSON.stringify(params))
                sessionStorage.setItem('cipher_text', res.data.data.cipher_text)
                this.$router.push({
                  path: '/login/authentication'
                })
              }
            } else if (+res.data.code === 4011) {
              this.goLogin(params)
            }
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    async goLogin (params) {
      try {
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
    },
    verificationCodeValida (rule, value, callback) {
      if (!this.$refs.verificationCode.validateCode()) {
        callback(new Error('验证码不正确！'))
      }
      callback()
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container{
    width: 100%;
    .login-content-container{
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 44px 0;
      background-color: #fff;
      .login-title{
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #343434;
        margin-bottom: 22px;
      }
      .login-desc{
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
  ::v-deep .el-select .el-input {
    width: 100px;
  }
  ::v-deep .input-with-select .el-input-group__prepend {
    background-color: #fff;
    border-radius: 22px;
    margin-right: 2px;
    border-right: 1px solid #DCDFE6;
  }
</style>
