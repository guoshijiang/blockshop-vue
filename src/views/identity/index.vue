<template>
  <div class="identity-container">
    <div class="identity-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="identity-right-container">
      <p class="name-box">张老板｜用户名</p>
      <div class="account-basic-info">
        <div class="img-box">
          <img src="@/assets/images/touxiang_d.png" alt="touxiang_d">
        </div>
        <div class="right-info">
          <p class="name">张老板<span>供应商级别2</span></p>
          <p class="basic">加入时间： <span>一周</span></p>
          <p class="basic">信任级别： <span>采购级别1</span></p>
        </div>
      </div>
      <p class="buyer-title">买方统计(自加入起）</p>
      <div class="auto-join-box">自从加入</div>
      <div class="data-box">
        <p>总纠纷/其他</p>
        <p> <span class="green-text">2</span>胜 <span class="red-text">3</span>败/0</p>
      </div>
      <div class="identity-tab-container">
        <el-tabs v-model="activeBasic" type="card">
          <el-tab-pane label="关于" name="about">
            <div class="about-box">
              关于xxxx:
            </div>
          </el-tab-pane>
          <el-tab-pane label="PGP公钥" name="pgp">
            <div class="pgp-box">
              PGP公钥xxx:
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
export default {
  name: 'Identity',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      activeBasic: 'about'
    }
  }
}
</script>

<style lang="less" scoped>
  .identity-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .identity-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .identity-right-container{
      width: 791px;
      margin-bottom: 30px;
      .name-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-top: 10px;
        padding-bottom: 18px;
        border-bottom: 1px solid #F0F0F0;
      }
      .account-basic-info{
        width: 100%;
        box-sizing: border-box;
        padding: 22px;
        display: flex;
        .img-box{
          width: 110px;
          height: 110px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 28px;
          img{
            display: block;
            max-width: 110px;
            max-height: 110px;
          }
        }
        .right-info{
          p{
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
            display: flex;
            align-items: center;
            margin-bottom: 23px;
            &:last-child{
              margin-bottom: 0;
            }
            &.name{
              margin-top: 8px;
              span{
                display: block;
                font-size: 12px;
                height: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 20px;
                padding: 0 10px;
                background: #1652B5;
                border-radius: 10px;
                margin-left: 10px;
              }
            }
            &.basic{
              span{
                margin-left: 40px;
              }
            }
          }
        }
      }
      .buyer-title{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #343434;
        margin-bottom: 18px;
      }
      .auto-join-box{
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        padding-right: 118px;
        background: #F0F0F0;
        font-size: 16px;
        line-height: 44px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #343434;
        text-align: right;
      }
      .data-box{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 11px 118px 19px 0;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #343434;
        .red-text{
          color: #DA0000;
        }
        .green-text{
          color: #0CA345;
        }
      }
      .identity-tab-container{
        ::v-deep .el-tabs__item.is-active{
          color: #333;
          background-color: #F0F0F0;
        }
        .about-box{
          width: 100%;
          padding: 15px 20px;
        }
        .pgp-box{
          width: 100%;
          padding: 15px 20px;
        }
      }
    }
  }
</style>
