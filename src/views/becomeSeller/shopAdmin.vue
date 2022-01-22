<template>
  <div class="shop-admin-container">
    <div class="shop-admin-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
      <!-- 店铺成长 -->
      <shop-growth></shop-growth>
    </div>
    <div class="shop-admin-right-container">
      <!-- 商品管理 -->
      <shop-admin-box :detail="detail"></shop-admin-box>
      <div class="shop-tab-container">
        <el-tabs v-model="activeBasic" type="card">
          <el-tab-pane label="在售" name="1">
            <ul class="commodity-list-box">
              <li
                v-for="item in onSaleParams.list"
                :key="item.goods_id"
              >
                <div class="left-commodity-box">
                  <router-link :to="{ path: '/commodityDetail', query: { id: item.goods_id } }">
                    <div class="img-box">
                      <img :src="item.logo" alt="">
                    </div>
                    <div class="info-box">
                      <p class="icon-box" v-if="item.is_admin"><span class="blue-text">[代管]</span><span class="green-text">[自动调度]</span></p>
                      <p class="name">{{ item.title }}</p>
                      <p class="desc">{{ item.type_name }}</p>
                      <p class="see-data"><span>浏览：{{ item.views }}</span><span>销售：{{ item.sell_num }}</span></p>
                      <p class="stock">剩余数量：{{ item.left_amount }}</p>
                    </div>
                  </router-link>
                </div>
                <div class="right-commodity-box">
                  <p class="name">价格</p>
                  <p class="price">¥ {{ item.goods_price }}</p>
                  <p class="exchange-rate">({{ item.btc_price }} BTC)</p>
                  <p class="exchange-rate">({{ item.usdt_price }} USDT)</p>
                  <div class="btn-box">
                    <el-button type="primary" class="remove-btn" @click="handleEditGood(item.goods_id)">修改</el-button>
                    <el-button type="primary" class="remove-btn" @click="handleDownGood(item.goods_id)">下架</el-button>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              class="pagination-box"
              background
              :current-page="onSaleParams.page"
              :page-size="onSaleParams.page_size"
              layout="prev, pager, next, jumper"
              :total="onSaleParams.total"
              @current-change="handleOnSaleChange"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="售磬" name="2">
            <ul class="commodity-list-box">
              <li
                v-for="item in soldOutParams.list"
                :key="item.goods_id"
              >
                <div class="left-commodity-box">
                  <router-link :to="{ path: '/commodityDetail', query: { id: item.goods_id } }">
                    <div class="img-box">
                      <img :src="item.logo" alt="">
                    </div>
                    <div class="info-box">
                      <p class="icon-box" v-if="item.is_admin"><span class="blue-text">[代管]</span><span class="green-text">[自动调度]</span></p>
                      <p class="name">{{ item.title }}</p>
                      <p class="desc">{{ item.type_name }}</p>
                      <p class="see-data"><span>浏览：{{ item.views }}</span><span>销售：{{ item.sell_num }}</span></p>
                      <p class="stock">剩余数量：{{ item.left_amount }}</p>
                    </div>
                  </router-link>
                </div>
                <div class="right-commodity-box">
                  <p class="name">价格</p>
                  <p class="price">¥ {{ item.goods_price }}</p>
                  <p class="exchange-rate">({{ item.btc_price }} BTC)</p>
                  <p class="exchange-rate">({{ item.usdt_price }} USDT)</p>
                  <div class="btn-box">
                    <el-button type="primary" class="remove-btn" @click="handleEditGood(item.goods_id)">修改</el-button>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              class="pagination-box"
              background
              :current-page="soldOutParams.page"
              :page-size="soldOutParams.page_size"
              layout="prev, pager, next, jumper"
              :total="soldOutParams.total"
              @current-change="handleSoldOutChange"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="已下架" name="3">
            <ul class="commodity-list-box">
              <li
                v-for="item in offShelfParams.list"
                :key="item.goods_id"
              >
                <div class="left-commodity-box">
                  <router-link :to="{ path: '/commodityDetail', query: { id: item.goods_id } }">
                    <div class="img-box">
                      <img :src="item.logo" alt="">
                    </div>
                    <div class="info-box">
                      <p class="icon-box" v-if="item.is_admin"><span class="blue-text">[代管]</span><span class="green-text">[自动调度]</span></p>
                      <p class="name">{{ item.title }}</p>
                      <p class="desc">{{ item.type_name }}</p>
                      <p class="see-data"><span>浏览：{{ item.views }}</span><span>销售：{{ item.sell_num }}</span></p>
                      <p class="stock">剩余数量：{{ item.left_amount }}</p>
                    </div>
                  </router-link>
                </div>
                <div class="right-commodity-box">
                  <p class="name">价格</p>
                  <p class="price">¥ {{ item.goods_price }}</p>
                  <p class="exchange-rate">({{ item.btc_price }} BTC)</p>
                  <p class="exchange-rate">({{ item.usdt_price }} USDT)</p>
                  <div class="btn-box">
                    <el-button type="primary" class="remove-btn" @click="handleEditGood(item.goods_id)">修改</el-button>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              class="pagination-box"
              background
              :current-page="offShelfParams.page"
              :page-size="offShelfParams.page_size"
              layout="prev, pager, next, jumper"
              :total="offShelfParams.total"
              @current-change="handleOffShelfChange"
            >
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import shopGrowth from '@/components/shopGrowth.vue'
import shopAdminBox from '@/components/shopAdminBox.vue'
import { getUserId } from '@/utils/auth.js'
import { getMarchantDetail } from '@/api/becomeSeller.js'
import { getGoodsList } from '@/api/good.js'
import bus from '@/bus'
export default {
  name: 'shopAdmin',
  components: {
    accountInfo,
    shopGrowth,
    shopAdminBox
  },
  data () {
    return {
      activeBasic: '1',
      userId: +getUserId() || null,
      detail: null,
      onSaleParams: {
        page: 1,
        page_size: 10,
        mct_status: 1, // 1：在售， 2:售完， 3:下架
        total: 0,
        list: []
      },
      soldOutParams: {
        page: 1,
        page_size: 10,
        mct_status: 2, // 1：在售， 2:售完， 3:下架
        total: 0,
        list: []
      },
      offShelfParams: {
        page: 1,
        page_size: 10,
        mct_status: 3, // 1：在售， 2:售完， 3:下架
        total: 0,
        list: []
      }
    }
  },
  async mounted () {
    this.initBreadcrumb()
    if (this.userId) {
      await this.getUserInfoFn(this.userId)
    }
    await this.getMarchantDetail()
    Promise.all([this.getGoodsList(this.onSaleParams), this.getGoodsList(this.soldOutParams), this.getGoodsList(this.offShelfParams)])
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '商品管理' }
      ])
    },
    async getMarchantDetail () {
      try {
        const res = await getMarchantDetail(this.userInfo.mct_id)
        if (+res.data.code === 2000) {
          this.detail = res.data.data
          return Promise.resolve()
        } else {
          this.$message.error(res.data.msg)
          return Promise.reject(new Error(res.data.msg))
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getGoodsList (pageParams) {
      try {
        const defaultParams = {
          goods_name: '',
          merchant_id: (this.userInfo && this.userInfo.mct_id) || 0, // 默认
          type_id: 0,
          cat_id: 0,
          origin_state_id: 0,
          start_price: 0,
          end_price: 0,
          order_by: 0,
          pay_way: ''
        }
        const params = Object.assign(defaultParams, pageParams)
        const res = await getGoodsList(params)
        if (+res.data.code === 2000) {
          pageParams.list = res.data.data.gds_lst || []
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleOnSaleChange (current) {
      this.onSaleParams.page = current
      this.getGoodsList(this.onSaleParams)
    },
    handleSoldOutChange (current) {
      this.soldOutParams.page = current
      this.getGoodsList(this.soldOutParams)
    },
    handleOffShelfChange (current) {
      this.offShelfParams.page = current
      this.getGoodsList(this.offShelfParams)
    },
    handleEditGood (id) { // 修改
      this.$router.push({
        path: '/editShop',
        query: {
          id
        }
      })
    },
    handleDownGood (id) { // 下架

    }

  }
}
</script>

<style lang="less" scoped>
  .shop-admin-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .shop-admin-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .shop-admin-right-container{
      width: 810px;
      margin-bottom: 30px;
      .shop-tab-container{
        width: 100%;
        margin-top: 20px;
        ::v-deep .el-tabs__item.is-active{
          color: #333;
          background-color: #F0F0F0;
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
      .pagination-box{
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
