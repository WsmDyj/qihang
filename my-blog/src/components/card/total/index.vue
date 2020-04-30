<template>
  <div class="total">
    <div class="total-item" @click="handleClick(item)" v-for="(item, index) in navs" :key="index">
      <el-image fit="cover" class="total-item__image" :src="require(`@/assets/home/${item.name}.webp`)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Inav } from '../../header/components/nav.vue'

@Component
export default class extends Vue {
  private navs: Inav[] = [
    { id: 0, name: 'today', path: '/article?articleId=18u4gt2bddvk00' },
    { id: 1, name: 'week', path: '/excellent' },
    { id: 2, name: 'recommend', path: '/share' },
  ]

  private handleClick (item: Inav) {
    console.log(item)
    this.$router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>
.total {
  margin-bottom: 40px;
  width: 240px;
  .total-item {
    margin-bottom: 25px;
    cursor: pointer;
    width: 240px;
    height: 85px;
    @include hoverState($top:-1px);

    &__image {
      border-radius: 3px;
      width: 240px;
      height: 85px;
    }
  }
}
</style>
