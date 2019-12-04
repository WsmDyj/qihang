<template>
 <div :style="{position: fixed ? 'fixed' : ''}" class="sidebar-block">
    <nav class="catalog">
      <div class="catalog-title">目录</div>
      <div class="catalog-body" v-html="catalog"></div>
    </nav>
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop() private catalog!: string
  @Prop() private fixed!: boolean
}
</script>

<style lang="scss">
.sidebar-block {
  top: 80px;
  width: 240px;
  bottom: 20px;
  .catalog-title {
    font-size: 15px;
    color: #000;
    margin-bottom: 10px;
  }
  .catalog-body {
    position: relative;
    overflow: hidden;
    .catalog-list {
      font-weight: 600;
      padding-left: 10px;
      position: relative;
      font-size: 15px;
      &:first-child {
        margin-top: 0;
        &::before {
          content: "";
          position: absolute;
          top: 10px;
          left: 12px;
          bottom: 0;
          width: 2px;
          background-color: #ebedef;
          opacity: .8;
        }
      }
      & > li > a {
        position: relative;
        padding-left: 16px;
        line-height: 20px;
        @include catalogRound(0, 6px);
      }
      .active {
        color: #007fff;
        background-color: #ebedef;
      }
      ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      ul > li > a {
        font-size: 14px;
        color: #333333;
        padding-left: 36px;
        font-weight: 500;
        position: relative;
        @include catalogRound(20px, 5px);
      }
      ul > ul > li > a {
        line-height: 20px;
        font-size: 14px;
        color: #333333;
        padding-left: 50px;
        font-weight: normal;
        @include catalogRound(36px, 4px);
      }
      a {
        @include nowrap;
        color: #000;
        display: block;
        padding: 4px 0 4px 12px;
        &:hover {
          background-color: #ebedef;
        }
      }
    }
  }
}
</style>
