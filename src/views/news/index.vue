<template>
  <div class="news-container">
    <div class="news-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
    </div>
    <div class="news-right-container">
      <el-tabs v-model="activeBasic" type="card">
        <el-tab-pane label="系统消息" name="system">
          <div class="system-box">
           系统消息
          </div>
        </el-tab-pane>
        <el-tab-pane label="卖家消息" name="seller">
          <div class="seller-box">
            卖家消息
          </div>
        </el-tab-pane>
        <el-tab-pane label="买家消息" name="buyer">
          <div class="buyer-box">
            买家消息
          </div>
        </el-tab-pane>
        <el-tab-pane label="新资讯" name="news">
          <div class="news-box">
            <el-form :model="verificationCodeForm" class="form-box">
                <div class="verification-code-box">
                  <img src="https://iph.href.lu/458x133?fg=666666&bg=cccccc" alt="verificationCode">
                </div>
                <el-form-item label=" ">
                  <el-input v-model="verificationCodeForm.verificationCode" placeholder="请输入验证码" clearable></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="next-btn">继续</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
export default {
  name: 'News',
  components: {
    listOptions
  },
  data () {
    return {
      activeBasic: 'system',
      verificationCodeForm: {
        verificationCode: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .news-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .news-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .news-right-container{
      width: 800px;
      margin-bottom: 30px;
      padding-right: 9px;
      ::v-deep .el-tabs__item.is-active{
        color: #333;
        background-color: #F0F0F0;
      }
      .form-box{
        width: 450px;
        ::v-deep .el-input__inner{
          width: 450px;
          border: 1px solid #BFBFBF;
          border-radius: 22px;
        }
        .verification-code-box{
          width: 458px;
          margin-bottom: 22px;
          img{
            width: 100%;
          }
        }
      }
      .next-btn{
        width: 450px;
        height: 44px;
        background: linear-gradient(90deg, #008DFF, #0060FF);
        box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
        border-radius: 22px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 85px;
      }
    }
  }
</style>
