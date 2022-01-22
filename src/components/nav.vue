<template>
  <div class="nav-container">
    <ul class="nav-box">
      <li
        v-for="item in navList"
        :key="item.name"
        :class="{active: item.children.includes($route.path)}"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    navList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .nav-container{
    width: 100%;
    background: #343434;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    .nav-box{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      li{
        margin-right: 10px;
        &.active{
          background-color: #1652B5;
        }
        a{
          display: block;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 24px;
          padding: 20px 17px;
          &:hover{
            background-color: rgba(255,255,255, 0.3);
          }
        }
      }
    }
  }
</style>
