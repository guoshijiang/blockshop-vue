<template>
  <div class="account-balance-container">
    <div class="account-balance-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
      <!-- 虚拟币汇率 -->
      <exchange-rate></exchange-rate>
    </div>
    <div class="account-balance-right-container">
      <div class="hint-text">
        <span></span>
        <img src="@/assets/images/jinggao.png" alt="jinggao">
        <p>
          确保你不是在钓鱼链接！钓鱼网站的外观和功能与世界市场完全一样，但会改变存款地址。<br />
          始终验证您的存款地址的PGP签名。
        </p>
      </div>
      <div class="hint-box">
        <p>比特币变得越来越不可靠。由于比尔特钱币的收费继续飙升，这意味着如果你使用低网络费，可能要花费很长时间才能在世界市场上确认</p>
        <p>世界市场只处理至少1次确认的付款。不要创建您的事务仍然“挂起”的票证。您可以在Blockchaincom或其他地方对交易进行淡化</p>
      </div>
      <el-tabs v-model="active">
        <el-tab-pane
          v-for="item in walletList"
          :key="item.id"
          :label="item.asset_name"
          :name="`${item.id}`"
        >
        </el-tab-pane>
      </el-tabs>
          <div class="title-box">
              <p class="left-title">比特币存款和提款</p>
              <p class="right-title"><span>CNY</span>{{ this.coin_to_cny }}</p>
            </div>
            <p class="desc-box">在这里你可以管理余额，存款和提款。这是不收费的。</p>
            <p class="fund-title-box">存款基金</p>
            <div class="fund-content-box">
              <div class="left-fund-box">
                <p>若要寄出资金，请将比特币发送到余额以下的地址，在2次忏悔后，比特币将在30分钟内完成付款。地址可以在每次押金之间更改，所以请始终将存款到最新的地址。你想存多少都可以。</p>
                <p>如果您发送比特币到一个网络钓鱼地址，硬币将不会记入您的帐户，因此，检查PGP签署的所有权证明。</p>
              </div>
              <div class="right-fund-box" ref="qrcode"></div>
            </div>
            <p class="code-box">{{ this.walletDeposit && this.walletDeposit.address }}</p>
            <div class="pgp-box">
              <p class="pgp-title">获得PGP签署的所有权证明</p>
              <p class="pgp-content">为了获得更多的隐私，我们欢迎您直接从一个翻滚或模糊的服务中存放比特币。请注意，如果您在48小时内没有登录，而且您从未将硬币发送到该地址，则在保存之前再次检查余额页，因为由于安全原因，该地址将与您的帐户断开链接，您将需要生成一个新地址。</p>
            </div>
            <div class="table-box">
              <div class="table-title">交易</div>
              <el-table
                :data="walletRecordList"
                :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
              >
                <el-table-column
                  prop="id"
                  align="center"
                  label="ID"
                >
                </el-table-column>
                <el-table-column
                  prop="w_or_d_name"
                  align="center"
                  label="类型"
                >
                </el-table-column>
                <el-table-column
                  prop="asset_name"
                  align="center"
                  label="币种"
                >
                </el-table-column>
                <el-table-column
                  prop="to_address"
                  align="center"
                  label="转入地址"
                >
                </el-table-column>
                <el-table-column
                  prop="from_address"
                  align="center"
                  label="转出地址"
                >
                </el-table-column>
                <el-table-column
                  prop="amount"
                  align="center"
                  label="收到金额"
                >
                </el-table-column>
                <el-table-column
                  prop="created_at"
                  align="center"
                  label="请求日期"
                >
                </el-table-column>
                <el-table-column
                  prop="statusName"
                  align="center"
                  label="状态"
                >
                </el-table-column>
              </el-table>
            </div>
            <div class="extract-box">
              <p class="extract-title">提取金额</p>
              <div class="extract-content">
                <p class="title">您的比特币地址和您希望在下面提取的金额，如果您忘记了您的PIN，您可以在这里请求PIN重置。</p>
                <p class="title">您的余额：{{ (this.mustSelectWallet && this.mustSelectWallet.total_amount) || 0 }}{{ this.mustSelectWallet && this.mustSelectWallet.asset_name }}（CNY：{{ this.mustSelectWallet && this.mustSelectWallet.cny_price }})</p>
                <div class="form-box">
                  <el-form :model="ticketForm" ref="ticketForm" :rules="ticketFormRules">
                    <el-form-item :label="`${this.mustSelectWallet && this.mustSelectWallet.asset_name}地址：`" prop="btc">
                      <el-input v-model="ticketForm.btc"></el-input>
                    </el-form-item>
                    <el-form-item label="金额：" prop="price">
                      <el-input v-model="ticketForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="六位PIN：" prop="pin">
                      <el-input v-model="ticketForm.pin" type="password" show-password></el-input>
                    </el-form-item>
                    <div class="verification-code-box">
                      <verification-code ref="verificationCode" :code="ticketForm.verificationCode"></verification-code>
                    </div>
                    <el-form-item label="验证码：" prop="verificationCode">
                      <el-input v-model="ticketForm.verificationCode" placeholder="请输入验证码" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" class="send-btn" @click="handleWalletWithdraw">审核提取</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <div class="table-box">
              <div class="table-title">待提款</div>
              <el-table
                :data="tableData"
                :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
              >
                <el-table-column
                  prop="id"
                  align="center"
                  label="ID"
                >
                </el-table-column>
                <el-table-column
                  prop="w_or_d_name"
                  align="center"
                  label="类型"
                >
                </el-table-column>
                <el-table-column
                  prop="asset_name"
                  align="center"
                  label="币种"
                >
                </el-table-column>
                <el-table-column
                  prop="to_address"
                  align="center"
                  label="转入地址"
                >
                </el-table-column>
                <el-table-column
                  prop="from_address"
                  align="center"
                  label="转出地址"
                >
                </el-table-column>
                <el-table-column
                  prop="amount"
                  align="center"
                  label="收到金额"
                >
                </el-table-column>
                <el-table-column
                  prop="created_at"
                  align="center"
                  label="请求日期"
                >
                </el-table-column>
                <el-table-column
                  prop="statusName"
                  align="center"
                  label="状态"
                >
                </el-table-column>
              </el-table>
            </div>
            <p class="small-hint-box">由于隐私原因，提款将在7天后从本节中消失。提款将直接发送到btc地址。</p>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import verificationCode from '@/components/verificationCode.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import exchangeRate from '@/components/exchangeRate.vue'
