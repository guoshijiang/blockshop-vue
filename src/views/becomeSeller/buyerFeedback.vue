<template>
  <div class="buyer-feedback-container">
    <div class="buyer-feedback-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
      <!-- 店铺成长 -->
      <shop-growth></shop-growth>
    </div>
    <div class="buyer-feedback-right-container">
      <p class="name-box">买家反馈</p>
      <div class="identity-tab-container">
        <el-tabs v-model="activeBasic" type="card">
          <el-tab-pane label="好评" name="1">
            <div class="tab-box">
              <el-table
                :data="bestTableData"
                :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
              >
                <el-table-column
                  prop="goods_id"
                  label="商品名称"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="user_name"
                  label="买家"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="create_time"
                  label="日期"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="content"
                  label="评论"
                  align="center"
                ></el-table-column>
              </el-table>
              <el-pagination
                background
                class="pagination-box"
                :current-page="bestPrams.page"
                :page-size="bestPrams.page_size"
                layout="prev, pager, next, jumper"
                @current-change="handleBestCurrentChange"
                :total="bestPrams.total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="中评" name="2">
            <div class="tab-box">
              <el-table
                :data="goodTableData"
                :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
              >
                <el-table-column
                  prop="goods_id"
                  label="商品名称"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="user_name"
                  label="买家"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="create_time"
                  label="日期"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="content"
                  label="评论"
                  align="center"
                ></el-table-column>
              </el-table>
              <el-pagination
                background
                class="pagination-box"
                :current-page="goodPrams.page"
                :page-size="goodPrams.page_sie"
                layout="prev, pager, next, jumper"
                @current-change="handleGoodCurrentChange"
                :total="goodPrams.total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="差评" name="3">
            <div class="tab-box">
              <el-table
                :data="badTableData"
                :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
              >
                <el-table-column
                  prop="goods_id"
                  label="商品名称"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="user_name"
                  label="买家"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="create_time"
                  label="日期"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="content"
                  label="评论"
                  align="center"
                ></el-table-column>
              </el-table>
              <el-pagination
                background
                class="pagination-box"
                :current-page="badPrams.page"
                :page-size="badPrams.page_sie"
                layout="prev, pager, next, jumper"
                @current-change="handleBadCurrentChange"
                :total="badPrams.total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="投诉" name="4">
            <div class="tab-box">
              <el-table
                :data="complaintTableData"
                :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
              >
                <el-table-column
                  prop="name"
                  label="商品名称"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="buyer"
                  label="买家"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="日期"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="comment"
                  label="评论"
                  align="center"
                ></el-table-column>
              </el-table>
              <el-pagination
                background
                class="pagination-box"
                :current-page="complaintPrams.page"
                :page-size="complaintPrams.page_sie"
                layout="prev, pager, next, jumper"
                @current-change="handleComplaintCurrentChange"
                :total="complaintPrams.total">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import shopGrowth from '@/components/shopGrowth.vue'
import { getCommentList } from '@/api/comment.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'BuyerFeedback',
  components: {
    accountInfo,
    shopGrowth
  },
  data () {
    return {
      activeBasic: '1',
      bestTableData: [],
      goodTableData: [],
      badTableData: [],
      complaintTableData: [],
      userId: +getUserId() || null,
      bestPrams: {
        page: 1,
        page_size: 10,
        goods_id: 0,
        merchant_id: +this.$route.query.id,
        cmt_status: 1,
        total: 0
      },
      goodPrams: {
        page: 1,
        page_size: 10,
        goods_id: 0,
        merchant_id: +this.$route.query.id,
        cmt_status: 2,
        total: 0
      },
      badPrams: {
        page: 1,
        page_size: 10,
        goods_id: 0,
        merchant_id: +this.$route.query.id,
        cmt_status: 3,
        total: 0
      },
      complaintPrams: {
        page: 1,
        page_size: 10,
        goods_id: 0,
        merchant_id: +this.$route.query.id,
        cmt_status: 3,
        total: 0
      }
    }
  },
  mounted () {
    this.initBreadcrumb()
    this.getBestCommentList()
    this.getGoodCommentList()
    this.getBadCommentList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '买家反馈' }
      ])
    },
    async getBestCommentList () {
      try {
        const res = await this.getCommentList(this.bestPrams)
        console.log('res', res)
        this.bestTableData = res.cmt_lst
        this.bestPrams.total = res.total
      } catch (e) {
        console.log(e)
      }
    },
    async getGoodCommentList () {
      try {
        const res = await this.getCommentList(this.goodPrams)
        this.goodTableData = res.cmt_lst
        this.goodPrams.total = res.total
      } catch (e) {
        console.log(e)
      }
    },
    async getBadCommentList () {
      try {
        const res = await this.getCommentList(this.badPrams)
        this.badTableData = res.cmt_lst
        this.badPrams.total = res.total
      } catch (e) {
        console.log(e)
      }
    },
    async getCommentList (params) {
      try {
        const res = await getCommentList(params)
        if (+res.data.code === 2000) {
          return Promise.resolve(res.data.data)
        }
        return Promise.reject(res.data.msg)
      } catch (e) {
        console.log(e)
      }
    },
    async getComplaintCommentList (params) {
      try {
        const res = await getCommentList(params)
        if (+res.data.code === 2000) {
          return Promise.resolve(res.data.data)
        }
        return Promise.reject(res.data.msg)
      } catch (e) {
        console.log(e)
      }
    },
    handleBestCurrentChange (current) {
      this.bestPrams.page = current
      this.getBestCommentList()
    },
    handleGoodCurrentChange (current) {
      this.goodPrams.page = current
      this.getGoodCommentList()
    },
    handleBadCurrentChange (current) {
      this.badPrams.page = current
      this.getBadCommentList()
    },
    handleComplaintCurrentChange (current) {
      this.badPrams.page = current
      this.getComplaintCommentList()
    }
  }
}
</script>

<style lang="less" scoped>
  .buyer-feedback-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .buyer-feedback-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .buyer-feedback-right-container{
      width: 810px;
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
      .identity-tab-container{
        margin-top: 20px;
        ::v-deep .el-tabs__item.is-active{
          color: #333;
          background-color: #F0F0F0;
        }
        .tab-box{
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          .pagination-box{
            display: flex;
            justify-content: center;
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>
