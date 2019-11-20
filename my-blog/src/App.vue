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
export default class App extends Vue {}
</script>

<style>
</style>
