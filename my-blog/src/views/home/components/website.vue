<template>
  <div class="website">
    <div class="website-item">
      <span class="website-roundRight hover">关于</span>
      <span class="website-roundRight hover">隐私协议</span>
      <span class="website-roundRight hover">联系我们</span>
      <span class="hover">建议反馈</span>
    </div>
    <div class="website-item">
      网站素材均来源于网络，如有侵权请联系作者
    </div>
    <div class="website-item">
        📧 972774037@qq.com
    </div>
    <div class="website-item">
      <router-link class="hover" target="_blank" to="http://www.miibeian.gov.cn/">京ICP备19058301号-2</router-link>
    </div>
    <div class="website-item">
      <span class="website-roundRight">©2019 起航 </span>
      <span>Powered by aliyun</span>
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
.website {
  width: 240px;
  font-size: 1rem;
  line-height: 1.6;
  color: $navcolor;
  cursor: pointer;
  &-roundRight{
    @include textRoundRight($color: $navcolor);
    
  }
  .hover:hover {
    color: $primary;
  }
}
</style>
