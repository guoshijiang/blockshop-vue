<template>
  <div class="save-container">
    <div class="save-content-container">
      <div class="form-container">
        <el-form :model="saveForm">
          <el-form-item label="配置文本文件：">
            <el-input
              class="text-area-box"
              type="textarea"
              :rows="2"
              placeholder="请输入"
              resize="none"
              v-model="saveForm.configText">
            </el-input>
          </el-form-item>
          <el-form-item label="2FA：">
            <el-select class="select-box" v-model="saveForm.FA">
              <el-option
                label="启用登录上的双因素身份验证"
                :value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <p class="hint-text">为了禁用双因素身份验证，我们需要您的撤回PIN检查此请求是否合法。</p>
          <el-form-item>
            <el-button type="primary" class="save-btn">保存设置</el-button>
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
      saveForm: {
        configText: '',
        FA: ''
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
  .save-container{
    width: 100%;
    .save-content-container{
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      .form-container{
        margin: 43px auto 0;
        .select-box{
          width: 450px;
        }
        ::v-deep .el-textarea__inner{
          width: 450px;
          height: 302px;
        }
        ::v-deep .el-input__inner{
          width: 450px;
          border: 1px solid #BFBFBF;
          border-radius: 22px;
        }
        ::v-deep .el-form-item{
          display: flex;
          margin-bottom: 33px;
          .el-form-item__label{
            width: 150px;
            text-align: right;
          }
        }
        .save-btn{
          width: 450px;
          background: linear-gradient(90deg, #008DFF, #0060FF);
          box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
          border-radius: 22px;
          margin-top: 150px;
          margin-left: 110px;
        }
        ::v-deep .el-input__inner{
          border-radius: 22px;
        }
        .hint-text{
          font-size: 16px;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: #343434;
          margin-left: 100px;
        }
      }
    }
  }
</style>
