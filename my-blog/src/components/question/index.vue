<template>
  <div class="question" @click="checkArticle">
    
    <div class="qa-summary">
      <div class="summary-author">
        <span class="author-name">张三</span>
        <span class="qa-time">12分钟前 提问</span>
      </div>
      <div class="summary-title">
        <span class="title-conter">js如何将一个二维数组按照相同值进行筛选？</span>
        <span class="title-type">vue</span>
        <span class="title-type">JavaScript</span>
      </div>
    </div>
    <div class="qa-rank">
      <div class="qa-votes">
        <span class="qa-votes-count">10</span>
        <span class="qa-votes-item">收藏</span>
      </div>
      <div class="qa-votes answers">
        <span class="qa-votes-count">34</span>
        <span class="qa-votes-item">回答</span>
      </div>
      <div class="qa-votes">
        <span class="qa-votes-count">235</span>
        <span class="qa-votes-item">浏览</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
})

export default class extends Vue {
  private checkArticle() {
    window.open(`/article?articleId=${''}`, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.question {
  background: #fff;
  width: 620px;
  height: 48px;
  padding: 12px 24px;
  display: flex;
  border-bottom: 1px solid rgba(178,186,194,.15);
  .qa-rank {
    height: 100%;
    display: flex;
    justify-content: space-between;
    color: #757575;
    width: 175px;
    .qa-votes {
      cursor: default;
      padding: 5px 0;
      text-align: center;
    }
    .answers {
      background: $primary;
      color: #fff;
      // color: red;
      // background: rgba(2,127,255,0.08);
      // color: $primary;
      // border: 1px solid rgba(2,127,255,0.16);
      width: 45px;
      border-radius: 4px;
    }
    .qa-votes-item {
      display: block;
      padding-top: 5px;
    }
    
  }
  .qa-summary {
    width: 100%;
    position: relative;
    margin-right: 10px;
    .summary-author {
      font-size: 13px;
      color: #b2bac2;
      cursor: default;
      position: relative;
      .qa-time {
        @include textRound();
      }
    }
    .summary-title {
      position: absolute;
      bottom: 0;
      font-size: 17px;
      font-weight: 600;
      color: #2e3135;
      cursor: default;
      .title-conter {
        display: inline-block;
        vertical-align: middle;
        max-width: 340px;
        @include nowrap();
        &:hover {
          color: $primary;
          text-decoration: underline;
        }
      }
      .title-type {
        display: inline-block;
        vertical-align: middle;
        padding: 4px 6px;
        color: $primary;
        background: rgba(2,127,255,0.08);
        font-weight: normal;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        margin-left: 10px;
        &:hover {
          background: $primary;
          color: #fff;
        }
      }
    }
  }
}
</style>
