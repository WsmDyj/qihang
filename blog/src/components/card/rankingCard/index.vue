<template>
  <div class="card">
    <cardModule title="🎖️作者榜">
      <author-list></author-list>
    </cardModule>
  </div>
</template>
<script>
import authorList from './authorList'
import cardModule from '../cardModule'
export default {
  components: {
    authorList,
    cardModule
  }
}
</script>
<style lang="scss" scoped>
.card {
  position: sticky;
  top: 80px;
}
</style>
