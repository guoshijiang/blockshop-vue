<template>
  <div class="shop-detail-container">
    <div class="shop-detail-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 虚拟币汇率 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="shop-detail-right-container">
      <p class="name-box">店铺详情</p>
      <div class="basic-info-box">
        <div class="basic-left-info-box">
          <div class="img-box">
            <img :src="detail&&detail.logo" alt="img">
          </div>
          <div class="info-box">
            <div class="name-title-box">
              <p>{{ detail && detail.merchant_name || "--"}}</p>
              <span class="blue">供应商级别2</span>
              <span class="green">信任级别10</span>
            </div>
            <p>店铺好评率（12个月内）：100%</p>
            <p>加入时间：{{ detail && detail.created_at || "--" }}</p>
            <p>最后一次在线：{{ detail && detail.updated_at || "--" }} </p>
          </div>
        </div>
        <div class="basic-right-info-box">
          <el-button type="primary">发送消息</el-button>
          <el-button type="primary" @click="handleCollection">收藏</el-button>
          <el-button type="primary" @click="handleAddBlockList">加入黑名单</el-button>
        </div>
      </div>
      <p class="title-box">买家反馈</p>
      <ul class="feedback-box">
        <li class="title">
          <div></div>
          <p>质量</p>
          <p>服务</p>
          <p>交易</p>
        </li>
        <li>
          <div><img src="@/assets/images/goodh.png" alt="goodh">好评</div>
          <p>{{ detail && detail.comment_stat.quality_best }}</p>
          <p>{{ detail && detail.comment_stat.serice_best }}</p>
          <p>{{ detail && detail.comment_stat.trade_best }}</p>
        </li>
        <li>
          <div><img src="@/assets/images/zhongping.png" alt="zhongping">中评</div>
          <p>{{ detail && detail.comment_stat.quality_good }}</p>
          <p>{{ detail && detail.comment_stat.service_good }}</p>
          <p>{{ detail && detail.comment_stat.trade_good }}</p>
        </li>
        <li>
          <div><img src="@/assets/images/chaping-xuanzhong.png" alt="chaping-xuanzhong">差评</div>
          <p>{{ detail && detail.comment_stat.quality_bad }}</p>
          <p>{{ detail && detail.comment_stat.service_bad }}</p>
          <p>{{ detail && detail.comment_stat.trade_bad }}</p>
        </li>
      </ul>
      <ul class="feedback-box score-box">
        <li class="title">
          <p>纠纷</p>
          <p>质量平均率</p>
          <p>服务平均率</p>
          <p>交易平均率</p>
        </li>
        <li>
          <p> <span class="green-text">{{ detail && detail.adjust_victor }}</span>胜/<span class="red-text">{{ detail && detail.adjust_fail }}</span>败</p>
          <p>{{ detail && detail.comment_stat.quality_avg }} <img src="@/assets/images/xingxing.png" alt="xingxing"> </p>
          <p>{{ detail && detail.comment_stat.service_avg }} <img src="@/assets/images/xingxing.png" alt="xingxing"></p>
          <p>{{ detail && detail.comment_stat.trade_avg }} <img src="@/assets/images/xingxing.png" alt="xingxing"></p>
        </li>
      </ul>
      <div class="shop-tab-container">
        <el-tabs v-model="activeBasic" type="card">
          <el-tab-pane label="关于" name="1">{{ detail && detail.merchant_detail }}</el-tab-pane>
          <el-tab-pane label="退货政策" name="2">退货政策</el-tab-pane>
          <el-tab-pane label="好评" name="3">
              <div class="comment-list-box">
                <div
                  class="comment-item"
                  v-for="item in bestList"
                  :key="item.comment_id"
                >
                  <div class="top-user-info">
                    <div class="left-logo">
                      <img :src="item.user_pho" alt="">
                    </div>
                    <div class="right-info-box">
                      <p class="user-name">{{ item.user_name }}</p>
                      <p class="time">{{ item.create_time }}</p>
                    </div>
                  </div>
                  <div class="content-box">{{ item.content }}</div>
                </div>
              </div>
              <el-pagination
                class="pagination-box"
                background
                :current-page="bestParams.page"
                :page-size="bestParams.page_size"
                layout="prev, pager, next, jumper"
                :total="bestParams.total"
                @current-change="handleBestChange"
              >
              </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="中评" name="4">
              <div class="comment-list-box">
                <div
                  class="comment-item"
                  v-for="item in goodList"
                  :key="item.comment_id"
                >
                  <div class="top-user-info">
                    <div class="left-logo">
                      <img :src="item.user_pho" alt="">
                    </div>
                    <div class="right-info-box">
                      <p class="user-name">{{ item.user_name }}</p>
                      <p class="time">{{ item.create_time }}</p>
                    </div>
                  </div>
                  <div class="content-box">{{ item.content }}</div>
                </div>
              </div>
              <el-pagination
                class="pagination-box"
                background
                :current-page="goodParams.page"
                :page-size="goodParams.page_size"
                layout="prev, pager, next, jumper"
                :total="goodParams.total"
                @current-change="handleGoodChange"
              >
              </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="差评" name="5">
            <div class="comment-list-box">
              <div
                class="comment-item"
                v-for="item in badList"
                :key="item.comment_id"
              >
                <div class="top-user-info">
                  <div class="left-logo">
                    <img :src="item.user_pho" alt="">
                  </div>
                  <div class="right-info-box">
                    <p class="user-name">{{ item.user_name }}</p>
                    <p class="time">{{ item.create_time }}</p>
                  </div>
                </div>
                <div class="content-box">{{ item.content }}</div>
              </div>
            </div>
            <el-pagination
              class="pagination-box"
              background
              :current-page="badParams.page"
              :page-size="badParams.page_size"
              layout="prev, pager, next, jumper"
              :total="badParams.total"
              @current-change="handleBadChange"
            >
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getUserId } from '@/utils/auth.js'
import { getMarchantDetail } from '@/api/marchant.js'
import { getCommentList } from '@/api/comment.js'
import { addMctCollect, addBlackList } from '@/api/news.js'
import bus from '@/bus'
export default {
  name: 'shopDetail',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      activeBasic: '1',
      userId: +getUserId() || null,
      detail: null,
      bestList: [],
      bestParams: {
        page: 1,
        page_size: 10,
        total: 0,
        goods_id: 0,
        merchant_id: (this.detail && this.detail.id) || 0,
        cmt_status: 1 // 1:好评; 2:中评; 3:差评
      },
      goodList: [],
      goodParams: {
        page: 1,
        page_size: 10,
        total: 0,
        goods_id: 0,
        merchant_id: (this.detail && this.detail.id) || 0,
        cmt_status: 2 // 1:好评; 2:中评; 3:差评
      },
      badList: [],
      badParams: {
        page: 1,
        page_size: 10,
        total: 0,
        goods_id: 0,
        merchant_id: (this.detail && this.detail.id) || 0,
        cmt_status: 3 // 1:好评; 2:中评; 3:差评
      }
    }
  },
  created () {
    this.initBreadcrumb()
    this.getMarchantDetail()
  },
  mounted () {
    if (this.userId) {
      this.getUserInfoFn(this.userId)
    }
    Promise.all([this.getBestList(), this.getGoodList(), this.getBadList()])
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '店铺详情' }
      ])
    },
    async getMarchantDetail () {
      try {
        const res = await getMarchantDetail(+this.$route.query.id)
        if (+res.data.code === 2000) {
          this.detail = res.data.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getBestList () {
      try {
        const res = await getCommentList(this.bestParams)
        if (+res.data.code === 2000) {
          this.bestList = res.data.data.cmt_lst || []
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getGoodList () {
      try {
        const res = await getCommentList(this.goodParams)
        if (+res.data.code === 2000) {
          this.goodList = res.data.data.cmt_lst || []
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getBadList () {
      try {
        const res = await getCommentList(this.badParams)
        if (+res.data.code === 2000) {
          this.badList = res.data.data.cmt_lst || []
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleBestChange (current) {
      this.bestParams.page = current
      this.getBestList()
    },
    handleGoodChange (current) {
      this.goodParams.page = current
      this.getGoodList()
    },
    handleBadChange (current) {
      this.badParams.page = current
      this.getBadList()
    },
    async handleCollection () { // 收藏
      try {
        const res = await addMctCollect({
          user_id: this.userId,
          merchant_id: +this.$route.query.id
        })
        if (+res.data.code === 2000) {
          this.$message.success('加入收藏成功')
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleAddBlockList () { // 加入黑名单
      try {
        const res = await addBlackList({
          user_id: this.userId,
          merchant_id: +this.$route.query.id
        })
        if (+res.data.code === 2000) {
          this.$message.success('加入黑名单成功')
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
  .shop-detail-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .shop-detail-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .shop-detail-right-container{
      width: 791px;
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
      .basic-info-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        margin-bottom: 25px;
        .basic-left-info-box{
          display: flex;
          .img-box{
            width: 140px;
            height: 140px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #EEEEEE;
            margin-right: 10px;
            img{
              display: block;
              max-width: 140px;
              max-height: 140px;
            }
          }
          .info-box{
            p{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              margin-bottom: 15px;
            }
            .name-title-box{
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              margin-top: 10px;
              p{
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-right: 10px;
                margin-bottom: 0;
              }
              span{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 20px;
                padding: 0 10px;
                margin-right: 5px;
                border-radius: 10px;
                &.blue{
                  background-color:#1652B5;
                }
                &.green{
                  background-color:#0CA345;
                }

              }
            }
          }
        }
        .basic-right-info-box{
          width: 90px;
          padding-right: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          ::v-deep .el-button{
            width: 90px;
            height: 30px;
            background: #1652B5;
            border-radius: 15px;
            border-color: #1652B5;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0;
            margin-bottom: 5px;
          }
        }
      }
      .title-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 14px;
      }
      .feedback-box{
        width: 100%;
        li{
          width: 100%;
          height: 44px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          &.title{
            background-color: #F0F0F0;
          }
          p{
            width: 50px;
            text-align: center;
          }
          div{
            width: 70px;
            height: 44px;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #343434;
            img{
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
          }
        }
      }
      .score-box{
        li{
          p{
            width: 105px;
            display: flex;
            justify-content: center;
            align-items: center;
            .red-text{
              color: #DA0000;
            }
            .green-text{
              color: #0CA345;
            }
          }
        }
      }
      .shop-tab-container{
        width: 100%;
        margin-top: 20px;
        ::v-deep .el-tabs__item.is-active{
          color: #333;
          background-color: #F0F0F0;
        }
      }
    }
  }
          .comment-list-box{
          width: 100%;
          box-sizing: border-box;
          .comment-item{
            padding: 0 20px 20px;
            .top-user-info{
              width: 100%;
              display: flex;
              margin-bottom: 10px;
              .left-logo{
                width: 46px;
                height: 46px;
                margin-right: 10px;
                img{
                  display: block;
                  width: 100%;
                }
              }
              .right-info-box{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
              }
            }
            .content-box{
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
        .pagination-box{
          display: flex;
          justify-content: center;
        }
</style>
