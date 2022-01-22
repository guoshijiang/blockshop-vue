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
        <p class="title">待发货</p>
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
            <div class="btn-box">
              <el-button @click="handleShip(scope.row.order_id)" type="primary" size="mini">发快递</el-button>
              <el-button @click="goOrderDetail(scope.row.order_id)" type="primary" size="mini">查看详情</el-button>
            </div>
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
    <el-dialog title="发快递" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="快递单号" label-width="100px">
          <el-input v-model="form.ship_number" autocomplete></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmShip">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import shopGrowth from '@/components/shopGrowth.vue'
import { getUserId } from '@/utils/auth.js'
import { getOrderList } from '@/api/good.js'
import { addShipNumber } from '@/api/becomeSeller.js'
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
        order_status: 1
      },
      form: {
        ship_number: ''
      },
      dialogFormVisible: false,
      tableData: [],
      selectOrderId: null
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
        { name: '待发货' }
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
    },
    handleShip (id) {
      this.selectOrderId = id
      this.dialogFormVisible = true
    },
    async handleConfirmShip () {
      try {
        if (this.selectOrderId) {
          const res = await addShipNumber({
            order_id: this.selectOrderId,
            ship_number: this.form.ship_number
          })
          if (res.data.code === 2000) {
            this.$message.success('添加快递单号成功')
            this.dialogFormVisible = false
            this.getOrderList()
          } else {
            this.$message.error(res.data.msg)
          }
        }
      } catch (e) {

      }
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
      .btn-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        ::v-deep .el-button{
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
