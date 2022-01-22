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
        <p class="title">当前订单</p>
      </div>
      <div class="order-list-container" v-if="orderList.length">
        <div class="order-item"
          v-for="item in orderList"
          :key="item.order_id"
        >
          <p class="title">{{ item.merchant_name }}</p>
          <div class="order-info">
            <div class="left-commodity-box">
              <div class="img-box">
                <img :src="item.goods_logo" alt="">
              </div>
              <div class="info-box">
                <p class="icon-box" v-if="item.is_admin === 1"><span class="blue-text">[代管]</span><span class="green-text">[自动调度]</span></p>
                <p class="name">{{ item.goods_name }}</p>
              </div>
            </div>
            <div class="middle-commodity-box">
              <p>数量：{{ item.pay_cny_price }}</p>
              <p>状态：{{ item.statusName }}</p>
            </div>
            <div class="right-commodity-box">
              <p class="name">买入价格</p>
              <p class="price">¥ {{ item.pay_cny_price }}</p>
              <p class="exchange-rate">({{ item.pay_coin_amount }} {{ item.pay_way === 0 ? 'BTC' : 'USDT' }})</p>
              <div class="btn-box">
                <el-button type="primary" class="remove-btn" @click="handleDetail(item.order_id)">查看详情</el-button>
                <el-button type="primary" class="remove-btn" v-if="item.order_status === 3" @click="handleConfirmGood(item.order_id)">确认收货</el-button>
                <!-- <el-button type="primary" class="remove-btn" v-if="item.order_status === 4">评价</el-button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        class="pagination-box"
        background
        style="display: flex; justify-content: center;"
        :current-page="orderParams.page"
        :page-size="orderParams.page_size"
        layout="prev, pager, next, jumper"
        :total="orderParams.total"
        @current-change="handlepageChange"
        v-if="orderList.length"
      >
      </el-pagination>
      <div class="no-data" v-else>
        <img src="@/assets/images/kong.png" alt="kong">
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getOrderList, confirmGood } from '@/api/good.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'Order',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      userId: +getUserId() || null,
      orderParams: {
        page: 1,
        page_size: 10,
        total: 0
      },
      orderList: []
    }
  },
  mounted () {
    this.initBreadcrumb()
    this.getOrderList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '当前订单' }
      ])
    },
    // 订单状态
    // OrderStatusNoPay       = 0  // 未支付
    // OrderStatusPaySuccess  = 1  // 支付成功
    // OrderStatusPayFailure  = 2  // 支付失败
    // OrderStatusSendGoods   = 3  // 已发货
    // OrderStatusRecvGoods   = 4  // 已经收货
    // OrederReturnGoods      = 5  // 退货换货
    // OrederReturnSellerRjt  = 6  // 卖家拒绝
    // OrederReturnSellerAcpt = 7  // 卖家同意
    // OrederBuyerAppoval     = 8  // 买家申诉
    // OrederAppovalSuccess   = 9  // 订单申诉成功
    // OrederSellerReturnMny  = 10 // 卖家已退款
    // OrederFinish           = 11 // 已完成
    async getOrderList () {
      try {
        const params = {
          page: this.orderParams.page,
          page_size: this.orderParams.page_size,
          user_id: this.userId,
          order_status: -1
        }
        const res = await getOrderList(params)
        if (+res.data.code === 2000) {
          this.orderList = (res.data.data.order_lst && res.data.data.order_lst.map(item => {
            switch (item.order_status) {
              case 0:
                item.statusName = '未支付'
                break
              case 1:
                item.statusName = '支付成功'
                break
              case 2:
                item.statusName = '支付失败'
                break
              case 3:
                item.statusName = '已发货'
                break
              case 4:
                item.statusName = '已经收货'
                break
              case 5:
                item.statusName = '退货/换货'
                break
              case 6:
                item.statusName = '卖家已拒绝'
                break
              case 7:
                item.statusName = '卖家已同意'
                break
              case 8:
                item.statusName = '买家已申诉'
                break
              case 9:
                item.statusName = '订单申诉成功'
                break
              case 10:
                item.statusName = '已退款'
                break
              case 11:
                item.statusName = '已完成'
                break
              default:
                item.statusName = ''
                break
            }
            return item
          })) || []
          this.orderParams.toal = res.data.data.total
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handlepageChange (current) {
      this.orderParams.page = current
      this.getOrderList()
    },
    handleDetail (id) {
      // console.log(id)
      this.$router.push({
        path: '/orderDetail',
        query: {
          id
        }
      })
    },
    async confirmGood (id) {
      try {
        const res = await confirmGood({
          order_id: +id
        })
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.getOrderList()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleConfirmGood (id) {
      this.$confirm('确定进行确认收货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmGood(id)
      })
    }
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
            display: flex;
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
            flex-direction: column;
            justify-content: center;
            p{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #333333;
              margin: 5px;
            }
          }
          .right-commodity-box{
            width: 200px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
              justify-content: flex-end;
            }
            .remove-btn{
              width: 90px;
              height: 30px;
              background: #1652B5;
              border-radius: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 14px 10px 0;
              margin-left: 10px;
            }
          }

        }
      }
    }
  }
</style>
