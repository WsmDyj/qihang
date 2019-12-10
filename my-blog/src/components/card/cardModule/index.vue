<template>
  <div class="card">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class extends Vue {
  @Prop() private title!: string 
}
</script>
<style lang="scss" scoped>
.card {
  width: 240px;
  border-radius: 3px;
  margin-bottom: 20px;
  .clearfix {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
