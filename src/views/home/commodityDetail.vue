<template>
  <div class="shop-detail-container">
    <div class="shop-detail-left-container">
      <!-- 清单选项 1 -->
      <div class="detailed-list-1">
        <p class="module-title">清单选项</p>
        <div class="detailed-list-1-content">
          <ul>
            <li>联系卖家</li>
            <li @click="handleAddCollection">添加到收藏</li>
          </ul>
        </div>
      </div>
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 虚拟币汇率 -->
      <exchange-rate></exchange-rate>
    </div>
    <div class="shop-detail-right-container">
      <div class="shop-basic-info-box">
        <div class="left-basic-info">
          <div class="big-img-box">
            <img :src="shopImgSrc" alt="">
          </div>
          <ul class="small-img-box">
            <li
              v-for="item in detail&&detail.goods_img"
              :key="item.goods_img_id"
              @click="shopImgSrc = item.image_url"
            ><img :src="item.image_url" alt=""></li>
          </ul>
        </div>
        <div class="right-basic-info">
          <p class="auto-text" v-if="detail&&detail.mark">[{{ detail && detail.mark || "--"  }}]</p>
          <p class="shop-name">{{ detail&&detail.title || "--" }}</p>
          <div class="desc">
            <p>{{ detail && detail.serveice || "--" }}</p>
            <span class="blue-icon">供应商级别{{ detail&&detail.merchant_level || 0 }}</span>
            <span class="green-icon">信任级别{{ detail&&detail.trust_level || 0 }}</span>
          </div>
          <p class="project-characteristic-title">产品特性</p>
          <ul class="project-characteristic-content">
            <li>
              <div>
                <p>产品类别</p>
                <p class="gray-text">{{ detail && detail.goods_name || "--" }}</p>
              </div>
            </li>
            <li>
              <div>
                <p>剩余量</p>
                <p class="gray-text">{{ detail && detail.total_amount || "--" }}</p>
              </div>
            </li>
            <li>
              <div>
                <p>商品种类</p>
                <p class="gray-text">{{ detail && detail.goods_type || "--" }}</p>
              </div>
            </li>
            <li>
              <div>
                <p>原产国</p>
                <p class="gray-text">{{ detail && detail.origin_state || "--" }}</p>
              </div>
            </li>
            <li class="no-margin-bottom">
              <div>
                <p>服务说明</p>
                <p class="gray-text">{{ detail && detail.serveice || "--" }}</p>
              </div>
            </li>
          </ul>
          <el-form label-width="150" label-position="left">
            <el-form-item
              v-for="item in detail&&detail.goods_attr"
              :key="item.gds_attr_key"
              :label="item.gds_attr_key"
            >
              <el-select class="select-box" v-model="attrSelect[item.gds_attr_key]">
                <el-option
                  v-for="item2 in item.gds_attr_value"
                  :key="item2"
                  :value="item2"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="price-box">
            <p class="price">总价：<span>¥ {{ detail&&detail.goods_price }}</span></p>
            <p class="volume">已售：{{ detail&&detail.sell_nums }}</p>
          </div>
          <div class="buy-btn-box">
            <el-input class="number-box" type="number" v-model="buyNumber"></el-input>
            <div class="buy-btn" @click="handleBuy('btc')"><img src="@/assets/images/ziyuan-2.png" alt="ziyuan-2">立即购买</div>
            <div class="buy-btn" @click="handleBuy('usdt')"><img src="@/assets/images/XMR.png" alt="usdt">立即购买</div>
          </div>
          <p class="balance-box">{{detail&&detail.btc_price}}BTC/{{detail&&detail.usdt_price}}usdt</p>
        </div>
      </div>
      <div class="shop-tab-container">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="商品描述" name="1">
              <div class="shop-desc-box">
                <p class="title">商品描述:</p>
                <div class="shop-div-desc-text" v-html="detail&&detail.goods_detail"></div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="评价" name="2">
              <div class="comment-list-box">
                <div
                  class="comment-item"
                  v-for="item in commentList"
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
                :current-page="commentParams.page"
                :page-size="commentParams.page_size"
                layout="prev, pager, next, jumper"
                :total="commentParams.total"
                @current-change="handleCommentChange"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="退货政策" name="3">退货政策退货政策退货政策退货政策退货政策退货政策退货政策退货政策退货政策</el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import exchangeRate from '@/components/exchangeRate.vue'
