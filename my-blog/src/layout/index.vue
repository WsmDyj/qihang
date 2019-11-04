<template>
  <div class="layout">
    <div class="header">
      <Header />
    </div>
     <div class="main">
       <div class="container">
        <router-view class="router-content"></router-view>
       </div>
       <div class="sidebar"></div>
     </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'

@Component({
  name:'home',
  components: {
    Header,
  },
})
export default class extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
