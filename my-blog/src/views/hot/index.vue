<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="books-list">
        <div class="books-item" v-for="(article, index) in articles" :key="index">
          <reader :article= article />
        </div>
      </div>
      <card />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import reader from './components/reader.vue'
import { getArticles } from '../../api/blog'
import { IArticleData, Itag } from '../../api/types'
import { fommentArticle } from '../../utils/formateArticle'
import card from './components/card.vue'

@Component({
  components: {
    Header,
    reader,
    card
  }
})
export default class extends Vue {
  private articles: IArticleData[] = []

  private async created() {
    const { data } = await getArticles()
    this.articles = fommentArticle(data)
    console.log(data)
  }
 
}
</script>

<style lang="scss" scoped>
.container {
  @include flexcolumn($jc:center, $ai: center);
  .main {
    @include flexcenter($jc:space-between, $ai: none);
    width: 932px;
    margin-top: 96px;
    margin-bottom: 20px;
    .books-list {
      @include flexcolumn($jc:none, $ai: none);
      width: 668px;
      background: #fff;
      min-height: 190px;
      box-shadow: 0 1px 3px 0 rgba(4,5,13,.23);
      .books-item {
        &:hover {
          background: #f7f9f9;
        }
      }
    }
  }
}
</style>
