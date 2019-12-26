<template>
  <div class="question" @click="checkAsk">
    <div class="qa-summary">
      <div class="summary-author">
        <span class="author-name">{{ ask.author }}</span>
        <span class="qa-time">{{ formatDate(ask.createtime) }} 提问</span>
      </div>
      <div class="summary-title">
        <span class="title-conter">{{ ask.title }}</span>
        <span class="title-type" v-for="(tag, index) in ask.articleTag" :key="index">{{ tag }}</span>
      </div>
    </div>
    <div class="qa-rank">
      <div class="qa-votes">
        <span class="qa-votes-count">{{ ask.likeCount }}</span>
        <span class="qa-votes-item">收藏</span>
      </div>
      <div :class="ask.status == 2 ? 'solve qa-votes' : 'not-solve qa-votes'">
        <span class="qa-votes-count">{{ ask.comments }}</span>
        <span class="qa-votes-item">{{ ask.status == 2 ? '解决': '回答'}}</span>
      </div>
      <div class="qa-votes">
        <span class="qa-votes-count">{{ ask.reviews }}</span>
        <span class="qa-votes-item">浏览</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Iquestion } from '../../../api/types'

@Component({
})

export default class extends Vue {
  @Prop() private ask!: Iquestion

  private checkAsk() {
    window.open(`/checkAsk?askId=${this.ask.question_id}`, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.question {
  background: #fff;
  width: 668px;
  box-sizing: border-box;
  padding: 12px 20px 6px 15px;
  display: flex;
  border-bottom: 1px solid rgba(178,186,194,.15);
  &:hover {
    background-color: #f7f9f9;
  }
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
    .solve {
      background: $primary;
      color: #fff;
      width: 45px;
      border-radius: 4px;
    }
    .not-solve {
      width: 45px;
      border-radius: 4px;
      background: rgba(2,127,255,0.08);
      color: $primary;
      border: 1px solid rgba(2,127,255,0.16);
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
      font-size: 17px;
      font-weight: 600;
      margin: 10px 0;
      color: #2e3135;
      cursor: default;
      @include twoLines();
      .title-conter {
        margin-right: 10px;
        &:hover {
          text-decoration: underline;
        }
      }
      .title-type {
        display: inline-block;
        padding: 0px 6px;
        box-sizing: border-box;
        color: $primary;
        background: rgba(2,127,255,0.08);
        font-weight: normal;
        height: 22px;
        line-height: 22px;
        font-size: 13px;
        cursor: pointer;
        text-align: center;
        margin-right: 10px;
        &:hover {
          background: $primary;
          color: #fff;
        }
      }
    }
  }
}
</style>
