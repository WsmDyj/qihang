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
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 240px;
  margin-bottom: 20px;
}
</style>
