<template>
  <div class="shop-growth">
    <div class="module-title">店铺成长</div>
    <div class="shop-growth-box">
      <div class="shop-growth-item"><p class="label">店铺等级</p><p class="content">{{ detail && detail.shop_level }}</p></div>
      <div class="shop-growth-item"><p class="label">店铺评分</p><p class="content">{{ detail && detail.shop_score }}%</p></div>
      <div class="shop-growth-item"><p class="label">本月销量</p><p class="content">{{ detail && detail.month_sell_num }}</p></div>
      <div class="shop-growth-item"><p class="label">本月销售总额</p><p class="content">{{ detail && detail.month_sell_amount }}</p></div>
      <div class="shop-growth-item"><p class="label">总销量</p><p class="content">{{ detail && detail.total_sell_num }}</p></div>
      <div class="shop-growth-item"><p class="label">总销售额</p><p class="content">{{ detail && detail.total_sell_amount }}</p></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopGrowth',
  props: {
    detail: {
      type: Object
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
  .shop-growth{
    margin-top: 24px;
    .shop-growth-box{
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      border: 1px solid #F4F5F7;
      .shop-growth-item{
        display: flex;
        margin-bottom: 20px;
        &:last-child{
          margin-bottom: 0;
        }
        p{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          line-height: 20px;
          &.label{
            width: 110px;
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