import { getUserId } from '@/utils/auth.js'
import { getWalletAssetList, getWalletDeposit, getWalletRecord, getWalletAmount, getWalletWithdraw } from '@/api/wallet.js'
import QRCode from 'qrcodejs2'
import bus from '@/bus'
export default {
  name: 'becomeSeller',
  components: {
    listOptions,
    buyerStatistics,
    exchangeRate,
    verificationCode
  },
  data () {
    return {
      checked: false,
      userId: +getUserId() || null,
      walletList: [],
      walletRecordList: [],
      coin_to_cny: 0,
      active: null,
      walletDeposit: null,
      pageParams: {
        page: 1,
        page_size: 100,
        total: 0,
        status: 0
      },
      mustSelectWallet: null,
      pageWalletParams: {
        page: 1,
        page_size: 100,
        total: 0,
        status: 2
      },
      tableData: [],
      ticketForm: {
        btc: '',
        price: '',
        pin: '',
        verificationCode: ''
      },
      walletDetail: null,
      ticketFormRules: {
        btc: [{ required: true, message: '请选择登录时长', trigger: 'change' }],
        price: [{ required: true, message: '请选择登录时长', trigger: 'change' }],
        pin: [{ required: true, message: '请选择登录时长', trigger: 'change' }],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.verificationCodeValida, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    active (newValue) {
      if (!this.walletList.length) return false
      console.log(newValue)
      this.mustSelectWallet = this.walletList.find(item => item.id === +newValue)
      console.log(this.mustSelectWallet)
      this.getWalletDeposit()
      this.getWalletAmount()
    }
  },
  mounted () {
    this.initBreadcrumb()
    this.initPage()
    this.getWalletRecord()
    this.getWalletTable()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '账户余额' }
      ])
    },
    creatQrCode () {
      this.$refs.qrcode.innerHTML = '' // 清除二维码方法一
      const text = this.walletDeposit && this.walletDeposit.address
      const qrcode = new QRCode(this.$refs.qrcode, {
        text: text, // 页面地址 ,如果页面需要参数传递请注意哈希模式#
        width: 113,
        height: 109,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      console.log(qrcode)
    },
    async getWalletAssetList () {
      try {
        const res = await getWalletAssetList()
        if (res.data.code === 2000) {
          this.walletList = (res.data.data.wallet_list && res.data.data.wallet_list.map(item => {
            item.id = item.asset_id
            return item
          })) || []
          this.coin_to_cny = res.data.data.coin_to_cny
          return Promise.resolve()
        } else {
          this.$message.error(res.data.msg)
          return Promise.reject(new Error(res.data.msg))
        }
      } catch (e) {
        console.log(e)
      }
    },
    async initPage () {
      try {
        await this.getWalletAssetList()
        if (this.walletList.length) {
          this.active = `${this.walletList[0].id}`
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getWalletDeposit () {
      try {
        const mustWallet = this.walletList.find(item => item.id === +this.active)
        if (!mustWallet) return false
        // eslint-disable-next-line camelcase
        const { id, chain_name } = mustWallet
        const res = await getWalletDeposit({ asset_id: id, chain_name })
        if (+res.data.code === 2000) {
          this.walletDeposit = res.data.data
          this.creatQrCode()
        } else {
          this.$message.error()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getWalletRecord () {
      try {
        const res = await getWalletRecord(this.pageParams)
        if (+res.data.code === 2000) {
          this.walletRecordList = (res.data.data && res.data.data.map(item => {
            switch (item.w_or_d) {
              case 0:
                item.w_or_d_name = '充值'
                break
              case 1:
                item.w_or_d_name = '提现'
                break
              default:
                item.w_or_d_name = ''
                break
            }
            switch (item.status) {
              // 0:审核中(未锁定)；1:交易中 2:已发出 3:成功 4:失败 5:锁定未审核 6:审核通过 7:审核拒绝
              case 0:
                item.statusName = '审核中(未锁定)'
                break
              case 1:
                item.statusName = '交易中'
                break
              case 2:
                item.statusName = '已发出'
                break
              case 3:
                item.statusName = '成功'
                break
              case 4:
                item.statusName = '失败'
                break
              case 5:
                item.statusName = '锁定未审核'
                break
              case 6:
                item.statusName = '审核通过'
                break
              case 7:
                item.statusName = '审核拒绝'
                break
              default:
                item.statusName = ''
                break
            }
            return item
          })) || []
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getWalletTable () {
      try {
        const res = await getWalletRecord(this.pageWalletParams)
        if (+res.data.code === 2000) {
          this.tableData = (res.data.data && res.data.data.map(item => {
            switch (item.w_or_d) {
              case 0:
                item.w_or_d_name = '充值'
                break
              case 1:
                item.w_or_d_name = '提现'
                break
              default:
                item.w_or_d_name = ''
                break
            }
            switch (item.status) {
              // 0:审核中(未锁定)；1:交易中 2:已发出 3:成功 4:失败 5:锁定未审核 6:审核通过 7:审核拒绝
              case 0:
                item.statusName = '审核中(未锁定)'
                break
              case 1:
                item.statusName = '交易中'
                break
              case 2:
                item.statusName = '已发出'
                break
              case 3:
                item.statusName = '成功'
                break
              case 4:
                item.statusName = '失败'
                break
              case 5:
                item.statusName = '锁定未审核'
                break
              case 6:
                item.statusName = '审核通过'
                break
              case 7:
                item.statusName = '审核拒绝'
                break
              default:
                item.statusName = ''
                break
            }
            return item
          })) || []
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getWalletAmount () {
      try {
        const res = await getWalletAmount({
          asset_id: this.mustSelectWallet && this.mustSelectWallet.id,
          chain_name: this.mustSelectWallet && this.mustSelectWallet.chain_name
        })
        if (+res.data.code === 2000) {
          this.walletDetail = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getWalletWithdraw () {
      try {
        const params = {
          asset_id: this.mustSelectWallet.id,
          chain_name: this.mustSelectWallet.chain_name,
          to_address: this.ticketForm.btc,
          amount: +this.ticketForm.price, // 提币种金额
          pin_code: this.ticketForm.pin,
          fee: 0, // 提币种手续费
          comment: '' // 备注
        }
        const res = await getWalletWithdraw(params)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.ticketForm = Object.assign({}, {
            btc: '',
            price: '',
            pin: '',
            verificationCode: ''
          })
          this.getWalletTable()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    verificationCodeValida (rule, value, callback) {
      if (!this.$refs.verificationCode.validateCode()) {
        callback(new Error('验证码不正确！'))
      }
      callback()
    },
    handleWalletWithdraw () {
      this.$refs.ticketForm.validate(valid => {
        if (!valid) return false
        this.getWalletWithdraw()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .account-balance-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .account-balance-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .account-balance-right-container{
      width: 810px;
      margin-bottom: 30px;
      .hint-text{
        display: flex;
        align-items: center;
        background: rgba(255, 0, 0, 0.17);
        margin-bottom: 11px;
        span{
          width: 10px;
          height: 70px;
          background: #FF0000;
        }
        img{
          width: 24px;
          height: 24px;
          margin-top: 9px;
          margin-left: 11px;
          margin-right: 12px;
          align-self: flex-start;
        }
        p{
          font-size: 16px;
          line-height: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FF0000;
        }
      }
      .hint-box{
        width: 100%;
        padding: 11px 23px 13px 17px;
        background: rgba(255, 0, 0, 0.17);
        margin-bottom: 34px;
        box-sizing: border-box;
        p{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FF0000;
          line-height: 30px;
        }
      }
      .title-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px solid #F0F0F0;
        .left-title{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .right-title{
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #298B02;
          padding-right: 24px;
          span{
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
            margin-right: 7px;
          }
        }
      }
      .desc-box{
        width: 100%;
        box-sizing: border-box;
        padding: 13px 0;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #343434;
      }
      .fund-title-box{
        width: 100%;
        padding: 15px 33px;
        box-sizing: border-box;
        background-color: #F0F0F0;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #343434;
      }
      .fund-content-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 20px 80px 14px 18px;
        .left-fund-box{
          width: 542px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          line-height: 20px;
          p{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
            margin-bottom: 23px;
            &:last-child{
              color: #FF0000;
            }
          }
        }
        .right-fund-box{
          width: 113px;
          height: 109px;
        }
      }
      .code-box{
        width: 100%;
        height: 44px;
        background-color: #F0F0F0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #343434;
      }
      .pgp-box{
        width: 100%;
        box-sizing: border-box;
        padding: 21px 24px 32px 18px;
        p{
          font-size: 14px;
          line-height: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          margin-bottom: 13px;
          text-align: justify;
          &.pgp-title{
            color: #1652B5;
          }
        }
      }
      .table-box{
        width: 100%;
        .table-title{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
          margin-bottom: 17px;
        }
      }
      .extract-box{
        width: 100%;
        margin-top: 30px;
        .extract-title{
          width: 100%;
          height: 44px;
          background-color: #F0F0F0;
          box-sizing: border-box;
          padding: 0 25px;
          font-size: 18px;
          line-height: 44px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .extract-content{
          padding-top: 20px;
          padding-left: 16px;
          .title{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
            margin-bottom: 17px;
          }
          .form-box{
            width: 550px;
            ::v-deep .el-textarea__inner{
              width: 450px;
              height: 200px;
            }
            ::v-deep .el-input__inner{
              width: 450px;
              border: 1px solid #BFBFBF;
              border-radius: 22px;
            }
            ::v-deep .el-form-item{
              display: flex;
              .el-form-item__label{
                width: 150px;
                text-align: right;
              }
            }
            .text-area-box{
              width: 450px;
              height: 200px;
              background: #FFFFFF;
              border-radius: 5px;
            }
            .verification-code-box{
              width: 450px;
              margin-bottom: 22px;
              margin-left: 100px;
              img{
                width: 100%;
              }
            }
            .send-btn{
              width: 450px;
              height: 44px;
              margin-left: 100px;
              background: linear-gradient(90deg, #008DFF, #0060FF);
              box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
              border-radius: 22px;
              margin-top: 63px;
            }
          }
        }
      }
      .small-hint-box{
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #343434;
        margin-top: 50px;
      }
    }
  }
</style>
