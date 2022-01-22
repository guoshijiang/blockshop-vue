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
        <p class="title">待处理</p>
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
              <el-button @click="handleSq(scope.row.order_id)" type="primary" size="mini">处理申请</el-button>
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
    <el-dialog title="处理订单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="是否同意" label-width="100px">
            <el-select v-model="form.is_accept" placeholder="请选择">
              <el-option
                v-for="item in recvGoodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input v-model="form.accept_reject_reason" autocomplete></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import shopGrowth from '@/components/shopGrowth.vue'
import { getUserId } from '@/utils/auth.js'
import { getOrderList } from '@/api/good.js'
import { acceptRejectReturn } from '@/api/becomeSeller.js'
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
        order_status: 5
      },
      tableData: [],
      dialogFormVisible: false,
      form: {
        is_accept: 0,
        accept_reject_reason: ''
      },
      recvGoodOptions: [
        { label: '同意', value: 0 },
        { label: '拒绝', value: 1 }
      ],
      mustId: null
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
        { name: '待处理' }
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
    handleSq (id) {
      this.dialogFormVisible = true
      this.mustId = id
    },
    async handleOrder () {
      try {
        const params = {
          order_id: this.mustId,
          is_accept: this.form.is_accept, // 0:接受； 1:拒绝
          accept_reject_reason: this.form.accept_reject_reason
        }
        const res = await acceptRejectReturn(params)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.dialogFormVisible = false
          this.getOrderList()
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
    .btn-box{
      display: flex;
      flex-direction: column;
      align-items: center;
      ::v-deep .el-button{
        margin-bottom: 10px;
        margin-left: 0;
      }
    }
  }
</style>
