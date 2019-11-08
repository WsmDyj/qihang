<template>
  <div class="card">
    <cardModule title="🎖️作者榜">
      <author-list></author-list>
    </cardModule>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import authorList from './authorList/index.vue'
import cardModule from '../cardModule/index.vue'

@Component({
  components: {
    authorList,
    cardModule
  },
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.card {
  position: sticky;
  top: 80px;
}
</style>
