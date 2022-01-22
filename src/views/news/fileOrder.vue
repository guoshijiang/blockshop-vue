<template>
  <div class="order-container">
    <div class="order-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="order-right-container">
      <div class="title-box">
        <p class="title">存档订单</p>
        <p class="desc">当前超过2周的订单将被放置到“存档订单”。</p>
      </div>
      <div class="order-list-container">
        <div class="order-item">
          <p class="title">XXXXXXXXX旗舰店</p>
          <div class="order-info">
            <div class="left-commodity-box">
              <router-link to="/">
                <div class="img-box">
                  <img src="https://iph.href.lu/109x70?fg=666666&bg=cccccc" alt="">
                </div>
                <div class="info-box">
                  <p class="icon-box"><span class="blue-text">[代管]</span><span class="green-text">[自动调度]</span></p>
                  <p class="name">比特币和社交媒体掌握(价值900，00美元)Ryan Hildreth</p>
                </div>
              </router-link>
            </div>
            <div class="middle-commodity-box">
              <p>数量：2</p>
            </div>
            <div class="right-commodity-box">
              <p class="name">买入价格</p>
              <p class="price">¥ 3999.00</p>
              <p class="exchange-rate">(0.00013 btc)</p>
              <p class="exchange-rate">(0.2195  Xmr)</p>
              <p class="exchange-rate">(0.03623 ltc)</p>
              <div class="btn-box">
                <el-button type="primary" class="remove-btn">查看详情</el-button>
                <el-button type="primary" class="remove-btn">确认收货</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="false">
        <img src="@/assets/images/kong.png" alt="kong">
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
export default {
  name: 'Order',
  components: {
    listOptions,
    buyerStatistics
  }
}
</script>

<style lang="less" scoped>
  .order-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .order-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .order-right-container{
      width: 800px;
      margin-bottom: 30px;
      padding-right: 9px;
      .title-box{
        padding-top: 14px;
        .title{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
          margin-bottom: 10px;
        }
        .desc{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
      .no-data{
        width: 100%;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .order-list-container{
        width: 100%;
        margin-top: 20px;
        .order-item{
          width: 100%;
          .title{
            width: 100%;
            box-sizing: border-box;
            padding: 10px 20px;
            background-color: #F0F0F0;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            line-height: 20px;
            margin-bottom: 10px;
          }
        }
        .order-info{
          width: 100%;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding-right: 20px;
          padding-bottom: 20px;
          margin-bottom: 30px;
          border-bottom: 1px solid #F0F0F0;
          .left-commodity-box{
            width: 440px;
            a{
              display: flex;
            }
            .img-box{
              width: 140px;
              height: 140px;
              background: #FFFFFF;
              border: 1px solid #EEEEEE;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 12px;
              img{
                max-width: 140px;
                max-height: 140px;
                display: block;
              }
            }
            .info-box{
              width: 345px;
              .icon-box{
                margin-bottom: 14px;
                span{
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  margin-right: 10px;
                }
                .blue-text{
                  color: #1652B5;
                }
                .green-text{
                  color: #008B4C;
                }
              }
              .name{
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #333333;
                line-height: 20px;
                margin-bottom: 12px;
              }
            }
          }
          .middle-commodity-box{
            display: flex;
            align-items: center;
            p{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #333333;
            }
          }
          .right-commodity-box{
            width: 200px;
            .name{
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              margin-bottom: 4px;
              text-align: right;
            }
            .price{
              font-size: 20px;
              font-family: SourceHanSansCN;
              font-weight: 500;
              color: #EC5151;
              margin-bottom: 10px;
              text-align: right;
            }
            .exchange-rate{
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              line-height: 16px;
              text-align: right;
            }
            .btn-box{
              display: flex;
              align-items: center;
            }
            .remove-btn{
              width: 90px;
              height: 30px;
              background: #1652B5;
              border-radius: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 14px auto 0;
              margin-left: 10px;
            }
          }

        }
      }
    }
  }
</style>
