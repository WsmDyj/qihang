<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" @click="handleClick(tab)" :class="{splitLine: splitLine}" v-for="(tab, index) in tabs" :key="index">
        <span :class="{active: current === tab.label}">
          {{tab.value}}
          <i v-if="tab.icon" :class="tab.icon" />
        </span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { Qtag } from '../../global'

@Component
export default class extends Vue {
  @Prop() private tabs!: Qtag[]
  @Prop() private activeIndex!:string
  @Prop() private splitLine!: Boolean
  private current: string = '0'

  @Watch('activeIndex')
  private async watchAuthor(val: string) {
    this.current = val
  }

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
    &:last-child:after {
      content: none;
    }
  }
}
</style>
