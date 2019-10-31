<template>
  <div class="home">
    <Header />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/header/index.vue'

@Component({
  components: {
    Header
  },
})

export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .main {
    position: relative;
    width: 932px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
