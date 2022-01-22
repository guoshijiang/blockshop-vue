<template>
  <div class="place-order-container">
    <div class="place-order-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
    </div>
    <div class="place-order-right-container">
      <p class="name-box">订单详情</p>
      <div class="address-box">
        <div class="address-left-box"><i class="el-icon-location-information"></i></div>
        <div class="address-right-box">
          <el-form label-position="left" label-width="100px">
            <el-form-item label="收货人：" prop="name">
              <p class="info-text">{{ detail && detail.rec_user || "--" }}</p>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <p class="info-text">{{ detail && detail.rec_phone || "--" }}</p>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
              <p class="info-text">{{ detail && detail.rec_address || "--" }}</p>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <img src="@/assets/images/tiao.png" alt="tiao" class="line-box">
      <div class="shop-info-box">
        <div class="shop-name">{{ detail && detail.merchant_name }}</div>
          <ul class="commodity-list-box">
            <li>
              <div class="left-commodity-box">
                <router-link to="/">
                  <div class="img-box">
                    <img :src="detail&&detail.goods_logo" alt="">
                  </div>
                  <div class="info-box">
                    <p class="icon-box"><span class="blue-text" v-if="detail&&+detail.is_admin===1">[代管]</span><span class="green-text"></span></p>
                    <p class="name">{{ detail && detail.goods_title || "--"}}</p>
                    <p class="desc">{{ detail && detail.goods_name || "--" }}</p>
                  </div>
                </router-link>
              </div>
              <div class="right-commodity-box">
                <p class="name">商品总金额： ¥{{ detail && detail.pay_cny_price }}</p>
                <p class="name">数量：{{ detail && detail.buy_nums }}</p>
                <!-- <p class="name">运费：包邮</p> -->
              </div>
            </li>
          </ul>
          <div class="price-info-box">
            <div class="price-info-item end pay-price">
              <p>应付总额：<span class="red">{{ detail && detail.pay_coin_amount }}{{ detail && detail.pay_way_name }}</span></p>
            </div>
            <div class="price-info-item order-info">
              <p>订单编号：{{ detail && detail.order_number }}</p>
              <p>下单时间：{{ detail && detail.create_time }}</p>
              <p>订单状态：{{ detail && detail.statusName }}</p>
              <p v-if="detail && detail.ship_number">快递单号：{{ detail && detail.ship_number }}</p>
            </div>

            <div class="price-info-item order-info" v-if="detail && detail.order_status >= 5 && detail.order_status <= 10 && detail.retrurn_order">
              <p>退/换货状态：{{ detail.cancleName }}</p>
              <p>退/换货进度：{{ detail.retrurn_order.processName }}</p>
              <p>联系人：{{ detail.retrurn_order.return_user }}</p>
              <p>联系电话：{{ detail.retrurn_order.return_phone }}</p>
              <p>退货地址：{{ detail && detail.retrurn_order.return_address }}</p>
              <p>退货金额：{{ detail && detail.retrurn_order.return_amount }}{{ detail && detail.pay_way_name }}</p>
              <p>描述：{{ detail && detail.retrurn_order.question_des }}</p>
              <p v-if="detail && detail.ship_number">快递单号：{{ detail && detail.ship_number }}</p>
            </div>
            <div class="price-info-item end btn-box">
              <!-- <el-button class="btn refund" v-if="detail && (detail.order_status === 2 || detail.order_status === 4)">退款</el-button>
              <el-button class="btn confirm-btn" v-if="detail && detail.order_status === 4">确认收货</el-button>
              <el-button class="btn confirm-btn" v-if="detail && detail.order_status === 5" @click="handle">评论</el-button> -->
              <el-button
                class="btn confirm-btn"
                v-if="
                  detail &&
                  (
                    detail.order_status === 0 ||
                    detail.order_status === 2
                  )
                "
                @click="payOrder"
              >支付</el-button>
              <el-button
                class="btn confirm-btn"
                v-if="
                  detail &&
                  (
                    detail.order_status === 3
                  )
                "
                @click="handleConfirmGood"
              >确认收货</el-button>
              <el-button
                class="btn confirm-btn"
                v-if="
                  detail &&
                  (
                    detail.order_status === 1 ||
                    detail.order_status === 3
                  )
                "
                @click="goOrderBack"
              >退/换货</el-button>
              <el-button
                class="btn confirm-btn"
                v-if="
                  detail &&
                  (
                    detail.order_status === 5
                  )
                "
                @click="handleCancleOrderBack"
              >撤销退/换货</el-button>
              <el-button
                class="btn confirm-btn"
                v-if="
                  detail &&
                  (
                    detail.order_status === 7
                  )
                "
                @click="dialogFormVisible = true"
              >添加快递单号</el-button>
              <el-button
                class="btn confirm-btn"
                v-if="
                  detail &&
                  (
                    detail.order_status === 6
                  )
                "
                @click="dialogApprovalVisible = true"
              >申述</el-button>
              <el-button
                class="btn confirm-btn"
                v-if="
                  detail &&
                  (
                    detail.order_status === 4
                  )
                "
                @click="handleComment"
              >评价</el-button>
            </div>
          </div>
      </div>
    </div>
    <el-dialog title="发快递" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="快递单号" label-width="100px">
          <el-input v-model="ret_ship_number" autocomplete></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShip">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="订单申述" :visible.sync="dialogApprovalVisible">
      <el-form>
        <el-form-item label="申述原因" label-width="100px">
          <el-input v-model="adjust_content" autocomplete type="textarea" :row="3" clearable resize="none"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogApprovalVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleGoodsApproval">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import { getOrderDetail, confirmGood, payOrder, cancleOrderBack, addShip, orderApproval } from '@/api/good.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'placeOrder',
  components: { accountInfo },
  data () {
    return {
      detail: null,
      userId: +getUserId() || null,
      order_id: this.$route.query.id,
      dialogFormVisible: false,
      dialogApprovalVisible: false,
      ret_ship_number: '',
      adjust_content: ''
    }
  },
  created () {
    this.initBreadcrumb()
  },
  mounted () {
    this.initOrderDetail()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '订单详情' }
      ])
    },
    async initOrderDetail () {
      try {
        const params = {
          order_id: +this.order_id,
          is_cancle: 0
        }
        const res = await getOrderDetail(params)
        if (+res.data.code === 2000) {
          this.detail = res.data.data
          this.detail.pay_way_name = res.data.data.pay_way ? 'USDT' : 'BTC'
          switch (this.detail.is_cancle) {
            case 0:
              this.detail.cancleName = '正常'
              break
            case 1:
              this.detail.cancleName = '退货中'
              break
            case 2:
              this.detail.cancleName = '换货中'
              break
            case 3:
              this.detail.cancleName = '退货成功'
              break
            case 4:
              this.detail.cancleName = '换货成功'
              break
            default:
              break
          }
          //           ProcessWaitSellerConfirm       = 0  // 等待卖家确认
          //  ProcesSellerAgree              = 1  // 卖家已同意
          //  ProcesSellerReject             = 2  // 卖家拒绝
          //  ProcesBuyerApproval            = 3  // 买家发起申诉
          //  ProcesPlatformHandle           = 4  // 平台处理申诉; 如果打回申诉，直接到完成，如果商家有问题，等待买家邮寄
          //  ProcesBuyerPost                = 5  // 买家已发货，等待卖家收货
          //  ProcesSellerPost               = 6  // 卖家已经收货，换货情况卖家发出新货,等待买家收货
          //  ProcesBuyerRecvGoods           = 7  // 买家收到货
          //  ProcesSellerReturnMny          = 8  // 卖家已退款
          //  ProcesFinish         = 9  // 完成
          if (this.detail.retrurn_order) {
            switch (this.detail.retrurn_order.process) {
              case 0:
                this.detail.retrurn_order.processName = '等待卖家确认'
                break
              case 1:
                this.detail.retrurn_order.processName = '卖家已同意'
                break
              case 2:
                this.detail.retrurn_order.processName = '卖家拒绝'
                break
              case 3:
                this.detail.retrurn_order.processName = '买家发起申诉'
                break
              case 4:
                this.detail.retrurn_order.processName = '平台处理申诉'
                break
              case 5:
                this.detail.retrurn_order.processName = '买家已发货，等待卖家收货'
                break
              case 6:
                this.detail.retrurn_order.processName = '卖家已经收货'
                break
              case 7:
                this.detail.retrurn_order.processName = '买家收到货'
                break
              case 8:
                this.detail.retrurn_order.processName = '卖家已退款'
                break
              case 9:
                this.detail.retrurn_order.processName = '完成'
                break
              default:
                this.detail.retrurn_order.processName = ''
                break
            }
          }
          switch (this.detail.order_status) {
            case 0:
              this.detail.statusName = '未支付'
              break
            case 1:
              this.detail.statusName = '支付成功'
              break
            case 2:
              this.detail.statusName = '支付失败'
              break
            case 3:
              this.detail.statusName = '已发货'
              break
            case 4:
              this.detail.statusName = '已经收货'
              break
            case 5:
              this.detail.statusName = '退货/换货'
              break
            case 6:
              this.detail.statusName = '卖家已拒绝'
              break
            case 7:
              this.detail.statusName = '卖家已同意'
              break
            case 8:
              this.detail.statusName = '买家已申诉'
              break
            case 9:
              this.detail.statusName = '订单申诉成功'
              break
            case 10:
              this.detail.statusName = '已退款'
              break
            case 11:
              this.detail.statusName = '已完成'
              break
            default:
              this.detail.statusName = ''
              break
          }
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log()
      }
    },
    async confirmGood () { // 确认收货
      try {
        const res = await confirmGood({
          order_id: this.detail && this.detail.order_id
        })
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.initOrderDetail()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleConfirmGood () {
      this.$confirm('确定进行确认收货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmGood()
      })
    },
    async payOrder () { // 支付
      try {
        const params = {
          order_id: this.detail && this.detail.order_id,
          pay_way: this.detail && this.detail.pay_way,
          pay_coin_amount: this.detail && this.detail.pay_coin_amount
        }
        const res = await payOrder(params)
        if (+res.data.code === 2000) {
          this.$message.success('支付成功')
          this.initOrderDetail()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleComment () {
      this.$router.push({
        path: '/publishComment',
        query: {
          goodsId: this.detail && this.detail.goods_id,
          orderId: this.detail && this.detail.order_id,
          merchantId: this.detail && this.detail.merchant_id
        }
      })
    },
    goOrderBack () {
      this.$router.push({
        path: '/orderBack',
        query: {
          id: this.detail && this.detail.order_id
        }
      })
    },
    async cancleOrderBack () {
      try {
        const res = await cancleOrderBack({
          order_id: this.detail && this.detail.order_id
        })
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.initOrderDetail()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleCancleOrderBack () {
      this.$confirm('确定撤销退/换货申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancleOrderBack()
      })
    },
    async addShip () {
      try {
        const res = await addShip({
          order_id: this.detail && this.detail.order_id,
          ret_ship_number: this.ret_ship_number
        })
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.dialogFormVisible = false
          this.initOrderDetail()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleGoodsApproval () {
      try {
        const res = await orderApproval({
          order_id: this.detail && this.detail.order_id,
          adjust_content: this.adjust_content
        })
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.dialogApprovalVisible = false
          this.initOrderDetail()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .place-order-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 60px;
    .place-oeder-left-container{
      width: 380px;
      margin-bottom: 35px;
    }
    .place-order-right-container{
      width: 791px;
      .name-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-top: 10px;
        padding-bottom: 18px;
        border-bottom: 1px solid #F0F0F0;
      }
      .address-box{
        font-size: 30px;
        color: #BFBFBF;
        display: flex;
        .address-left-box{
          padding: 50px 30px;
        }
        .address-right-box{
          width: 600px;
          padding: 17px 0 34px;
          .info-text{
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #282828;
          }
        }
      }
      .line-box{
        display: block;
        width: 100%;
      }
      .shop-info-box{
        width: 100%;
        .shop-name{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #010101;
          line-height: 54px;
          padding: 12px 0;
          border-bottom: 1px solid #F0F0F0;
        }
        .commodity-list-box{
          width: 100%;
          li{
            width: 100%;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding-right: 20px;
            padding-top: 14px;
            padding-bottom: 20px;
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
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .name{
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #343434;
              }
            }
          }
        }
        .price-info-box{
          width: 100%;
          .price-info-item{
            width: 791px;
            box-sizing: border-box;
            padding: 0 34px;
            display: flex;
            &.between{
              justify-content: space-between;
            }
            &.end{
              justify-content: flex-end;
            }
            &.price{
              margin-bottom: 40px;
            }
            &.freight{
              margin-bottom: 80px;
            }
            &.total-price{
              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #999999;
              line-height: 54px;
              p{
                margin-left: 80px;
              }
              span.red{
                color: #E12218;
              }
              span.black{
                color: #222222;
              }
            }
            &.pay-price{
              width: 100%;
              height: 50px;
              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #999999;
              line-height: 50px;
              .red{
                color: #E12218;
              }
            }
            &.btn-box{
              .btn{
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #FFFFFF;
                margin: 20px;
                &.refund{
                  background-color: #F5F5F5;
                  color: #222;
                }
                &.confirm-btn{
                  background-color: #E12218;
                  color: #fff;
                }
              }
            }
            &.order-info{
              background: #F5F5F5;
              padding: 28px 34px;
              flex-direction: column;
              justify-content: space-between;
              margin-bottom: 20px;
              p{
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #222222;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
</style>