import { getGoodsDetail } from '@/api/good.js'
import { getCommentList } from '@/api/comment.js'
import { addGoodsCollect } from '@/api/news.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'commodityDetail',
  components: {
    listOptions,
    exchangeRate
  },
  data () {
    return {
      selectValue: '',
      buyNumber: 1,
      activeName: '1',
      detail: null,
      userId: +getUserId() || null,
      shopImgSrc: '',
      attrSelect: {},
      commentList: [],
      commentParams: {
        page: 1,
        page_size: 10,
        total: 0
      }
    }
  },
  created () {
    this.initBreadcrumb()
  },
  async mounted () {
    if (this.userId) {
      this.getUserInfoFn(this.userId)
    }
    await this.getGoodsDetail()
    await this.getCommentList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '商品详情' }
      ])
    },
    async getGoodsDetail () {
      try {
        const params = {
          user_id: this.userId,
          goods_id: +this.$route.query.id
        }
        const res = await getGoodsDetail(params)
        console.log(res)
        if (+res.data.code === 2000) {
          this.detail = res.data.data
          this.shopImgSrc = res.data.data.logo
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getCommentList () {
      try {
        const params = {
          page: this.commentParams.page,
          page_size: this.commentParams.page_size,
          goods_id: (this.detail && this.detail.id) || 0,
          merchant_id: (this.detail && this.detail.merchant_info.merchant_id) || 0,
          cmt_status: 0 // 1:好评; 2:中评; 3:差评
        }
        const res = await getCommentList(params)
        if (+res.data.code === 2000) {
          this.commentList = res.data.data.cmt_lst
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleBuy (type) {
      if (this.detail) {
        const detail = this.detail
        detail.buy_type = type
        detail.buy_number = this.buyNumber
        detail.goods_attr = this.attrSelect
        console.log(detail.goods_attr)
        sessionStorage.setItem('detail', JSON.stringify(detail))
      }
      this.$router.push({
        path: '/placeOrder'
      })
    },
    handleCommentChange (current) {
      this.commentParams.page = current
      this.getCommentList()
    },
    async handleAddCollection () {
      try {
        const res = await addGoodsCollect({
          user_id: this.userId,
          goods_id: +this.$route.query.id
        })
        if (+res.data.code === 2000) {
          this.$message.success('加入收藏成功')
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
    .module-title{
      width: 100%;
      box-sizing: border-box;
      padding: 13px 21px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #343434;
      background: #F0F0F0;
    }
    .shop-detail-left-container{
      width: 380px;
      margin-bottom: 30px;
      .detailed-list-1{
        width: 100%;
        margin-bottom: 5px;
        .detailed-list-1-content{
          width: 100%;
          box-sizing: border-box;
          padding: 49px 22px;
          border: 1px solid #F4F5F7;
          ul{
            width: 100%;
            li{
              width: 100%;
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              margin-bottom: 28px;
              cursor: pointer;
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    .shop-detail-right-container{
      width: 791px;
      margin-bottom: 30px;
      .shop-basic-info-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left-basic-info{
          width: 140px;
          .big-img-box{
            width: 140px;
            height: 140px;
            border: 1px solid #EEEEEE;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              display: block;
              max-width: 140px;
              max-height: 140px;
            }
          }
          .small-img-box{
            margin-top: 11px;
            width: 140px;
            display: flex;
            flex-wrap: wrap;
            li{
              width: 40px;
              height: 40px;
              border: 1px solid #EEEEEE;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 10px;
              margin-bottom: 10px;
              &:nth-child(3n+3){
                margin-right: 0;
              }
              cursor: pointer;
              &:last-child{
                margin-right: 0;
              }
              img{
                display: block;
                max-width: 40px;
                max-height: 40px;
              }
            }
          }
        }
        .right-basic-info{
          width: 640px;
          padding-right: 8px;
          box-sizing: border-box;
          .auto-text{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #008B4C;
            margin-bottom: 15px;
          }
          .shop-name{
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            line-height: 20px;
            margin-bottom: 15px;
          }
          .desc{
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            p{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
              margin-right: 10px;
            }
            span{
              height: 20px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 20px;
              padding: 0 10px;
              border-radius: 10px;
              margin-right: 5px;
              &.blue-icon{
                background-color: #1652B5;
              }
              &.green-icon{
                background-color: #0CA345;
              }
            }
          }
          .project-characteristic-title{
            width: 100%;
            height: 30px;
            padding: 0 12px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #343434;
            line-height: 30px;
            background-color: #F0F0F0;
            box-sizing: border-box;
          }
          .project-characteristic-content{
            width: 100%;
            box-sizing: border-box;
            padding: 15px 100px 24px 17px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
              width: 227px;
              margin-bottom: 15px;
              &.no-margin-bottom{
                margin-bottom: 0;
              }
              div{
                width: 100%;
                display: flex;
                justify-content: space-between;
                p{
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: bold;
                  color: #343434;
                  line-height: 14px;
                  &.gray-text{
                    color: #999999;
                  }
                }
              }
            }
          }
          .select-box{
            margin-bottom: 15px;
            ::v-deep .el-icon-arrow-up:before{
              content: "\e78f";
              width: 17px;
              color: #000;
            }
          }
          .price-box{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            p{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #343434;
              line-height: 22px;
              &.price{
                span{
                  font-size: 20px;
                  font-family: SourceHanSansCN;
                  font-weight: 500;
                  color: #EC5151;
                }
              }
            }
          }
          .buy-btn-box{
            width: 100%;
            display: flex;
            margin-bottom: 15px;
            .number-box{
              width: 110px;
              height: 30px;
              margin-right: 20px;
              ::v-deep .el-input__inner{
                width: 110px;
                height: 30px;
                background-color: #F0F0F0;
              }
            }
            .buy-btn{
              width: 101px;
              height: 30px;
              background: #C00202;
              border-radius: 5px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 17px;
              cursor: pointer;
              img{
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
            }
          }
          .balance-box{
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
            margin-bottom: 15px;
          }
        }
      }
      .shop-tab-container{
        width: 100%;
        ::v-deep .el-tabs__item.is-active{
          color: #333;
          background-color: #F0F0F0;
        }
        .shop-desc-box{
          width: 100%;
          box-sizing: border-box;
          padding: 0 10px;
          .title{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 24px;
          }
          .shop-div-desc-text{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 24px;
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
      }
    }
  }
</style>
