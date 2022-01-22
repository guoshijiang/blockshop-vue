<template>
  <div class="block-list-container">
    <div class="block-list-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="block-list-right-container">
      <div class="title-box">
        <p class="title">屏蔽店铺</p>
        <p class="desc">下面的供应商不会在搜索和类别中显示他们的列表</p>
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
            label="商家名称"
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
                @click="removeBlackList(scope.row)">移除</el-button>
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
import { getBlackList, removeBlackList } from '@/api/news.js'
import bus from '@/bus'
export default {
  name: 'block-list',
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
    this.getBlackList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '收藏商铺' }
      ])
    },
    async getBlackList () {
      try {
        const res = await getBlackList(this.pageParams)
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
    async removeBlackList (row) {
      try {
        const res = await removeBlackList({
          black_list_id: row.bl_id
        })
        if (res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.getBlackList()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (current) {
      this.pageParams.page = current
      this.getBlackList()
    }
  }
}
</script>

<style lang="less" scoped>
  .block-list-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .block-list-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .block-list-right-container{
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
