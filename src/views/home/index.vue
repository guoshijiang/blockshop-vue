<template>
  <div class="home-container">
    <div class="home-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
      <!-- 买方统计 -->
      <buyer-statistics></buyer-statistics>
      <!-- 搜索选项 -->
      <div class="search-select-box">
        <p class="module-title">复杂搜索选项</p>
        <div class="search-select-content">
          <el-form :model="searchForm" label-position>
            <el-form-item>
              <div class="seatch-box">
                <el-input v-model="searchForm.goods_name" placeholder="搜索">
                  <el-button slot="append" icon="el-icon-search" class="search-btn" @click="handleSearchGoods"></el-button>
                </el-input>
                <el-button type="primary" class="reset-btn" @click="handleResetGoods">重置</el-button>
              </div>
            </el-form-item>
            <el-form-item label="产品类型">
              <el-radio-group v-model="searchForm.type_id">
                <el-radio
                  v-for="item in goods_type"
                  :key="item.id"
                  :label="item.id"
                >{{ item.type_name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="价格范围">
              <div class="price-range-box">
                <el-input type="number" v-model="searchForm.start_price" placeholder="0.00"></el-input>
                <p class="price-range-text">至</p>
                <el-input type="number" v-model="searchForm.end_price" placeholder="9999.99"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="类别">
              <el-select v-model="searchForm.cat_id" placeholder="请选择">
                <el-option
                  v-for="item in goods_cat"
                  :key="item.id"
                  :label="item.cat_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="原产国">
              <el-select v-model="searchForm.origin_state_id" placeholder="请选择">
                <el-option
                  v-for="item in origin_state"
                  :key="item.id"
                  :label="item.state_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单">
              <el-select v-model="searchForm.order_by" placeholder="请选择">
                <el-option
                  v-for="item in order_by"
                  :key="item.way"
                  :label="item.way_name"
                  :value="item.way">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付">
              <el-select v-model="searchForm.pay_way" placeholder="请选择">
                <el-option
                  v-for="item in pay_way"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 虚拟币汇率 -->
      <exchange-rate></exchange-rate>
    </div>
    <div class="home-right-container">
      <!-- 搜索框 -->
      <div class="search-shop-box">
        <p>欢迎来到哥伦布！</p>
        <el-input v-model="searchForm.goods_name" placeholder="请输入想要搜索的内容">
          <el-button slot="append" icon="el-icon-search" class="search-btn" @click="handleSearchGoods"></el-button>
        </el-input>
      </div>
      <!-- 商品列表 -->
      <div class="characteristic-shopmall-box">
        <p class="module-title">商品列表</p>
        <div class="characteristic-shopmall-content">
          <ul>
            <li
              v-for="item in goodList"
              :key="item&&item.goods_id"
            >
              <router-link :to="{ path: '/commodityDetail', query: { id: item.goods_id } }">
                <div class="img-box">
                  <img :src="item&&item.logo" alt="project-img">
                </div>
                <p class="price-box"><span class="price">¥{{ item&&item.goods_price }}</span></p>
                <p class="commodity-name">{{ item&&item.title }}</p>
              </router-link>
            </li>
          </ul>
          <p class="see-more-box" v-if="goodList.length < searchForm.total" @click="loadMoreGoodList">加载更多 >></p>
          <p class="see-more-box no-data" v-else>暂无更多</p>
        </div>
      </div>
      <!-- 特色商家 -->
      <div class="characteristic-business-container">
        <p class="module-title">特色商家</p>
        <ul class="characteristic-business-content">
          <li
            v-for="item in marchantList"
            :key="item.mct_id"
          >
            <router-link :to="{ path: '/shopIndex', query: { id: item.mct_id } }">
              <div class="left-img">
                <img :src="item.mct_logo" alt="">
              </div>
              <div class="right-info">
                <p class="name">{{ item.mct_name }}<span class="icon">电器</span></p>
                <p>简介：{{ item.mct_introduce }}</p>
                <p>主营：{{ item.merchant_detail }}</p>
              </div>
            </router-link>
          </li>
        </ul>
        <p class="hint-text" v-if="!marchantList.length">暂无更多</p>
      </div>
      <!-- 安全 -->
      <div class="account-security-box">
        <p class="module-title">安全</p>
        <div class="account-security-content">
          <p class="prpgress-text">账户担保：{{ userInfo && userInfo.user_secrity.account_pct }}</p>
          <el-progress class="progress-box" :percentage="securityNum" :stroke-width="18" :show-text="false" color="#05C300"></el-progress>
          <div class="hint-text" v-if="userInfo&&!(userInfo.user_secrity.is_set_key)">
            <img src="@/assets/images/jinggao.png" alt="jinggao">
            <p>您的配置文件中没有任何PGP密钥。</p>
            <el-button type="primary" class="add-btn" @click="handleAddSecurity">添加</el-button>
          </div>
          <div class="hint-text" v-if="userInfo&&!(userInfo.user_secrity.is_open_2_fa)">
            <img src="@/assets/images/jinggao.png" alt="jinggao">
            <p>您现在不使用双因素身份验证(2FA)。</p>
            <el-button type="primary" class="add-btn" @click="handleAddSecurity">添加</el-button>
          </div>
        </div>
      </div>
      <!-- 商城公告信息 -->
      <div class="notice-info-box">
        <p class="module-title">商城公告信息</p>
        <div class="notice-info-content">
          <ul>
            <li
              v-for="item in newsList"
              :key="item.id"
            >
              <p><span class="time">{{ item.created_at }}</span> <router-link :to="{ path: '/newsDetail', query: { id: item.id } }"><span class="text">{{ item.title }}</span></router-link> </p>
            </li>
          </ul>
          <p class="hint-text" v-if="!newsList.length">暂无消息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buyerStatistics from '@/components/buyerStatistics'
import accountInfo from '@/components/accountInfo'
import { goodsQuery, getGoodsList } from '@/api/good.js'
import { getMarchantList } from '@/api/marchant.js'
import { getNewsList } from '@/api/news.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
import exchangeRate from '@/components/exchangeRate.vue'
export default {
  name: 'homeIndex',
  components: {
    buyerStatistics,
    accountInfo,
    exchangeRate
  },
  data () {
    return {
      goods_cat: [],
      goods_type: [],
      origin_state: [],
      order_by: [],
      pay_way: [],
      searchForm: {
        goods_name: '',
        type_id: 0,
        start_price: 0,
        end_price: 0,
        cat_id: 0,
        origin_state_id: 0,
        order_by: 0,
        pay_way: '',
        page: 1,
        page_size: 12,
        total: 0
      },
      goodList: [],
      marchantList: [],
      newsList: [],
      newsParams: {
        page: 1,
        page_size: 10,
        total_page: 1,
        total: 0
      }
    }
  },
  computed: {
    securityNum () {
      if (!(this.userInfo && this.userInfo.user_secrity.account_pct)) return 0
      if (this.userInfo.user_secrity.account_pct.endsWith('%')) {
        const num = +this.userInfo.user_secrity.account_pct.slice(0, -1)
        return num
      }
      return 0
    }
  },
  created () {
    this.initBreadcrumb()
    this.getNewsList()
    this.getGoodQuery()
    this.getMarchantList()
  },
  mounted () {
    const userId = +getUserId() || null
    if (userId) {
      this.getUserInfoFn(userId)
    }
    this.initGoodsList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { path: '/index', name: '首页' }
      ])
    },
    async getNewsList () {
      try {
        const res = await getNewsList(this.newsParams)
        console.log(res)
        if (+res.data.code === 2000) {
          const data = res.data.data
          this.newsList = data.gds_lst || []
          this.newsParams.total = +data.total
          this.newsParams.total_page = Math.ceil(this.newsParams.total / this.newsParams.page_size)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getGoodQuery () {
      try {
        const res = await goodsQuery()
        console.log(res)
        if (+res.data.code === 2000) {
          const data = res.data.data
          this.goods_cat = [{ id: 0, cat_name: '请选择' }, ...data.goods_cat]
          this.goods_type = data.goods_type
          this.origin_state = [{ id: 0, state_name: '请选择' }, ...data.origin_state]
          this.order_by = [{ way: 0, way_name: '请选择' }, ...data.order_by]
          this.pay_way = data.pay_way
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getMarchantList () {
      try {
        const params = {
          page: 1,
          page_size: 12,
          is_show: 0
        }
        const res = await getMarchantList(params)
        console.log(res)
        if (+res.data.code === 2000) {
          this.marchantList = res.data.data.mct_lst || []
        }
      } catch (e) {
        console.log(e)
      }
    },
    initGoodsList () {
      this.searchForm.page = 1
      this.getGoodsList(this.searchForm)
    },
    async getGoodsList (data) {
      try {
        data.end_price = +data.end_price
        data.start_price = +data.start_price
        const res = await getGoodsList(data)
        console.log(res)
        if (+res.data.code === 2000) {
          const data = res.data.data
          if (data.gds_lst) this.goodList = [...this.goodList, ...data.gds_lst] // this.goodList.concat(data.gds_lst)
          this.searchForm.total = data.total
        } else {
          if (res.data.msg) this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.dir(e)
        console.log(e)
      }
    },
    loadMoreGoodList () {
      if (this.goodList.length >= this.searchForm.total) return false
      this.searchForm.page++
      this.getGoodsList(this.searchForm)
    },
    handleSearchGoods () { // 左侧搜索
      this.goodList = []
      this.getGoodsList(this.searchForm)
    },
    handleResetGoods () { // 左侧重置
      const params = {
        goods_name: '',
        type_id: 0,
        start_price: 0,
        end_price: 0,
        cat_id: 0,
        origin_state_id: 0,
        order_by: 0,
        pay_way: '',
        page: 1,
        page_size: 12,
        total: 0
      }
      this.searchForm = Object.assign({}, params)
      this.goodList = []
      this.getGoodsList(params)
    },
    handleAddSecurity () {
      this.$router.push({
        path: '/account',
        query: {
          tab: '4'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container{
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
    .home-left-container{
      width: 380px;
      margin-bottom: 35px;
      .browse-directory-box{
        width: 100%;
        .browse-directory-content{
          width: 100%;
          box-sizing: border-box;
          padding: 30px 20px 10px;
          border: 1px solid #F4F5F7;
          ::v-deep .el-tree{
            .el-tree-node{
              margin-bottom: 10px;
              &:last-child{
                margin-bottom: 0;
              }
              .el-tree-node__children{
                .el-tree-node{
                  margin-bottom: 5px;
                }
              }
            }
          }
          .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
            .shop-name{
              font-size: 18px;
              font-family: PingFang SC;
            }
            .shop-number{
              font-size: 18px;
              font-family: PingFang SC;
              color: #BFBFBF;
            }
          }
        }
      }
      .search-select-box{
        width: 100%;
        .search-select-content{
          width: 100%;
          box-sizing: border-box;
          padding: 12px 15px 35px;
          border: 1px solid #F4F5F7;
          ::v-deep .el-select{
            width: 100%;
            .el-input__inner{
              border: 1px solid #BFBFBF;
              border-radius: 22px;
            }
            .el-input__suffix{
              right: 12px;
            }
            .el-icon-arrow-up:before{
              content: "\e78f";
              width: 17px;
              color: #000;
            }
          }
          ::v-deep .el-form-item{
            margin-bottom: 0;
            .el-form-item__label{
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #343434;
            }
          }
          .seatch-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            ::v-deep .el-input{
              width: 287px;
              height: 44px;
              background: #FFFFFF;
              border: 1px solid #BFBFBF;
              border-radius: 22px;
              .el-input__inner{
                border: none;
                border-radius: 22px;
                height: 44px;
              }
              .el-input-group__append, .el-input-group__prepend{
                background-color: #fff;
                border: none;
                border-radius: 22px;
              }
            }
            .search-btn{
              width: 55px;
              height: 44px;
              background: #0072FF;
              border-radius: 21px;
              color: #fff;
            }
            .reset-btn{
              width: 55px;
              height: 44px;
              background: #0072FF;
              border-radius: 21px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .price-range-box{
            width: 100%;
            height: 32px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            ::v-deep .el-input{
              width: 140px;
              height: 32px;
            }
            ::v-deep .el-input__inner{
              width: 140px;
              height: 32px;
              border: none;
              background-color: #F0F0F0;
            }
          }
        }
      }
      .exchange-rate-box{
        width: 100%;
        .exchange-rate-content{
          width: 100%;
          box-sizing: border-box;
          padding: 33px 33px 10px;
          border: 1px solid #F4F5F7;
          ul{
            width: 100%;
            li{
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 30px;
              .name{
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #343434;
              }
              .price{
                font-size: 18px;
                font-family: Arial;
                font-weight: bold;
                &.up{
                  color: #C30000;
                }
                &.down{
                  color: #05C300;
                }
              }
            }
          }
        }
      }
    }
    .home-right-container{
      width: 791px;
      .search-shop-box{
        width: 100%;
        box-sizing: border-box;
        padding: 14px 18px 38px;
        p{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          margin-bottom: 13px;
        }
        ::v-deep .el-input{
          width: 450px;
          height: 44px;
          background: #FFFFFF;
          border: 1px solid #BFBFBF;
          border-radius: 22px;
          .el-input__inner{
            border: none;
            border-radius: 22px;
            height: 44px;
          }
          .el-input-group__append, .el-input-group__prepend{
            background-color: #fff;
            border: none;
            border-radius: 22px;
          }
        }
        .search-btn{
          width: 74px;
          height: 44px;
          background: #0072FF;
          border-radius: 21px;
          color: #fff;
        }
      }
      .characteristic-business-container{
        width: 100%;
        .characteristic-business-content{
          padding-top: 15px;
          display: flex;
          flex-wrap: wrap;
          li{
            width: 250px;
            box-sizing: border-box;
            padding: 10px;
            border: 1px solid #eee;
            margin-bottom: 10px;
            margin-right: 20px;
            &:nth-child(3n+3) {
              margin-right: 0;
            }
            a{
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .left-img{
              width: 70px;
              height: 70px;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                display: block;
                max-width: 100%;
                max-height: 100%;
              }
            }
            .right-info{
              p{
                width: 150px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 10px;
                &:last-child{
                  margin-bottom: 0;
                }
              }
            }
          }
        }
        .hint-text{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ccc;
          line-height: 20px;
          text-align: center;
          padding-bottom: 20px;
        }
      }
      .characteristic-shopmall-box{
        width: 100%;
        .characteristic-shopmall-content{
          width: 100%;
          padding: 5px 0;
          padding-top: 10px;
          ul{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            li{
              width: 187px;
              min-height: 200px;
              border: 1px solid #EEEEEE;
              margin-bottom: 15px;
              margin-right: 11.4px;
              &:nth-child(4n+4){
                margin-right: 0;
              }
              .img-box{
                width: 100%;
                height: 130px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  display: block;
                  max-height: 130px;
                  max-width: 187px;
                }
              }
              .price-box{
                padding: 10px 14px 7px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .price{
                  font-size: 20px;
                  font-family: SourceHanSansCN;
                  font-weight: 500;
                  color: #FF4049;
                }
                .label{
                  height: 20px;
                  text-align: center;
                  background: #F0F0F0;
                  font-size: 12px;
                  padding: 0 10px;
                  line-height: 20px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  margin-left: 8px;
                }
              }
              .commodity-name{
                padding: 0 12px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 20px;
                margin-bottom: 7px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .shop-name{
                width: 187px;
                height: 46px;
                box-sizing: border-box;
                padding: 0 13px;
                font-size: 14px;
                line-height: 46px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                border-top: 1px solid #eee;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .see-more-box{
            width: 100%;
            box-sizing: border-box;
            padding: 25px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: bold;
            cursor: pointer;
            &.no-data{
              color: #999;
              cursor: default;
            }

          }
        }
      }
      .account-security-box{
        width: 100%;
        margin-bottom: 13px;
        .account-security-content{
          width: 100%;
          box-sizing: border-box;
          padding: 17px 20px 33px;
          border: 1px solid #F4F5F7;
          .prpgress-text{
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #666666;
          }
          .progress-box{
            margin: 9px 0 18px;
          }
          .hint-text{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            img{
              width: 24px;
              margin-right: 6px;
            }
            p{
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #666666;
              margin-right: 16px;
            }
            .add-btn{
              width: 60px;
              height: 24px;
              background: linear-gradient(90deg, #008DFF, #0060FF);
              border-radius: 12px;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
      .notice-info-box{
        width: 100%;
        margin-bottom: 30px;
        .notice-info-content{
          width: 100%;
          box-sizing: border-box;
          padding: 25px;
          border: 1px solid #F4F5F7;
          ul{
            width: 100%;
            li{
              width: 100%;
              margin-bottom: 19px;
              p{
                display: flex;
                justify-content: space-between;
                .time{
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #B0B0B0;
                  line-height: 20px;
                }
                .text{
                  display: block;
                  width: 500px;
                  font-size: 16px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #2A2A2A;
                  line-height: 20px;
                  text-align: left;
                }
              }
            }
          }
        }
        .hint-text{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ccc;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
