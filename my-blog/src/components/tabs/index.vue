<template>
  <div class="tabs">
    <div class="tabs-item" v-for="(tab, index) in tabs" :key="index">
      <span @click="handleClick(tab)" :class="{active: current === tab.label}">{{tab.value}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { Qtag } from '../../global'

@Component
export default class extends Vue {
  @Prop() private tabs!: Qtag[]
  private current: string = '0'

  @Emit('click')
  private handleClick(tab: Qtag) {
    this.current = tab.label
    return tab
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  &-item {
    color: $navcolor;
    cursor: pointer;
    padding: 0 1rem;
    font-size: 14px;
    border-right: 1px solid hsla(0,0%,59.2%,.2);
    &:last-child {
      border-right: none;
    }
    &:hover {
      color: $primary;
    }
    .active {
      color: $primary;
    }
  }
}
</style>
