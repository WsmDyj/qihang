<template>
  <div class="catalog">
    <div class="catalog-title">目录</div>
    <div class="catalog-body" v-html="toc"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import toToc from '../../utils/catalog'

@Component
export default class extends Vue {
  @Prop() private article!: string
  private toc: string = ''
  @Watch('article')
  private watchArticle(val:string) {
    const _toc: string[]| null = val.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g)
    if(_toc) {
      this.toc = toToc(_toc)
    }
  }
  
}
</script>

<style lang="scss">
.catalog {
  position: sticky;
  text-align: left;
  top: 100px;
  width: 240px;
  .catalog-title {
    font-size: 15px;
    color: #000;
    margin-bottom: -5px;
  }
  .catalog-body {
    position: relative;
    overflow: hidden;
    .catalog-list {
      font-weight: 600 !important;
      position: relative;
      font-size: 15px;
      line-height: 1.3;
      &:first-child:before {
          content: "";
          position: absolute;
          top: 0;
          left: 20px;
          bottom: 0;
          width: 2px;
          background-color: #ebedef;
          opacity: .8;
        }
      ul {
        padding-left: 20px;
        margin: 0px;
        
      }
      ul >li>a {
        font-size: 14px;
        color: #333333;
        font-weight: none;
      }
      ul >ul>li>a {
        font-size: 14px;
        color: #333333;
        font-weight: none;
      }

      li {
        padding-left: 0px;
        padding-top: 15px;
        &:first-child {
          padding-top: 0;
        }
      }
      a {
        color: #000;
        display: block;
        width: 100%;  //宽度根据你要显示的字数来定
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item {
        margin-left: 0;
      }
    }
  }
}
</style>
