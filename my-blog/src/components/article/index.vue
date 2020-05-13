<template>
  <div>
    <router-link target="_blank" :to="{ path: '/article', query:{ articleId: article.article_id }}" class="entry" v-for="(article, index) in articleList" :key="index">
      <div class="entry-content">
        <article-title :article= article />
        <div class="entry-content__title">{{ article.title }}</div>
        <div class="entry-content__action">
          <article-action :article= article />
        </div>
      </div>
      <div class="entry-img mobile-none" v-if="article.articleImg">
        <el-image class="entry-img" :src="article.articleImg" fit="cover" />
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import articleTitle from './articleTitle.vue'
import articleAction from './articleAction.vue'
import { IArticleData  } from '../../api/types'
@Component({
  components: {
    articleAction,
    articleTitle
  }
})

export default class extends Vue {
  @Prop() private articleList!: IArticleData[]
}
</script>

<style lang="scss" scoped>
.entry {
  box-sizing: border-box;
  padding: 1rem 2rem;
  background: #fff;
  border-bottom: 1px solid $border-color;
  @include flexcenter($jc: space-between, $ai: center);
  &:hover {
    background: $hover-color;
  }
  &-img {
    height: 6rem;
    width: 6rem;
    border-radius: 2px;
  }
  &-content {
    &__title {
      margin: 1rem 0;
      font-size: 1.4rem;
      font-weight: 600;
      margin-top: .8rem;
      color: #2e3135;
      cursor: default;
      @include nowrap();
      &:hover {
        text-decoration: underline;
      }
      @media only screen and (max-width: 767px) { 
        font-size: 1.2rem;
      }
    }
  }
}
</style>