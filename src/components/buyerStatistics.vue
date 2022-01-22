<template>
  <div class="buyer-statistics-container" v-if="userInfo">
    <p class="module-title">买方统计</p>
    <div class="buyer-statistics-content">
      <div class="buyer-statistics-item">
        <div class="title-item no-bottom">
          <h6>买来物品</h6>
          <p>{{ userInfo && userInfo.total_buy }}</p>
        </div>
      </div>
      <div class="buyer-statistics-item">
        <div class="title-item">
          <h6>支出(BTC)</h6>
          <p></p>
        </div>
        <div class="option-item">
          <p>花费</p>
          <p class="green-text">{{ userInfo && userInfo.btc_wt_stat.spent_amount }}  BTC</p>
        </div>
        <div class="option-item no-bottom">
          <p>托管</p>
          <p class="red-text">{{ userInfo && userInfo.btc_wt_stat.balance }}  BTC</p>
        </div>
      </div>
      <div class="buyer-statistics-item">
        <div class="title-item">
          <h6>支出(USDT)</h6>
          <p></p>
        </div>
        <div class="option-item">
          <p>花费</p>
          <p class="green-text">{{ userInfo && userInfo.usdt_wt_stat.spent_amount }} USDT</p>
        </div>
        <div class="option-item no-bottom">
          <p>托管</p>
          <p class="red-text">{{ userInfo && userInfo.usdt_wt_stat.balance }} USDT</p>
        </div>
      </div>
      <div class="buyer-statistics-item">
        <div class="option-item">
          <p>BTC采购总额</p>
          <p>{{ userInfo && userInfo.btc_wt_stat.buy_amount  }} BTC</p>
        </div>
        <div class="option-item no-bottom">
          <p>USDT采购总额</p>
          <p>{{ userInfo && userInfo.usdt_wt_stat.buy_amount  }} USDT</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuyerStatistice'
}
</script>

<style lang="less" scoped>
  .module-title{
    width: 100%;
    box-sizing: border-box;
    padding: 13px 21px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #343434;
    background: #F0F0F0;
  }
  .buyer-statistics-container{
    width: 100%;
    .buyer-statistics-content{
      width: 100%;
      .buyer-statistics-item{
        width: 100%;
        box-sizing: border-box;
        padding: 15px 13px 15px 20px;
        border-bottom: 1px solid #F4F5F7;
        div{
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          &.no-bottom{
            margin-bottom: 0;
          }
          h6{
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #343434;
          }
          p{
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
            &.red-text{
              color: #FF0000;
            }
            &.green-text{
              color: #04BC00;
            }
          }
        }
      }
    }
  }
</style>
