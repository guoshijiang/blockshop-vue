<template>
  <div class="collection-commodity-container">
    <div class="collection-commodity-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="collection-commodity-right-container">
      <div class="title-box">
        <p class="title">收藏</p>
      </div>
      <ul class="commodity-list-box">
        <li
          v-for="item in comList"
          :key="item.gds_collect_id"
        >
          <div class="left-commodity-box">
            <router-link :to="{ path: '/commodityDetail', query: { id: item.goods_id } }">
              <div class="img-box">
                <img :src="item.goods_logo" alt="">
              </div>
              <div class="info-box">
                <p class="icon-box" v-if="item.is_admin"><span class="blue-text">[代管]</span><span class="green-text">[自动调度]</span></p>
                <p class="name">{{ item.goods_title }}</p>
                <p class="desc">{{ item.goods_name }}</p>
                <p class="see-data"><span>浏览：{{ item.views }}</span><span>销售：{{ item.sell_num }}</span></p>
                <p class="stock">剩余数量：{{ item.left_num }}</p>
              </div>
            </router-link>
          </div>
          <div class="right-commodity-box">
            <p class="name">买入价格</p>
            <p class="price">¥ {{ item.goods_price }}</p>
            <p class="exchange-rate">({{ item.goods_btc_amount }} BTC)</p>
            <p class="exchange-rate">({{ item.goods_usdt_amount }} USDT)</p>
            <el-button type="primary" class="remove-btn" @click="removeGoodsCollect(item.gds_collect_id)">移除</el-button>
          </div>
        </li>
      </ul>
      <el-pagination
        class="pagination-box"
        background
        style="display: flex; justify-content: center;"
        :current-page="pageParams.page"
        :page-size="pageParams.page_size"
        layout="prev, pager, next, jumper"
        :total="pageParams.total"
        @current-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getUserId } from '@/utils/auth.js'
import { getGoodsCollectList, removeGoodsCollect } from '@/api/news.js'
import bus from '@/bus'
export default {
  name: 'collection-commodity',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      userId: +getUserId() || null,
      comList: [],
      pageParams: {
        page: 1,
        page_size: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.initBreadcrumb()
    this.getGoodsCollectList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '收藏商品' }
      ])
    },
    async getGoodsCollectList () {
      try {
        const res = await getGoodsCollectList(this.pageParams)
        if (res.data.code === 2000) {
          this.comList = res.data.data.data || []
          this.pageParams.total = res.data.data.total
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async removeGoodsCollect (id) {
      try {
        const res = await removeGoodsCollect({
          goods_collec_id: id
        })
        if (res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.getGoodsCollectList()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (current) {
      this.pageParams.page = current
      this.getGoodsCollectList()
    }
  }
}
</script>

<style lang="less" scoped>
  .collection-commodity-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .collection-commodity-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .collection-commodity-right-container{
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
      .commodity-list-box{
        width: 100%;
        margin-top: 10px;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding-right: 20px;
          padding-bottom: 20px;
          margin-bottom: 30px;
          border-bottom: 1px solid #F0F0F0;
          .left-commodity-box{
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
              .desc{
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #343434;
                margin-bottom: 7px;
              }
              .see-data{
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #343434;
                margin-bottom: 7px;
                span{
                  margin-right: 30px;
                }
              }
              .stock{
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #343434;
              }
            }
          }
          .right-commodity-box{
            .name{
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              margin-bottom: 4px;
            }
            .price{
              font-size: 20px;
              font-family: SourceHanSansCN;
              font-weight: 500;
              color: #EC5151;
              margin-bottom: 10px;
            }
            .exchange-rate{
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              line-height: 16px;
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
            }
          }
        }
      }
    }
  }
</style>
