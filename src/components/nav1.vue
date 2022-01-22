<template>
  <div class="nav-container">
    <div class="nav-box">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        @select="handleSelect"
      >
        <el-menu-item index="1">登录</el-menu-item>
        <el-menu-item index="2">注册</el-menu-item>
        <el-menu-item index="3">论坛</el-menu-item>
        <el-menu-item index="4">帮助</el-menu-item>
        <el-menu-item index="5">验证</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
  .nav-container{
    width: 100%;
    background-color: #545c64;
    .nav-box{
      width: 1200px;
      margin: 0 auto;
      ::v-deep .el-menu.el-menu--horizontal{border-bottom: none;}
      ::v-deep .el-menu--horizontal>.el-menu-item.is-active{
        border-bottom: 2px solid #D90717;
        color: #fff;
      }
    }
  }
</style>
