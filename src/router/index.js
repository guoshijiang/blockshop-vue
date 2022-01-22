import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/',
    name: 'homeIndex',
    component: () => import(/* webpackChunkName: "layout" */ '../views/home/layout.vue'),
    meta: {
      title: '哥伦布商城'
    },
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import(/* webpackChunkName: "homeIndex" */ '../views/home/index.vue'),
        meta: {
          title: '哥伦布商城-首页'
        }
      },
      {
        path: 'commodityDetail',
        name: 'commodityDetail',
        component: () => import(/* webpackChunkName: "commodityDetail" */ '../views/home/commodityDetail.vue'),
        meta: {
          title: '哥伦布商城-商品详情'
        }
      },
      {
        path: 'placeOrder',
        name: 'PlaceOrder',
        component: () => import(/* webpackChunkName: "commodityDetail" */ '../views/home/placeOrder.vue'),
        meta: {
          title: '哥伦布商城-创建订单'
        }
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import(/* webpackChunkName: "commodityDetail" */ '../views/home/orderDetail.vue'),
        meta: {
          title: '哥伦布商城-订单详情'
        }
      },
      {
        path: 'orderDetailBuy',
        name: 'orderDetailBuy',
        component: () => import(/* webpackChunkName: "commodityDetail" */ '../views/home/orderDetail_buy.vue'),
        meta: {
          title: '哥伦布商城-订单详情'
        }
      },
      {
        path: 'orderBack',
        name: 'orderBack',
        component: () => import(/* webpackChunkName: "commodityDetail" */ '../views/home/orderBack.vue'),
        meta: {
          title: '哥伦布商城-退货申请'
        }
      },
      {
        path: 'publishComment',
        name: 'publishComment',
        component: () => import(/* webpackChunkName: "commodityDetail" */ '../views/home/publishComment.vue'),
        meta: {
          title: '哥伦布商城-发布评论'
        }
      },
      {
        path: 'shopIndex',
        name: 'shopIndex',
        component: () => import(/* webpackChunkName: "shopDetail" */ '../views/home/shopIndex.vue'),
        meta: {
          title: '哥伦布商城-店铺主页'
        }
      },
      {
        path: 'shopDetail',
        name: 'shopDetail',
        component: () => import(/* webpackChunkName: "shopDetail" */ '../views/home/shopDetail.vue'),
        meta: {
          title: '哥伦布商城-店铺详情'
        }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import(/* webpackChunkName: "account" */ '../views/account'),
        meta: {
          title: '哥伦布商城-账户设置'
        }
      },
      {
        path: 'identity',
        name: 'Identity',
        component: () => import(/* webpackChunkName: "identity" */ '../views/identity'),
        meta: {
          title: '哥伦布商城-身份信息'
        }
      },
      {
        path: 'becomeSeller',
        name: 'BecomeSeller',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller'),
        meta: {
          title: '哥伦布商城-成为卖家'
        }
      },
      {
        path: 'buyerFeedback',
        name: 'buyerFeedback',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/buyerFeedback.vue'),
        meta: {
          title: '哥伦布商城-买家反馈'
        }
      },
      {
        path: 'orderAdmin',
        name: 'orderAdmin',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/orderAdmin.vue'),
        meta: {
          title: '哥伦布商城-订单管理'
        }
      },
      {
        path: 'shopAdmin',
        name: 'shopAdmin',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/shopAdmin.vue'),
        meta: {
          title: '哥伦布商城-商品管理'
        }
      },
      {
        path: 'addShop',
        name: 'addShop',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/addShop.vue'),
        meta: {
          title: '哥伦布商城-添加商品'
        }
      },
      {
        path: 'editShop',
        name: 'EditShop',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/editShop.vue'),
        meta: {
          title: '哥伦布商城-编辑商品'
        }
      },
      {
        path: 'step',
        name: 'step',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/step.vue'),
        meta: {
          title: '哥伦布商城-店铺信息'
        }
      },
      {
        path: 'editStep',
        name: 'editStep',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/editStep.vue'),
        meta: {
          title: '哥伦布商城-编辑店铺信息'
        }
      },
      {
        path: 'allOrder',
        name: 'allOrder',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/allOrder.vue'),
        meta: {
          title: '哥伦布商城-全部订单'
        }
      },
      {
        path: 'waitHandle',
        name: 'waitHandle',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/waitHandle.vue'),
        meta: {
          title: '哥伦布商城-待处理'
        }
      },
      {
        path: 'waitDeliver',
        name: 'waitDeliver',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/waitDeliver.vue'),
        meta: {
          title: '哥伦布商城-待发货'
        }
      },
      {
        path: 'deliver',
        name: 'deliver',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/deliver.vue'),
        meta: {
          title: '哥伦布商城-已发货'
        }
      },
      {
        path: 'waitBack',
        name: 'waitBack',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/waitBack.vue'),
        meta: {
          title: '哥伦布商城-待退款'
        }
      },
      {
        path: 'completeOrder',
        name: 'completeOrder',
        component: () => import(/* webpackChunkName: "becomeSeller" */ '../views/becomeSeller/completeOrder.vue'),
        meta: {
          title: '哥伦布商城-已完成'
        }
      },
      {
        path: 'workOrder',
        name: 'WorkOrder',
        component: () => import(/* webpackChunkName: "workOrder" */ '../views/workOrder'),
        meta: {
          title: '哥伦布商城-工单支持'
        }
      },
      {
        path: 'commonList',
        name: 'commonList',
        component: () => import(/* webpackChunkName: "workOrder" */ '../views/workOrder/list.vue'),
        meta: {
          title: '哥伦布商城-常见问题'
        }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import(/* webpackChunkName: "news" */ '../views/news'),
        meta: {
          title: '哥伦布商城-消息'
        }
      },
      {
        path: 'newsDetail',
        name: 'NewsDetail',
        component: () => import(/* webpackChunkName: "news" */ '../views/news/detail'),
        meta: {
          title: '哥伦布商城-消息详情'
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "order" */ '../views/news/order'),
        meta: {
          title: '哥伦布商城-订单'
        }
      },
      {
        path: 'fileOrder',
        name: 'fileOrder',
        component: () => import(/* webpackChunkName: "order" */ '../views/news/fileOrder'),
        meta: {
          title: '哥伦布商城-存档订单'
        }
      },
      {
        path: 'blockList',
        name: 'blockList',
        component: () => import(/* webpackChunkName: "blockList" */ '../views/news/blockList'),
        meta: {
          title: '哥伦布商城-屏蔽名单'
        }
      },
      {
        path: 'collectionShop',
        name: 'bloccollectionShopkList',
        component: () => import(/* webpackChunkName: "collectionShop" */ '../views/news/collectionShop'),
        meta: {
          title: '哥伦布商城-收藏商家'
        }
      },
      {
        path: 'collectionCommodity',
        name: 'collectionCommodity',
        component: () => import(/* webpackChunkName: "collectionCommodity" */ '../views/news/collectionCommodity'),
        meta: {
          title: '哥伦布商城-收藏商品'
        }
      },
      {
        path: 'accountBalance',
        name: 'accountBalance',
        component: () => import(/* webpackChunkName: "collectionCommodity" */ '../views/accountBalance'),
        meta: {
          title: '哥伦布商城-账户余额'
        }
      },
      {
        path: 'forum',
        name: 'forum',
        component: () => import(/* webpackChunkName: "collectionCommodity" */ '../views/forum'),
        meta: {
          title: '哥伦布商城-论坛'
        }
      },
      {
        path: 'forumChild',
        name: 'forumChild',
        component: () => import(/* webpackChunkName: "collectionCommodity" */ '../views/forum/forumChild.vue'),
        meta: {
          title: '哥伦布商城-子版块'
        }
      },
      {
        path: 'forumList',
        name: 'forumList',
        component: () => import(/* webpackChunkName: "collectionCommodity" */ '../views/forum/forumList.vue'),
        meta: {
          title: '哥伦布商城-文章列表'
        }
      },
      {
        path: 'forumContent',
        name: 'forumContent',
        component: () => import(/* webpackChunkName: "collectionCommodity" */ '../views/forum/forumContent.vue'),
        meta: {
          title: '哥伦布商城-文章内容'
        }
      },
      {
        path: 'publishForum',
        name: 'publishForum',
        component: () => import(/* webpackChunkName: "collectionCommodity" */ '../views/forum/publishForum.vue'),
        meta: {
          title: '哥伦布商城-发布文章'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/layout.vue'),
    children: [
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import(/* webpackChunkName: "Login" */ '../views/login/login.vue'),
        meta: {
          title: '哥伦布商城-登录'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/login/register.vue'),
        meta: {
          title: '哥伦布商城-注册'
        }
      },
      {
        path: 'forget',
        name: 'Forget',
        component: () => import(/* webpackChunkName: "forget" */ '../views/login/forget.vue'),
        meta: {
          title: '哥伦布商城-忘记密码'
        }
      },
      {
        path: 'reset',
        name: 'Reset',
        component: () => import(/* webpackChunkName: "forget" */ '../views/login/reset.vue'),
        meta: {
          title: '哥伦布商城-重置密码'
        }
      },
      {
        path: 'authentication',
        name: 'Authentication',
        component: () => import(/* webpackChunkName: "forget" */ '../views/login/authentication.vue'),
        meta: {
          title: '哥伦布商城-双因素认证'
        }
      },
      {
        path: 'save',
        name: 'Save',
        component: () => import(/* webpackChunkName: "forget" */ '../views/login/save.vue'),
        meta: {
          title: '哥伦布商城-保存修改'
        }
      }
    ]
  },
  {
    path: '/protect',
    name: 'Protect',
    component: () => import(/* webpackChunkName: "forget" */ '../views/login/protect.vue'),
    meta: {
      title: '哥伦布商城-入站验证'
    }
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
  next()
})
export default router
