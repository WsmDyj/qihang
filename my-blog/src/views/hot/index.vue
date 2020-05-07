<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="books-list">
        <articleLoading :loading="articles.length < 1 ? true : false"/>
        <div class="books-item" v-for="(article, index) in articles" :key="index">
          <reader :article= article />
        </div>
      </div>
      <div class="asside">
        <card />
      </div>
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
import articleLoading from '../../components/loading/articleLoading.vue'

@Component({
  components: {
    Header,
    reader,
    card,
    articleLoading
  }
})
export default class extends Vue {
  private articles: IArticleData[] = []

  private async created() {
    const { data } = await getArticles()
    this.articles = fommentArticle(data)
  }
 
}
</script>

<style lang="scss" scoped>
.container {
  @include flexcolumn($jc:center, $ai: center);
  .main {
    width: 964px;
    margin-top: 80px;
    margin-bottom: 30px;
    position: relative;
    @include flexcenter($jc:space-between, $ai: none);
    .books-list {
      align-self: flex-start;
      width: 700px;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(4,5,13,.23);
      .books-item {
        border-bottom: 1px solid #e6e8e8;
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          background: #f7f9f9;
        }
      }
    }
  }
}
</style>
