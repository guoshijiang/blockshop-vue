<template>
  <div class="pin-container">
    <div class="module-box" v-if="this.type === 2">
      <p class="module-title">密码信息</p>
      <div class="form-box">
        <el-form :model="passwordFrom" label-position="left" label-width="150" :rules="passwordRules" ref="passwordFrom">
          <el-form-item label="当前密码：" prop="oldPassword">
            <el-input v-model="passwordFrom.oldPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="new_password">
            <el-input v-model="passwordFrom.new_password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="c_new_password">
            <el-input v-model="passwordFrom.c_new_password" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="module-box" v-if="this.type === 3">
      <p class="module-title">提取PIN信息</p>
      <div class="form-box">
        <el-form :model="pinFrom" label-position="left" label-width="90" :rules="pinRules" ref="pinFrom">
          <el-form-item label="当前PIN：" prop="old_pin_code">
            <el-input v-model="pinFrom.old_pin_code" show-password></el-input>
          </el-form-item>
          <el-form-item label="新PIN：" prop="new_pin_code">
            <el-input v-model="pinFrom.new_pin_code" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新PIN：" prop="c_new_pin_code">
            <el-input v-model="pinFrom.c_new_pin_code" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="module-box verification-code-form">
      <p class="module-title">验证码</p>
      <div class="form-box">
        <el-form :model="verificationCodeForm" ref="verificationCodeForm" :rules="verificationRules">
            <el-form-item label=" ">
              <div class="verification-code-box">
                <verification-code ref="verificationCode" :code="verificationCodeForm.verificationCode"></verification-code>
              </div>
            </el-form-item>
            <el-form-item label=" " prop="verificationCode">
              <el-input v-model="verificationCodeForm.verificationCode" placeholder="请输入验证码" clearable></el-input>
            </el-form-item>
        </el-form>
      </div>
      <el-button class="save-btn" type="primary" @click="handleSave">保存更改</el-button>
    </div>
  </div>
</template>

<script>
import { updataPassword, updataPin } from '@/api/login.js'
import { getUserId } from '@/utils/auth.js'
import verificationCode from '@/components/verificationCode.vue'
export default {
  name: 'Pin',
  props: {
    type: [Number]
  },
  components: {
    verificationCode
  },
  data () {
    return {
      passwordFrom: {
        oldPassword: '',
        new_password: '',
        c_new_password: ''
      },
      passwordRules: {
        oldPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        new_password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        c_new_password: [{ required: true, message: '请再次确认新密码', trigger: 'blur' }]
      },
      pinFrom: {
        old_pin_code: '',
        new_pin_code: '',
        c_new_pin_code: ''
      },
      pinRules: {
        old_pin_code: [{ required: true, message: '请输入当前pin', trigger: 'blur' }],
        new_pin_code: [{ required: true, message: '请输入新pin', trigger: 'blur' }],
        c_new_pin_code: [{ required: true, message: '请再次确认新pin', trigger: 'blur' }]
      },
      verificationCodeForm: {
        verificationCode: ''
      },
      verificationRules: {
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
      if (this.type === 2) {
        this.$refs.passwordFrom.validate((valid) => {
          if (!valid) return false
          this.$refs.verificationCodeForm.validate((validTwo) => {
            if (!validTwo) return false
            this.updataPassword()
          })
        })
      } else if (this.type === 3) {
        this.$refs.pinFrom.validate((valid) => {
          if (!valid) return false
          this.$refs.verificationCodeForm.validate((validTwo) => {
            if (!validTwo) return false
            this.updataPin()
          })
        })
      } else {
        console.log(this.type, '无效的type')
      }
    },
    async updataPassword () {
      try {
        const params = { ...this.passwordFrom }
        params.user_id = +getUserId() || null
        const res = await updataPassword(params)
        console.log(res)
        if (+res.data.code === 2000) {
          this.$message.success('修改成功')
          this.passwordFrom = Object.assign({}, {
            oldPassword: '',
            new_password: '',
            c_new_password: ''
          })
          this.pinFrom = Object.assign({}, {
            old_pin_code: '',
            new_pin_code: '',
            c_new_pin_code: ''
          })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async updataPin () {
      try {
        const params = { ...this.pinFrom }
        params.user_id = +getUserId() || null
        const res = await updataPin(params)
        console.log(res)
        if (+res.data.code === 2000) {
          this.$message.success('修改成功')
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
  .pin-container{
    width: 100%;
    box-sizing: border-box;
    padding: 15px 20px;
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
        width: 560px;
        margin: 10px 0 0 132px;
        &.verification-code-form{
          padding: 0 0 0 132px;
        ::v-deep .el-form-item{
          .el-form-item__label{
            opacity: 0;
          }
        }
        }
        ::v-deep .el-input__inner{
          width: 450px;
          border: 1px solid #BFBFBF;
          border-radius: 22px;
        }
        ::v-deep .el-form-item{
          display: flex;
          .el-form-item__label{
            width: 115px;
            text-align: right;
          }
        }
        .verification-code-box{
          width: 100%;
          margin-bottom: 22px;
          img{
            width: 100%;
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
      margin: 89px auto 50px;
    }
  }
</style>
