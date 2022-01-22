<template>
  <div class="shop-detail-container">
    <div class="shop-detail-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 虚拟币汇率 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="shop-detail-right-container">
      <p class="name-box">店铺主页</p>
      <div class="basic-info-box">
        <div class="basic-left-info-box">
          <div class="img-box">
            <img :src="detail&&detail.logo" alt="img">
          </div>
          <div class="info-box">
            <div class="name-title-box">
              <p>{{ detail && detail.merchant_name || "--"}}</p>
              <!-- <span class="blue">供应商级别2</span>
              <span class="green">信任级别10</span> -->
            </div>
            <p>店铺好评率（12个月内）：{{ detail && detail.shop_score }}%</p>
            <p>加入时间：{{ detail && detail.created_at || "--" }}</p>
            <p>最后一次在线：{{ detail && detail.updated_at || "--" }} </p>
          </div>
        </div>
        <div class="basic-right-info-box">
          <el-button type="primary" @click="goShopDetail">查看店铺</el-button>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="characteristic-shopmall-box">
        <p class="module-title">商品列表</p>
        <div class="characteristic-shopmall-content">
          <ul>
            <li
              v-for="item in goodList"
              :key="item&&item.goods_id"
            >
              <router-link :to="{ path: '/commodityDetail', query: { id: item.goods_id } }">
                <div class="img-box">
                  <img :src="item&&item.logo" alt="project-img">
                </div>
                <p class="price-box"><span class="price">¥{{ item&&item.goods_price }}</span></p>
                <p class="commodity-name">{{ item&&item.title }}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <el-pagination
        background
        class="pagination-box"
        :current-page="searchForm.page"
        :page-size="searchForm.page_size"
        layout="total, prev, pager, next, jumper"
        :total="searchForm.total"
        @current-chang="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getUserId } from '@/utils/auth.js'
import { getMarchantDetail } from '@/api/marchant.js'
import { getGoodsList } from '@/api/good.js'
import bus from '@/bus'
export default {
  name: 'shopDetail',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      activeBasic: '1',
      userId: +getUserId() || null,
      detail: null,
      goodList: [],
      searchForm: {
        goods_name: '',
        type_id: 0,
        merchant_id: +this.$route.query.id,
        start_price: 0,
        end_price: 0,
        cat_id: 0,
        origin_state_id: 0,
        order_by: 0,
        pay_way: '',
        page: 1,
        page_size: 10,
        total: 0
      }
    }
  },
  created () {
    this.initBreadcrumb()
    this.getMarchantDetail()
    this.getGoodsList()
  },
  mounted () {
    if (this.userId) {
      this.getUserInfoFn(this.userId)
    }
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '店铺详情' }
      ])
    },
    goShopDetail () {
      this.$router.push({
        path: '/shopDetail',
        query: {
          id: this.$route.query.id
        }
      })
    },
    async getGoodsList () {
      try {
        const res = await getGoodsList(this.searchForm)
        console.log(res)
        if (+res.data.code === 2000) {
          const data = res.data.data
          this.goodList = data.gds_lst || [] // this.goodList.concat(data.gds_lst)
          this.searchForm.total = data.total
        } else {
          if (res.data.msg) this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.dir(e)
        console.log(e)
      }
    },
    handleSizeChange (current) {
      this.searchForm.page = current
      this.getGoodsList()
    },
    async getMarchantDetail () {
      try {
        const res = await getMarchantDetail(+this.$route.query.id)
        if (+res.data.code === 2000) {
          this.detail = res.data.data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .shop-detail-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
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
    .shop-detail-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .shop-detail-right-container{
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
      .basic-info-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        margin-bottom: 25px;
        .basic-left-info-box{
          display: flex;
          .img-box{
            width: 140px;
            height: 140px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #EEEEEE;
            margin-right: 10px;
            img{
              display: block;
              max-width: 140px;
              max-height: 140px;
            }
          }
          .info-box{
            p{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              margin-bottom: 15px;
            }
            .name-title-box{
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              margin-top: 10px;
              p{
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-right: 10px;
                margin-bottom: 0;
              }
              span{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 20px;
                padding: 0 10px;
                margin-right: 5px;
                border-radius: 10px;
                &.blue{
                  background-color:#1652B5;
                }
                &.green{
                  background-color:#0CA345;
                }

              }
            }
          }
        }
        .basic-right-info-box{
          width: 90px;
          padding-right: 28px;
          display: flex;
          align-items: center;
          ::v-deep .el-button{
            width: 90px;
            height: 30px;
            background: #1652B5;
            border-radius: 15px;
            border-color: #1652B5;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0;
            margin-bottom: 5px;
          }
        }
      }
      .characteristic-shopmall-box{
        width: 100%;
        .characteristic-shopmall-content{
          width: 100%;
          padding: 5px 0;
          padding-top: 10px;
          ul{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            li{
              width: 187px;
              min-height: 200px;
              border: 1px solid #EEEEEE;
              margin-bottom: 15px;
              margin-right: 11.4px;
              &:nth-child(4n+4){
                margin-right: 0;
              }
              .img-box{
                width: 100%;
                height: 130px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  display: block;
                  max-height: 130px;
                  max-width: 187px;
                }
              }
              .price-box{
                padding: 10px 14px 7px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .price{
                  font-size: 20px;
                  font-family: SourceHanSansCN;
                  font-weight: 500;
                  color: #FF4049;
                }
                .label{
                  height: 20px;
                  text-align: center;
                  background: #F0F0F0;
                  font-size: 12px;
                  padding: 0 10px;
                  line-height: 20px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  margin-left: 8px;
                }
              }
              .commodity-name{
                padding: 0 12px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 20px;
                margin-bottom: 7px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .shop-name{
                width: 187px;
                height: 46px;
                box-sizing: border-box;
                padding: 0 13px;
                font-size: 14px;
                line-height: 46px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                border-top: 1px solid #eee;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .see-more-box{
            width: 100%;
            box-sizing: border-box;
            padding: 25px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: bold;
            cursor: pointer;
            &.no-data{
              color: #999;
              cursor: default;
            }

          }
        }
      }
      .pagination-box{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
      }
    }
  }
</style>
