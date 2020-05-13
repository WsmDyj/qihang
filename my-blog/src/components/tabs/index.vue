<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" :class="{splitLine: splitLine}" v-for="(tab, index) in tabs" :key="index">
        <span @click="handleClick(tab)" :class="{active: current === tab.label}">{{tab.value}}</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { Qtag } from '../../global'

@Component
export default class extends Vue {
  @Prop() private tabs!: Qtag[]
  @Prop() private splitLine!: Boolean
  private current: string = '0'

  @Emit('click')
  private handleClick(tab: Qtag) {
    this.current = tab.label
    return tab
  }
}
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  .nav-list {
    height: 100%;
    max-width: 994px;
    margin: auto;
    display: flex;
    align-items: center;
    line-height: 1;
    @media (max-width: 993px) {
      width: auto;
      overflow-x: auto;
    }
  }
  &-item {
    color: $navcolor;
    cursor: pointer;
    position: relative;
    padding: 0 1rem;
    height: 100%;
    align-items: center;
    display: flex;
    flex-shrink: 0;
    font-size: 1.16rem;
    &:hover {
      color: $primary;
    }
    @media (min-width: 1024px) {
      &:first-child {
      padding: 0 1rem 0 0;
      }
    }
    .active {
      color: $primary;
    }
  }
  .splitLine {
    @include splitLine($right: 0);
  }
}
</style>
