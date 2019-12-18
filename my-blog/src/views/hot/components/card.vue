<template>
  <div class="card">
    <div class="card-slogan">
      <div class="card-title">阅读模块是什么？</div>
      <div class="card-desc">读书笔记 记录书本中的知识</div>
    </div>
    <div class="card-share">
      <div class="card-title">加入好友群 一起分享交流</div>
      <el-image
        style="width: 208px; height: 90px"
        src="https://img13.360buyimg.com/imagetools/jfs/t1/108877/25/1000/47931/5df9df5fE45258adb/32c39ae37093a0ec.png"
        fit="contain"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.card {
  position: sticky;
  top: 96px;
  width: 240px;
  height: 260px;
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(4,5,13,.23);
  background-color: #fff;
  .card-slogan {
    height: 98px;
    padding: 15px 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e8e8;
    .card-title {
      font-size: 16px;
      font-weight: 400;
      color: #000;
      margin-bottom: 20px;
    }
    .card-desc {
      color: $fontcolor;
    }
  }
  .card-share {
    padding: 15px 16px;
    .card-title {
      font-size: 16px;
      font-weight: 400;
      color: #000;
      margin-bottom: 20px;
    }
  }
}
</style>
