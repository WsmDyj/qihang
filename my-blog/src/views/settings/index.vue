<template>
  <div class="container">
    <Header />
    <div class="main">
      <Setting />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import Setting from '@/components/setting/index.vue'

@Component({
  name:'settings',
  components: {
    Header,
    Setting
  },
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    position: relative;
    width: 932px;
    margin-top: 90px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>