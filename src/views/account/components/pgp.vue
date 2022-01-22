<template>
  <div class="pgp-container">
    <div class="module-box">
      <p class="module-title">PGP信息</p>
      <div class="form-box">
        <el-form
          :model="passwordFrom"
          label-position="left"
          label-width="90"
          :rules="passwordRules"
          ref="passwordFrom"
        >
          <el-form-item label="新的PGP公共钥匙" prop="public_key">
            <el-input
              class="text-area-box"
              type="textarea"
              :rows="2"
              placeholder="请输入"
              resize="none"
              v-model="passwordFrom.public_key">
            </el-input>
          </el-form-item>
          <el-form-item prop="is_open" label="2FA:">
            <el-select v-model="passwordFrom.is_open" placeholder="请选择" class="select-box">
              <el-option
                label="不启用登录上的双因素身份验证"
                :value="0">
              </el-option>
              <el-option
                label="启用登录上的双因素身份验证"
                :value="1">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button class="save-btn" type="primary" @click="handleSave">保存更改</el-button>
  </div>
</template>

<script>
import { changeClose2Fa } from '@/api/login.js'
import { getUserId } from '@/utils/auth.js'
export default {
  name: 'pgp',
  data () {
    return {
      passwordFrom: {
        public_key: '',
        is_open: 1
      },
      passwordRules: {
        public_key: [{ required: true, message: '请输入pgp公钥', trigger: 'blur' }],
        is_open: [{ required: true, message: '请选择是否开启', trigger: 'change' }]
      }
    }
  },
  methods: {
    async changeClose2Fa () {
      try {
        const params = { ...this.passwordFrom }
        params.user_id = +getUserId() || null
        const res = await changeClose2Fa(params)
        if (+res.data.code === 2000) {
          this.$message.success('修改pgp公钥成功')
          this.passwordFrom = Object.assign({}, {
            public_key: '',
            is_open: 1
          })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSave () {
      this.$refs.passwordFrom.validate((valid) => {
        if (!valid) return false
        this.changeClose2Fa()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .pgp-container{
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
      margin: 80px auto 50px;
    }
  }
</style>
