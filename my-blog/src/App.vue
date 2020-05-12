<template>
  <div id="app">
    <router-view />
      <back-to-top />
      <LiveMessage />
      <login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BackToTop from '@/components/BackToTop/index.vue'
import LiveMessage from '@/components/message/index.vue'
import login from '@/components/login/index.vue'

@Component({
  components: {
    BackToTop,
    LiveMessage,
    login
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
