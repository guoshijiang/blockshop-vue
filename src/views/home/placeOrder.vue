<template>
  <div class="place-order-container">
    <div class="place-order-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
    </div>
    <div class="place-order-right-container">
      <div class="name-box">
        <p class="title">填写并核对订单信息</p>
        <p class="btn" @click="dialogTableVisible = true">选择历史地址</p>
      </div>
      <div class="address-box">
        <div class="address-left-box"><i class="el-icon-location-information"></i></div>
        <div class="address-right-box">
          <el-form :model="addressForm" :rules="addressRules" ref="addressForm" label-position="left" label-width="100px">
            <el-form-item label="收货人：" prop="name">
              <el-input v-model="addressForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="addressForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
              <el-input v-model="addressForm.address"></el-input>
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
                    <img src="https://iph.href.lu/109x70?fg=666666&bg=cccccc" alt="">
                  </div>
                  <div class="info-box">
                    <p class="icon-box"><span class="green-text">[{{ detail && detail.mark || "--"  }}]</span></p>
                    <p class="name">{{ detail && detail.title || '--'}}</p>
                    <p class="desc">{{ detail && detail.serveice || "--" }}</p>
                  </div>
                </router-link>
              </div>
              <div class="right-commodity-box">
                <p class="name">数量：{{ detail && detail.buy_number || 0 }}</p>
              </div>
            </li>
          </ul>
          <div class="price-info-box">
            <div class="price-info-item between price">
              <p>商品金额</p>
              <p>¥{{ detail&&detail.goods_price }}</p>
            </div>
            <!-- <div class="price-info-item between freight">
              <p>运费</p>
              <p>包邮</p>
            </div> -->
            <div class="price-info-item end total-price">
              <p><span class="red">{{ detail && detail.buy_number || 0 }}</span>件商品</p>
              <p>商品总金额：<span class="black">￥ {{ totalCnyPrice }}</span></p>
            </div>
            <div class="price-info-item end pay-price">
              <p>应付总额：<span class="red">{{ totalCoinAmount }}{{ detail && detail.buy_type.toUpperCase() }}</span></p>
            </div>
            <div class="price-info-item end btn-box">
              <el-button class="btn" @click="handleCreateOrder">提交订单</el-button>
            </div>
          </div>
      </div>
    </div>
    <el-dialog title="历史收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="user_name" label="收货人" width="150"></el-table-column>
        <el-table-column property="phone" label="手机号" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div class="btn-box">
              <el-button @click="handleSelectAddress(scope.row)" type="primary">选择</el-button>
              <el-button @click="handleDeleteAddress(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import { createOrder, payOrder, addAddress, getAddressList, deleteAddress, updateAddress } from '@/api/good.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'placeOrder',
  components: { accountInfo },
  data () {
    return {
      addressForm: {
        name: '',
        phone: '',
        address: ''
      },
      selectAddress: null,
      addressRules: {
        name: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        address: [{ required: true, message: '请输入收货地址', trigger: 'blur' }]
      },
      detail: null,
      address_id: 0,
      order_id: 0,
      userId: +getUserId() || null,
      dialogTableVisible: false,
      gridData: []
    }
  },
  computed: {
    totalCnyPrice () {
      if (!this.detail) return 0
      return this.detail.goods_price * (+this.detail.buy_number)
    },
    totalCoinAmount () {
      if (!this.detail) return 0
      return this.detail[`${this.detail.buy_type}_price`] * (+this.detail.buy_number)
    }
  },
  created () {
    this.initBreadcrumb()
  },
  mounted () {
    this.initDetail()
    this.getAddressList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '提交订单' }
      ])
    },
    initDetail () {
      this.detail = JSON.parse(sessionStorage.getItem('detail'))
      if (!this.detail) {
        this.$router.replace({
          path: '/'
        })
      }
    },
    async handlePay () {
      try {
        if (!this.selectAddress) {
          this.address_id = await this.addAddress()
        } else {
          // 添加这一步是为了防止用户选完地址后又在列表删除了这一地址
          const selectAddress = this.gridData.filter(({ id }) => id === this.selectAddress.id)
          if (selectAddress.length) {
            this.address_id = selectAddress[0].id
            if (
              this.addressForm.name !== selectAddress[0].user_name ||
              this.addressForm.phone !== selectAddress[0].phone ||
              this.addressForm.address !== selectAddress[0].address
            ) {
              this.updateAddress()
            }
          } else {
            this.address_id = await this.addAddress()
          }
        }
        this.order_id = await this.createOrder()
        await this.payOrder()
        this.goOrderDetail()
      } catch (e) {
        console.log(e)
      }
    },
    async addAddress () {
      try {
        if (this.address_id) return Promise.resolve(true)
        const params = {
          user_id: this.userId,
          user_name: this.addressForm.name,
          phone: this.addressForm.phone,
          address: this.addressForm.address,
          is_set: 0
        }
        const res = await addAddress(params)
        if (+res.data.code === 2000) {
          return Promise.resolve(res.data.data.id)
        } else {
          this.$message.error(res.data.msg)
          return Promise.reject(new Error('地址保存失败'))
        }
      } catch (e) {

      }
    },
    async getAddressList () {
      try {
        const params = {
          user_id: this.userId
        }
        const res = await getAddressList(params)
        if (+res.data.code === 2000) {
          this.gridData = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async deleteAddress (id) {
      try {
        const params = {
          address_id: id
        }
        const res = await deleteAddress(params)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.getAddressList()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async updateAddress () {
      try {
        const params = {
          address_id: this.selectAddress.id,
          user_name: this.addressForm.name,
          phone: this.addressForm.phone,
          address: this.addressForm.address,
          is_set: 0
        }
        const res = await updateAddress(params)
        if (+res.data.code === 2000) {
          this.getAddressList()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async createOrder () {
      try {
        const params = {
          goods_id: (this.detail && this.detail.id) || 0,
          address_id: this.address_id,
          user_id: this.userId,
          buy_nums: (this.detail && +this.detail.buy_number) || 0, // 购买数量 0:BTC支付，1:USDT支付
          pay_way: this.detail.buy_type === 'btc' ? 0 : 1, // 支付方式
          pay_cny_price: this.totalCnyPrice, // 支付的人民币金额
          pay_coin_amount: this.totalCoinAmount, // 支付的币种个数
          goods_attr: (this.detail && JSON.stringify(this.detail.goods_attr)) || '{}'
        }
        const res = await createOrder(params)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          return Promise.resolve(res.data.data.id)
        } else {
          this.$message.error(res.data.msg)
          return Promise.reject(new Error('订单创建失败'))
        }
      } catch (e) {
        console.log(e)
      }
    },
    async payOrder () {
      try {
        if (!this.order_id) return this.$message.error('订单创建失败，无法完成支付！')
        const params = {
          order_id: this.order_id,
          pay_way: this.detail.buy_type === 'btc' ? 0 : 1,
          pay_coin_amount: this.totalCoinAmount
        }
        const res = await payOrder(params)
        if (+res.data.code === 2000) {
          this.$message.success('支付成功')
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    goOrderDetail () {
      this.$router.replace({
        path: '/orderDetail',
        query: {
          id: this.order_id
        }
      })
    },
    handleCreateOrder () {
      try {
        this.$refs.addressForm.validate((valid) => {
          if (!valid) return false
          this.handlePay()
        })
      } catch (e) {
        console.log(e)
      }
    },
    handleSelectAddress (row) {
      this.selectAddress = row
      this.addressForm.name = row.user_name
      this.addressForm.phone = row.phone
      this.addressForm.address = row.address
      this.dialogTableVisible = false
    },
    handleDeleteAddress (id) {
      this.$confirm('确认删除此收获地址吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteAddress(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    .place-oeder-left-container{
      width: 380px;
      margin-bottom: 35px;
    }
    .place-order-right-container{
      width: 791px;
      .name-box{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 10px 10px 18px;
        border-bottom: 1px solid #F0F0F0;
        .title{
          font-size: 18px;
          line-height: 20px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .btn{
          font-size: 18px;
          line-height: 20px;
          font-family: PingFang SC;
          color: #1652B5;
          cursor: pointer;
        }
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
              display: flex;
              justify-content: center;
              align-items: center;
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
              height: 81px;
              background: #F7F7F7;
              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #999999;
              line-height: 81px;
              .red{
                color: #E12218;
              }
            }
            &.btn-box{
              .btn{
                width: 120px;
                height: 40px;
                background: #E12218;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #FFFFFF;
                margin: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>
