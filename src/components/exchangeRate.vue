<template>
  <div class="exchange-rate-box">
    <p class="module-title">虚拟币汇率</p>
    <div class="exchange-rate-content">
      <ul>
        <li><span class="name">{{ `${detail&&detail.btc_price.chain_name}(${detail&&detail.btc_price.asset})` }}</span><span class="price up">{{ detail&&detail.btc_price.usd_price }}</span></li>
        <li><span class="name">{{ `${detail&&detail.usdt_price.chain_name}(${detail&&detail.usdt_price.asset})` }}</span><span class="price up">{{ detail&&detail.usdt_price.usd_price }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { goodsQuery } from '@/api/good.js'
export default {
  name: 'ExchangeRate',
  created () {
    this.getGoodQuery()
  },
  data () {
    return {
      detail: null
    }
  },
  methods: {
    async getGoodQuery () {
      try {
        const res = await goodsQuery()
        console.log(res)
        if (+res.data.code === 2000) {
          const data = res.data.data
          this.detail = {
            btc_price: data.btc_price,
            usdt_price: data.usdt_price
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
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
  .exchange-rate-box{
    width: 100%;
    .exchange-rate-content{
      width: 100%;
      box-sizing: border-box;
      padding: 33px 33px 10px;
      border: 1px solid #F4F5F7;
      ul{
        width: 100%;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          .name{
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #343434;
          }
          .price{
            font-size: 18px;
            font-family: Arial;
            font-weight: bold;
            &.up{
              color: #C30000;
            }
            &.down{
              color: #05C300;
            }
          }
        }
      }
    }
  }
</style>
