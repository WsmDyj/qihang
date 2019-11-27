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
import toToc from '../../utils/catalog'
import router from 'vue-router';

@Component
export default class extends Vue {
  @Prop() private catalog!: string
  @Prop() private scrollY!: number
  private fixed: boolean = false
  private target!: NodeListOf<HTMLElement> 

  @Watch('scrollY')
  private changescrollY(val: number) {
    this.fixed = val > 230 ? true : false
  }
  created () {
    this.target = document.getElementsByName('catalog-list')
  }
}
</script>

<style lang="scss">
.sidebar-block {
  text-align: left;
  top: 100px;
  width: 240px;
  bottom: 20px;
  .catalog-title {
    font-size: 15px;
    color: #000;
  }
  .catalog-body {
    position: relative;
    overflow: hidden;
    margin: 6px 0;
    .catalog-list {
      font-weight: 600;
      padding-left: 10px;
      position: relative;
      font-size: 15px;
      &:first-child {
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
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -2px;
          width: 6px;
          height: 6px;
          background-color: currentColor;
          border-radius: 50%;
        }
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
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 20px;
          margin-top: -2px;
          width: 4px;
          height: 4px;
          background-color: currentColor;
          border-radius: 50%;
        }
      }
      ul > ul > li > a {
        line-height: 20px;
        font-size: 14px;
        color: #333333;
        padding-left: 50px;
        font-weight: normal;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 36px;
          margin-top: -2px;
          width: 3px;
          height: 3px;
          background-color: currentColor;
          border-radius: 50%;
        }
      }
      a {
        color: #000;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 4px 0 4px 12px;
        &:hover {
          background-color: #ebedef;
        }
      }
    }
  }
}
</style>
