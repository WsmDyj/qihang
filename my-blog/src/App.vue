<template>
  <div id="app">
    <router-view />
    <el-tooltip placement="top" content="返回顶部"><back-to-top/></el-tooltip>
    <LiveMessage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BackToTop from '@/components/BackToTop/index.vue'
import LiveMessage from '@/components/message/index.vue'

@Component({
  components: {
    BackToTop,
    LiveMessage
  },
})
export default class App extends Vue {
  // @Provide() private isRouterAlive: boolean = true

  // private reload() {
  //   this.isRouterAlive = false
  //   this.$nextTick((): void =>  {
  //     this.isRouterAlive = true
  //   }) 
  // }
 
}
</script>

<style>
</style>
