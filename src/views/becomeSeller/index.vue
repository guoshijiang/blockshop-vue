<template>
  <div class="become-seller-container">
    <div class="become-seller-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 虚拟币汇率 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="become-seller-right-container">
      <p class="name-box">供应商账户</p>
      <div class="info-box">
        <p>在这里，您可以激活您的供应商帐户，花时间阅读下面的供应商规则，检查BOR，然后单击您的付款按钮之一。在这里创建日志并开始运行，小心使用规则。因为违反这些规定可能导致帐户暂停。</p>
        <p>12数字订单自动完成24小时。如果你收到玛丽骗局的报告，我们可以在任何时候撤销你的供应商帐户。</p>
        <p>84 S 1500美元卖方债券(03921 Btc 653680 Xmr)</p>
        <p>5卖家在开始销售前必须在他们的产品中有一个PGP钥匙。</p>
        <p>*所有供应商必须进行8项要素认证(2FA)。</p>
        <p>*9供应商必须在他们的名单中准确地描述他们的产品，如果我们发现你的记录是完全不准确的，你将被禁止，没有游手好闲*10在外面或马槽没有被抓住任何在市场外使用应用程序进行交易的供应商。不退货这是为了保护市场免受诈骗。</p>
        <el-checkbox v-model="checked">本人已阅读并接受上述规定。</el-checkbox>
      </div>
      <div class="btn-box">
        <div class="btn" @click="payOpenCost(0)">支付{{ amount && amount.btc_amount }} BTC</div>
        <div class="btn" @click="payOpenCost(1)">支付{{ amount && amount.usdt_amount }} USDT</div>
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getUserId } from '@/utils/auth.js'
import { getOpenFee } from '@/api/becomeSeller.js'
import bus from '@/bus'
export default {
  name: 'becomeSeller',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      checked: false,
      userId: +getUserId() || null,
      amount: null
    }
  },
  created () {
    this.getOpenFee()
  },
  async mounted () {
    this.initBreadcrumb()
    const userId = +getUserId() || null
    if (userId) {
      await this.getUserInfoFn(userId)
      if (this.userInfo && this.userInfo.mct_id) {
        this.$router.replace({
          path: '/orderAdmin'
        })
      }
    }
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '开通商户' }
      ])
    },
    payOpenCost (way) {
      if (!this.checked) return this.$message.error('请勾选并同意以上规定')
      this.$router.push({
        path: '/step',
        query: {
          way
        }
      })
    },
    async getOpenFee () {
      const res = await getOpenFee()
      if (+res.data.code === 2000) {
        this.amount = res.data.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .become-seller-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .become-seller-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .become-seller-right-container{
      width: 810px;
      margin-bottom: 30px;
      .name-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 41px;
      }
      .info-box{
        width: 100%;
        box-sizing: border-box;
        padding: 0 50px 0 30px;
        p{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          margin-bottom: 20px;
        }
      }
      .btn-box{
        width: 100%;
        box-sizing: border-box;
        padding: 0 50px 0 30px;
        display: flex;
        margin-top: 15px;
        .btn{
          width: 120px;
          height: 24px;
          background: #C00202;
          border-radius: 5px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 24px;
          margin-right: 18px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
</style>
