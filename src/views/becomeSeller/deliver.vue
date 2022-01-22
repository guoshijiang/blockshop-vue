<template>
  <div class="wait-deliver-container">
    <div class="wait-deliver-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
      <!-- 店铺成长 -->
      <shop-growth></shop-growth>
    </div>
    <div class="wait-deliver-right-container">
      <div class="title-box">
        <p class="title">已发货</p>
        <p class="more"></p>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
      >
        <el-table-column
          prop="goods_titel"
          label="商品名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="buy_nums"
          label="数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="购买日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="rec_user"
          label="买家"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="rec_phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="rec_address"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <p style="color: #1652B5;cursor: pointer;">发快递</p> -->
            <el-button @click="goOrderDetail(scope.row.order_id)" type="primary" size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination-box"
        :current-page="pageParams.page"
        :page-size="pageParams.page_size"
        layout="prev, pager, next, jumper"
        :total="pageParams.total"
        @current-chang="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import shopGrowth from '@/components/shopGrowth.vue'
import { getUserId } from '@/utils/auth.js'
import { getOrderList } from '@/api/good.js'
import bus from '@/bus'
export default {
  name: 'waitDeliver',
  components: {
    accountInfo,
    shopGrowth
  },
  data () {
    return {
      userId: +getUserId() || null,
      pageParams: {
        page: 1,
        page_size: 10,
        total: 0,
        order_status: 4
      },
      tableData: []
    }
  },
  async mounted () {
    this.initBreadcrumb()
    if (this.userId) {
      await this.getUserInfoFn(this.userId)
    }
    this.getOrderList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '已发货' }
      ])
    },
    async getOrderList () {
      try {
        const params = Object.assign({}, this.pageParams)
        params.merchant_id = this.userInfo && this.userInfo.mct_id
        params.user_id = this.userId
        const res = await getOrderList(params)
        if (+res.data.code === 2000) {
          this.tableData = res.data.data.order_lst || []
          this.pageParams.total = res.data.data.total
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (current) {
      this.pageParams.page = current
      this.getOrderList()
    },
    goOrderDetail (id) {
      this.$router.push({
        path: '/orderDetailBuy',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .wait-deliver-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .wait-deliver-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .wait-deliver-right-container{
      width: 810px;
      margin-bottom: 30px;
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
      .pagination-box{
        margin-top: 10px;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
