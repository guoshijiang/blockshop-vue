<template>
  <div class="layout-container">
    <div class="layout-header">
      <block-header></block-header>
      <block-nav :navList="navList"></block-nav>
    </div>
    <div class="layout-box">
      <breadcrumb-navigation :navArr="navArr"></breadcrumb-navigation>
      <slot></slot>
    </div>
    <block-footer></block-footer>
  </div>
</template>

<script>
import blockHeader from '@/components/header.vue'
import blockNav from '@/components/nav.vue'
import blockFooter from '@/components/footer.vue'
import breadcrumbNavigation from '@/components/breadcrumbNavigation.vue'
import bus from '@/bus'
export default {
  name: 'Layout',
  props: {
    navList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    blockHeader,
    blockNav,
    blockFooter,
    breadcrumbNavigation
  },
  data () {
    return {
      navArr: []
    }
  },
  created () {
    bus.$on('breadcrumb', breadcrumb => {
      this.navArr = breadcrumb
    })
  }
}
</script>

<style lang="less" scoped>
  .layout-container{
    width: 100%;
    min-height: 100vh;
    background-color: #F7F7F7;
    .layout-box{
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;
      min-height: calc(100vh - 202px);
    }
  }
</style>
