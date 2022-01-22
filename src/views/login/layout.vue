<template>
  <div>
    <layout
      :navList="navList"
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
          name: '登录',
          path: '/login/login',
          children: [
            '/login/login'
          ]
        },
        {
          name: '注册',
          path: '/login/register',
          children: [
            '/login/register'
          ]
        },
        { name: '论坛', path: '/forum', children: [] }
        // { name: '验证', path: '/verification', children: [] }
      ]
    }
  }
}
</script>

<style>
</style>
