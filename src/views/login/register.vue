<template>
  <div class="register-container">
    <div class="register-content-container" v-if="step === 1">
      <h6 class="register-title">欢迎来到哥伦布</h6>
      <p class="register-desc">欢迎注册哥伦布，请填写你的用户名和你的密码，你就可以通过一个安全的系统在我们的市场上进行交易</p>
      <div class="form-container">
        <el-form :model="registerForm" :rules="rules" ref="registerForm">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="请设置用户名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="passworld">
            <el-input v-model="registerForm.passworld" placeholder="请设置密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="againPassworld">
            <el-input v-model="registerForm.againPassworld" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="pincode">
            <el-input v-model="registerForm.pincode" placeholder="提款pin码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <div class="no-dis-box">
              <p>CNY</p>
              <p>中文</p>
            </div>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <div class="verification-code-box">
            <verification-code ref="verificationCode" :code="registerForm.verificationCode"></verification-code>
          </div>
          <el-form-item prop="verificationCode">
            <el-input v-model="registerForm.verificationCode" placeholder="请输入验证码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleNext" class="login-btn">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="fa-container" v-if="step === 2">
      <div class="form-container">
        <el-form :model="registerFaForm" :rules="faRules" ref="registerFaForm" label-width="100px">
          <el-form-item prop="fa" label="配置文件文本:">
            <el-input v-model="registerFaForm.fa" placeholder="请输入" clearable type="textarea" :row="5"></el-input>
          </el-form-item>
          <el-form-item prop="open" label="2FA:">
            <el-select v-model="registerFaForm.open" placeholder="请选择" class="select-box">
              <el-option
                label="不启用登录上的双因素身份验证"
                :value="0">
              </el-option>
              <el-option
                label="启用登录上的双因素身份验证"
                :value="1">
              </el-option>
            </el-select>
            <p class="hint-text">为了禁用双因素身份验证，我们需要您的撤回PIN检查此请求是否合法。</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onRegister" class="login-btn">加入哥伦布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import verificationCode from '@/components/verificationCode.vue'
import { goRegister } from '@/api/login.js'
export default {
  name: 'Register',
  components: {
    verificationCode
  },
  data () {
    return {
      step: 1,
      registerForm: {
        username: '',
        passworld: '',
        againPassworld: '',
        pincode: '',
        verificationCode: ''
      },
      registerFaForm: {
        fa: '',
        open: 1
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passworld: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        againPassworld: [
          { required: true, message: '请再次确认密码', trigger: 'blur' }
        ],
        pincode: [
          { required: true, message: '请输入提款pin码', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.verificationCodeValida, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleNext () {
      try {
        this.$refs.registerForm.validate((valid) => {
          if (!valid) return false
          this.step = 2
        })
      } catch (e) {
        console.log(e)
      }
    },
    onRegister () {
      try {
        const params = {
          user_name: this.registerForm.username,
          password: this.registerForm.passworld,
          confirm_password: this.registerForm.againPassworld,
          pin_code: this.registerForm.pincode,
          public_key: this.registerFaForm.open ? this.registerFaForm.fa : ''
        }
        goRegister(params).then(res => {
          if (+res.data.code === 2000) {
            this.$confirm('注册成功，是否跳转登录页？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({
                path: '/login/login'
              })
            })
          } else if (+res.data.code === 4003) {
            this.$confirm('该用户已注册，是否跳转登录页？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({
                path: '/login/login'
              })
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
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
   .register-container{
    width: 100%;
    .register-content-container{
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 44px 0;
      background-color: #fff;
      .register-title{
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #343434;
        margin-bottom: 22px;
      }
      .register-desc{
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
        .no-dis-box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
            width: 220px;
            height: 40px;
            background: #FFFFFF;
            border: 1px solid #DCDFE6;
            border-radius: 22px;
            box-sizing: border-box;
            padding: 0 18px;
            font-size: 16px;
            line-height: 40px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #343434;
          }
        }
        ::v-deep .el-input__inner{
          border-radius: 22px;
        }
      }
    }
    .fa-container{
      width: 100%;
      .form-container{
        width: 450px;
        margin: 43px auto 0;
        .select-box{
          width: 350px;
        }
        .login-btn{
          width: 350px;
          background: linear-gradient(90deg, #008DFF, #0060FF);
          box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
          border-radius: 22px;
          margin-top: 50px;
        }
        .hint-text{
          font-size: 16px;
          line-height: 20px;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: #343434;
          margin-top: 20px;
        }
      }
    }
  }
</style>
