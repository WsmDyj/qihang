<template>
  <div class="article">
    <div class="sub-header">
      <div class="sub-header-title">我的专栏</div>
      <div class="sub-type-box">
        <span class="sub-type">热门</span>
        <span class="sub-type action">最新</span>
      </div>
    </div>
    <div class="entry-list" v-for="(article, index) in articles" :key="index">
      <div class="row userInfo-row">
        <article-title :article= article></article-title>
      </div>
      <div class="row abstract-row">
        <span class="title">{{ article.title }}</span>
        <span class="abstract">{{ article.content}}</span>
      </div>
      <div class="row action-row">
        <div class="action-list">
          <article-action :article= article></article-action>
        </div>
        <div class="action-box">
          <span class="read-action">阅读全文</span>
          <el-dropdown placement="top">
            <span class="el-icon-more"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import articleTitle from '../../articleTitle/index.vue'
import articleAction from '../../articleAction/index.vue'
import { IArticleData } from '../../../api/types'

@Component({
  name: 'authorArticle',
  components: {
    articleTitle,
    articleAction
  },
})

export default class extends Vue {
  @Prop({ required: true }) private articles!: IArticleData[]
}
</script>
<style lang="scss" scoped>
.article {
  margin: 20px  auto 0 auto;
  width: 668px;
  cursor: pointer;
  background: #fff;
  .sub-header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 30px;
    color: #000;
    white-space: nowrap;
    border-bottom: 1px solid rgba(230,230,231,.5);
    .sub-header-title {
      font-size: 16px;
      font-weight: 700;
    }
    .sub-type-box {
      color: #72777b;
      .sub-type:first-child {
        position: relative;
        margin-right: 20px;
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -14px;
          margin-top: -7px;
          width: 1px;
          height: 14px;
          background-color: #b2bac2;
          opacity: .5;
        }
      }
      .action {
        color: #000;
      }
    }
  }
  .entry-list {
    width: 100%;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(230,230,231,.5);
    &:hover {
      background: #fcfcfc;
    }
    .userInfo-row {
      padding: 4px 0 18px;
    }
    .abstract-row {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .title {
        width: 100%;
        margin-bottom: 11px;
        font-size: 28px;
        color: #000;
        line-height: 1.3;
        font-weight: 600;
        word-break: break-word;
        word-wrap: break-word;
        letter-spacing: 0.56px;
      }
      .abstract {
        width: 100%;
        max-height: 109px;
        line-height: 1.6;
        letter-spacing: 0.28;
        color: #8b8b8b;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        font-size: 17px;
      }
    }
    .action-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 21px;
      font-size: 14px;
      color: rgba(24,37,50,.3);
      .read-action {
        margin-right: 20px;
        &:hover {
        color: #000;
      }
      }
    }
  }
}
</style>