<template>
  <div class="ranking">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>🎖️作者榜</span>
      </div>
      <div>
        <author-list></author-list>
      </div>
    </el-card>
  </div>
</template>
<script>
import authorList from '../../components/authorCard/authorList'
export default {
  components: {
    authorList
  }
}
</script>
<style lang="scss" scoped>
.ranking {
  width: 240px;
  position: sticky;
  top: 80px;
}
</style>
