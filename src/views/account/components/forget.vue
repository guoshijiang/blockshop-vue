<template>
  <div class="forget-container">
    <div class="module-box">
      <p class="module-title">密码信息</p>
      <div class="form-box">
        <el-form :model="passwordFrom" label-position="left" label-width="90" :rules="passwordRules" ref="passwordFrom">
          <el-form-item label="pin码" prop="pin_code">
            <el-input v-model="passwordFrom.pin_code" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="new_password">
            <el-input v-model="passwordFrom.new_password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="c_new_password">
            <el-input v-model="passwordFrom.c_new_password" show-password></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="verificationCode">
            <div class="verification-code-box" style="margin-bottom: 10px;">
              <verification-code ref="verificationCode" :code="passwordFrom.verificationCode"></verification-code>
            </div>
            <el-input v-model="passwordFrom.verificationCode" placeholder="请输入验证码" clearable></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button class="save-btn" type="primary" @click="handleSave">保存更改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { forgetPassword } from '@/api/login.js'
import { getUserId } from '@/utils/auth.js'
import verificationCode from '@/components/verificationCode.vue'
export default {
  name: 'forget',
  components: {
    verificationCode
  },
  data () {
    return {
      passwordFrom: {
        pin_code: '',
        new_password: '',
        c_new_password: '',
        verificationCode: ''
      },
      passwordRules: {
        pin_code: [{ required: true, message: '请输入当前pin', trigger: 'blur' }],
        new_password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        c_new_password: [{ required: true, message: '请再次确认新密码', trigger: 'blur' }],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.verificationCodeValida, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    verificationCodeValida (rule, value, callback) {
      if (!this.$refs.verificationCode.validateCode()) {
        callback(new Error('验证码不正确！'))
      }
      callback()
    },
    handleSave () {
      this.$refs.passwordFrom.validate((valid) => {
        if (!valid) return false
        this.forgetPassword()
      })
    },
    async forgetPassword () {
      try {
        const params = { ...this.passwordFrom }
        params.user_id = +getUserId() || null
        const res = await forgetPassword(params)
        if (+res.data.code === 2000) {
          this.$message.success('重置密码成功')
          this.passwordFrom = Object.assign({}, {
            pin_code: '',
            new_password: '',
            c_new_password: '',
            verificationCode: ''
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
  .forget-container{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    .module-box{
      width: 100%;
      margin-bottom: 21px;
      .module-title{
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #343434;
      }
      .form-box{
        width: 1050px;
        margin: 10px 0 0 80px;
        ::v-deep .el-textarea__inner{
          width: 900px;
          height: 200px;
        }
        ::v-deep .el-input__inner{
          width: 450px;
          border: 1px solid #BFBFBF;
          border-radius: 22px;
        }
        ::v-deep .el-form-item{
          display: flex;
          .el-form-item__label{
            width: 150px;
            text-align: right;
          }
        }
      }
    }
    .save-btn{
      display: block;
      width: 450px;
      height: 44px;
      background: linear-gradient(90deg, #008DFF, #0060FF);
      box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
      border-radius: 22px;
      margin: 88px auto 50px;
    }
  }
</style>
