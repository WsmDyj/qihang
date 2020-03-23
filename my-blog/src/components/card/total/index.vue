<template>
  <div class="total">
    <div class="total-item" v-for="(item, index) in navs" :key="index">
      <el-image fit="cover" style="border-radius:4px;width: 240px;height:85px" :src="require(`@/assets/home/${item.name}.webp`)" >
      </el-image>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Inav } from '../../header/components/nav.vue'

@Component
export default class extends Vue {
  private navs: Inav[] = [
    { id: 0, name: 'today', path: '/' },
    { id: 1, name: 'week', path: '/questions' },
    { id: 2, name: 'recommend', path: '/hot' },
  ]
}
</script>

<style lang="scss" scoped>
.total {
  margin-bottom: 40px;
  width: 240px;
  .total-item {
    margin-bottom: 24px;
    cursor: pointer;
    width: 240px;
    height: 85px;
    @include hoverState($top:-1px);
  }
}
</style>
