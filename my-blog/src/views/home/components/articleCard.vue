<template>
  <div class="article" @click="checkArticle(article)">
    <div class="article-content">
      <div class="article-title">{{article.title}}</div>
      <div class="article-desc">{{article.content}}</div>
      <articleAction :article= article />
    </div>
     <div class="article-img" v-show="article.articleImg">
      <el-image fit="cover" style="border-radius: 3px;width: 140px; height: 130px" :src = article.articleImg ></el-image>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import articleAction from './articleAction.vue'
import { IArticleData } from '../../../api/types'

@Component({
  components: {
    articleAction
  }
})
export default class extends Vue {
  @Prop() private article!: IArticleData

  private checkArticle(article: IArticleData) {
    window.open(`/article?articleId=${article.article_id}`, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.article {
  width: 652px;
  padding: 12px 24px;
  background: #fff;
  border-width: 0;
  border-radius: 3px;
  margin-bottom: 18px;
  box-shadow: 0 0 20px -5px rgba(158,158,158,.22);
  transition: all .2s linear;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  cursor: default;
  display: flex;
  align-items: center;
  .article-img {
    width: 140px;
    height: 130px;
    border-radius: 3px;
    position: relative;
    &:hover:after{
      position:absolute;
      left: 0;
      top: 0;
      display: block;
      width:100%;
      height: 100%;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.2);
      content: attr(data-text);
    }
  }
  .article-content {
    margin-right: 20px;
    height: 158px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .article-title {
      @include twoLines();
      font-size: 20px;
      font-weight: 600;
      color: #2e3135;
      &:hover {
        color: $primary;
        text-decoration: underline !important;
      }
    }
    .article-desc {
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;//控制行数
      overflow:hidden;
    }
  }
}
</style>
