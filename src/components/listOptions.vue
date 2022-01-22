<template>
  <div class="detailed-list-2">
    <p class="module-title">清单选项</p>
    <div class="detailed-list-2-content">
      <ul>
        <li><router-link to="/order" :class="{'active': this.$route.path === '/order'}">当前订单</router-link></li>
        <!-- <li><router-link to="/fileOrder" :class="{'active': this.$route.path === '/fileOrder'}">存档订单</router-link></li> -->
        <li><router-link to="/collectionCommodity" :class="{'active': this.$route.path === '/collectionCommodity'}">收藏的商品</router-link></li>
        <li><router-link to="/collectionShop" :class="{'active': this.$route.path === '/collectionShop'}">收藏的店</router-link></li>
        <li><router-link to="/blockList" :class="{'active': this.$route.path === '/blockList'}">屏蔽名单</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

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
  .detailed-list-2{
    width: 100%;
    margin-bottom: 5px;
    .detailed-list-2-content{
      width: 100%;
      box-sizing: border-box;
      padding: 30px 22px;
      border: 1px solid #F4F5F7;
    }
    ul{
      width: 100%;
      li{
        width: 100%;
        a{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          &.active{
            color: #1652B5;
            border-bottom: 1px solid #1652B5;
          }
        }
        margin-bottom: 28px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
