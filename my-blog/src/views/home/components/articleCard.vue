<template>
  <router-link class="article" target="_blank" :to="{path: '/article', query: { articleId: article.article_id }}">
    <div class="article-content">
      <div class="article-title">{{article.title}}</div>
      <div class="article-desc">{{article.ellipsis}}</div>
      <articleAction :article= article />
    </div>
    <div class="article-imgWrap mobile-none" v-if="article.articleImg">
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
  padding: 2rem 2rem;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid $border-color;
  @include flexcenter($jc: space-between, $ai: center);
  @media only screen and (max-width: 767px) { 
    padding: 1.5rem 1rem;
  }
  &:hover {
    background-color: $hover-color;
  }
  .article-imgWrap {
    width: 7.7rem;
    height: 6.7rem;
    box-sizing: border-box;
    margin-left: 2rem;
    background-color: #fff;
  }

  &-img {
    width: 7.7rem;
    height: 6.7rem;
    border-radius: 3px;
    position: relative;
  }
  
  .article-content {
    flex: 1;
    overflow: hidden;
    @include flexcolumn($jc:space-between, $ai: none);
    .article-desc {
      line-height: 1.5;
      margin: 0.5rem 0;
      font-size: 1.083333rem /* 13/12 */;
      @include twoLines($clamp: 2);
      color: $title-elps-color;
    }
  }
}
</style>
