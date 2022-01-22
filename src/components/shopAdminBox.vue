<template>
  <div class="shop-admin-box">
    <div class="title-box">
      <p class="title">商品管理</p>
      <p class="more"><router-link to="/shopAdmin" v-if="this.$route.path === '/orderAdmin'">更多</router-link></p>
    </div>
    <div class="shop-admin-content">
      <div class="shop-admin-item">
        <p class="title">在售中</p>
        <p class="num">{{ detail && detail.goods_stat.on_sale_num }}</p>
      </div>
      <div class="shop-admin-item">
        <p class="title">已售罄</p>
        <p class="num">{{ detail && detail.goods_stat.sold_out_num }}</p>
      </div>
      <div class="shop-admin-item">
        <p class="title">已下架</p>
        <p class="num">{{ detail && detail.goods_stat.off_shelf_num }}</p>
      </div>
      <div class="shop-admin-item">
        <router-link to="/addShop">
          <div class="publish-btn" >+</div>
        </router-link>
        <p class="num">发布新商品</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopAdminBox',
  props: {
    detail: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
  .shop-admin-box{
    width: 100%;
    .title-box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 26px;
      box-sizing: border-box;
      padding: 0 20px;
      border-bottom: 1px solid #F0F0F0;
      p.title{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 14px;
      }
    }
    .shop-admin-content{
      width: 100%;
      padding: 28px 60px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .shop-admin-item{
        width: 25%;
        .title{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666666;
          text-align: center;
        }
        .num{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #000000;
          margin-top: 10px;
          text-align: center;
        }
        .publish-btn{
          width: 50px;
          height: 50px;
          background: #FFFFFF;
          border: 1px dashed #B5B5B5;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 21px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #B5B5B5;
          cursor: pointer;
        }
      }
    }
  }
</style>
