<template>
  <div class="article" @click="checkArticle(article)">
    <div class="article-content">
      <div class="article-title">{{article.title}}</div>
      <div class="article-desc">{{article.ellipsis}}</div>
      <articleAction :article= article />
    </div>
    <div class="article-img" v-show="article.articleImg">
      <el-image fit="cover" class="article-img" :src = article.articleImg ></el-image>
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
  width: 100%;
  padding: 1.428571rem /* 20/14 */;
  background: #fff;
  box-sizing: border-box;
  border-width: 0;
  margin-bottom: .857143rem;
  box-shadow: 0 0 20px -5px rgba(158,158,158,.22);
  cursor: default;
  display: flex;
  align-items: center;
  .article-img {
    width: 10rem /* 140/14 */;
    height: 10rem /* 140/14 */;
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
    margin-right: 1.428571rem /* 20/14 */;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .article-title {
      @include twoLines();
      font-weight: bold;
      font-size: 1.428571rem /* 20/14 */;
      color: #2e3135;
      @media only screen and (max-width: 750px) { 
        font-size: 15px
      }
      &:hover {
        color: $primary;
        text-decoration: underline !important;
      }
    }
    .article-desc {
      margin: .714286rem /* 10/14 */ 0;
      line-height: 1.8;
      @include twoLines($clamp: 2);
      color: #5e646d;
    }
  }
}
</style>
