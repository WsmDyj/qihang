<template>
  <div id="home">
    <div>{{msg}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class App extends Vue {
   msg: string = 'this is home page'
   created(): void {
   }
}
</script>

<style>
</style>
