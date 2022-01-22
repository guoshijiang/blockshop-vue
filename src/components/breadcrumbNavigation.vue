<template>
  <ul class="breadcrumb-navigation-container">
    <li class="icon-box"><router-link to="/"><img src="@/assets/images/dingdan.png" alt="dingdan"></router-link></li>
    <span class="lj-icon" v-if="navArr.length"><img src="@/assets/images/jt-1.png" alt="jt-1.png"></span>
    <span class="lj-icon" v-else><img src="@/assets/images/jt-2.png" alt="jt-1.png"></span>
    <div
      class="for-box"
      v-for="(item,index) in navArr"
      :key="index"
    >
      <li
        class="name-box"
      >
        <!-- <router-link :to="item.path">{{ item.name }}</router-link> -->
        {{ item.name }}
      </li>
      <span class="lj-icon" v-if="index === navArr.length-1"><img src="@/assets/images/jt-2.png" alt="jt-1.png"></span>
      <span class="lj-icon" v-else><img src="@/assets/images/jt-1.png" alt="jt-1.png"></span>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'breadcrumbNavigation',
  props: {
    navArr: {
      type: Array,
      default: () => [
        { name: '首页', path: '/index' },
        { name: '成为卖家', path: '/index' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .breadcrumb-navigation-container{
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid #F4F5F7;
    display: flex;
    align-items: center;
    .for-box{
      display: flex;
      align-items: center;
    }
    li{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon-box{
      width: 50px;
      height: 35px;
      background-color: #F4F5F7;
    }
    .name-box{
      width: 110px;
      height: 35px;
      background: #F4F5F7;
      a{
        font-size: 14px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #343434;
        line-height: 24px;
      }
    }
  }
</style>
