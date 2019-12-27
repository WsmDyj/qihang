<template>
  <div class="more">
    <div class="item">
      <el-link>关于</el-link> ·
      <el-link>隐私协议</el-link> ·
      <el-link>联系我们</el-link> ·
      <el-link>建议反馈</el-link>
    </div>
    <div class="item">
      <el-link>
        网站素材均来源于网络，如有侵权请联系作者
        
      </el-link>
      <el-link>
        📧 972774037@qq.com
      </el-link>
    </div>
    <div class="item">
      <el-link href="http://www.miibeian.gov.cn/" target="_blank">京ICP备19058301号-2</el-link>
    </div>
    <div class="item">
      <el-link >©2019 起航 </el-link> ·
      <el-link href="https://www.aliyun.com/" target="_blank">Powered by aliyun</el-link>
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
.more {
  width: 240px;
  color: #909090;
  .item {
    padding: 2px 0;
  }
}
</style>
