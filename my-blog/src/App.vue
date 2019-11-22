<template>
  <div id="app">
    <router-view />
    <el-tooltip placement="top" content="返回顶部"><back-to-top/></el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BackToTop from '@/components/BackToTop/index.vue'

@Component({
  components: {
    BackToTop
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
