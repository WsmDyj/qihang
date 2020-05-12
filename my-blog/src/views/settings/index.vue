<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <Setting />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import Setting from './components/index.vue'

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