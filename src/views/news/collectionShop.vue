<template>
  <div class="collection-shop-container">
    <div class="collection-shop-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="collection-shop-right-container">
      <div class="title-box">
        <p class="title">收藏的商家</p>
        <p class="desc">下面的供应商将在搜索和分类中显示他们的名单没有发现任何记录。</p>
      </div>
      <div class="table-box">
        <el-table
          class="table-box"
          :data="shopList"
          :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
        >
          <el-table-column
            prop="merchan_name"
            align="center"
            label="店铺名"
          >
          </el-table-column>
          <el-table-column
            prop="date_time"
            align="center"
            label="日期"
          >
          </el-table-column>
          <el-table-column
            label="移除"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                class="remove-btn"
                size="mini"
                @click="removeMctCollect(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="pagination-box"
        background
        style="display: flex; justify-content: center;"
        :current-page="pageParams.page"
        :page-size="pageParams.page_size"
        layout="prev, pager, next, jumper"
        :total="pageParams.total"
        @current-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getUserId } from '@/utils/auth.js'
import { getMctCollectList, removeMctCollect } from '@/api/news.js'
import bus from '@/bus'
export default {
  name: 'collection-shop',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      userId: +getUserId() || null,
      shopList: [],
      pageParams: {
        page: 1,
        page_size: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.initBreadcrumb()
    this.getMctCollectList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '收藏店铺' }
      ])
    },
    async getMctCollectList () {
      try {
        const res = await getMctCollectList(this.pageParams)
        if (res.data.code === 2000) {
          this.shopList = res.data.data.data || []
          this.pageParams.total = res.data.data.total
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async removeMctCollect (row) {
      try {
        const res = await removeMctCollect({
          mct_collect_id: row.mct_collect_id
        })
        if (res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.getMctCollectList()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (current) {
      this.pageParams.page = current
      this.getMctCollectList()
    }
  }
}
</script>

<style lang="less" scoped>
  .collection-shop-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .collection-shop-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .collection-shop-right-container{
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
      .table-box{
        margin-top: 10px;
        .remove-btn{
          width: 90px;
          height: 30px;
          background: #1652B5;
          border-radius: 15px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
