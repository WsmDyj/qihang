<template>
  <div class="header">
    <div class="navigation">
      <div class="nav-list" v-for="(nav, index) in navs" :key="index">
        <div class="nav-item">{{nav.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navs: [
        { name: "推荐",},
        { name: "JavaScript",},
        { name: "Vue.js",},
        { name: "React.js",},
        { name: "Node.js",},
        { name: "Webpack.js",},
        { name: "微信小程序",},
        { name: "Flutter.js",},
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  background: #fff;
  position: -webkit-sticky;
  position: sticky;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  top: 0;
  z-index: 99;
  .navigation {
    height: 46px;
    display: flex;
    line-height: 46px;
    max-width: 960px;
    margin: 0 auto;
    cursor: pointer;
    .nav-item {
      padding: 0 14px 0 0;
      font-size: 14px;
      font-weight: 500;
      color: #71777c;
      margin-right: 10px;
      &:hover {
        color: #007fff;
      }
    }
  }
}
</style>