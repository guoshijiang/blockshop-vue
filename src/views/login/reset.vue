<template>
  <div class="reset-container">
    <div class="reset-content-container">
      <h6 class="reset-title">重置密码</h6>
      <p class="reset-desc">密码重置在这里键入您的新密码</p>
      <div class="form-container">
        <el-form :model="resetForm">
          <el-form-item>
            <el-input v-model="resetForm.username" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="resetForm.passworld" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="resetForm.againPassworld" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onConfrim" class="login-btn">完成</el-button>
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
      resetForm: {
        username: '',
        passworld: '',
        againPassworld: ''
      }
    }
  },
  methods: {
    onConfrim () {

    }
  }
}
</script>

<style lang="less" scoped>
  .reset-container{
    width: 100%;
    .reset-content-container{
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 44px 0;
      background-color: #fff;
      .reset-title{
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #343434;
        margin-bottom: 22px;
      }
      .reset-desc{
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
