<template>
  <router-link class="article" target="_blank" :to="{path: '/article', query: { articleId: article.article_id }}">
    <div class="article-content">
      <div class="article-title">{{article.title}}</div>
      <div class="article-desc">{{article.ellipsis}}</div>
      <articleAction :article= article />
    </div>
    <div class="article-img mobile-none" v-show="article.articleImg">
      <el-image fit="cover" lazy class="article-img" :src = article.articleImg ></el-image>
    </div>
  </router-link>
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

}
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  padding: 1rem 2rem;
  background: #fff;
  box-sizing: border-box;
  margin-bottom: 10px;
  @include flexcenter($jc: none, $ai: center);
  &-img {
    width: 10rem;
    height: 10rem;
    border-radius: 3px;
    margin-left: 1rem;
    position: relative;
  }
  
  .article-content {
    flex: 1 1 auto;
    @include flexcolumn($jc:space-between, $ai: none);
    
    .article-desc {
      line-height: 1.5;
      margin: 0.5rem 0;
      font-size: 1.166667rem /* 14/12 */;
      @include twoLines($clamp: 2);
      color: $title-elps-color;
    }
  }
}
</style>
