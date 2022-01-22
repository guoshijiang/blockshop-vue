<template>
  <div>
    <layout
      :navList="userInfo ? navList : noLoginNavList"
    >
      <router-view></router-view>
    </layout>
  </div>
</template>

<script>
import layout from '@/components/layout.vue'
export default {
  components: {
    layout
  },
  data () {
    return {
      navList: [
        {
          name: '首页',
          path: '/index',
          children: [
            '/index',
            '/shopDetail'
          ]
        },
        {
          name: '消息',
          path: '/news',
          children: [
            '/news'
          ]
        },
        {
          name: '成为卖家',
          path: '/becomeSeller',
          children: [
            '/becomeSeller',
            '/orderAdmin',
            '/shopAdmin',
            '/addShop',
            '/step',
            '/waitDeliver',
            '/buyerFeedback'
          ]
        },
        {
          name: '账户',
          path: '/account',
          children: [
            '/account'
          ]
        },
        // {
        //   name: '身份',
        //   path: '/identity',
        //   children: [
        //     '/identity'
        //   ]
        // },
        {
          name: '论坛',
          path: '/forum',
          children: [
            '/forum',
            '/forumChild',
            '/forumList',
            '/forumContent',
            '/publishForum'
          ]
        },
        {
          name: '支持',
          path: '/workOrder',
          children: [
            '/workOrder',
            '/commonList'
          ]
        },
        {
          name: '订单',
          path: '/order',
          children: [
            '/order'
          ]
        },
        {
          name: '账户余额',
          path: '/accountBalance',
          children: [
            '/accountBalance'
          ]
        }
      ],
      noLoginNavList: [
        {
          name: '首页',
          path: '/index',
          children: [
            '/index',
            '/shopDetail'
          ]
        },
        {
          name: '论坛',
          path: '/forum',
          children: [
            '/forum',
            '/forumChild',
            '/forumList',
            '/forumContent',
            '/publishForum'
          ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
