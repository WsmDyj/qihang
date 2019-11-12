<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <article-list :articles = articles></article-list>
      </div>
      <div class="asside">
        <ranking-card></ranking-card>
        <about-card></about-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import articleList from '@/components/articleList/homeArticle/index.vue'
import rankingCard from '@/components/card/rankingCard/index.vue'
import aboutCard from '@/components/card/about/index.vue'
import { IArticleData } from '../../api/types'
import formatDate from '../../utils/formatDate'
import { ArticleModule } from '../../store/modules/article'
import { getArticles } from '../../api/blog'


@Component({
  name:'home',
  components: {
    Header,
    articleList,
    rankingCard,
    aboutCard
  },
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private result: number[] = []

  private async created() {
    await ArticleModule.getLikeLists()
    const { data } = await getArticles()
    this.articles = data
    this.getList()
  }

  private async getList() {
    ArticleModule.likeArticles.forEach((item: IArticleData) => {
      this.result.push(item.article_id)
    })
    this.articles.forEach((item: IArticleData) => {
      item.createtime = formatDate(item.createtime)
      Object.assign(item, {islike: false})
      if (this.result.indexOf(item.article_id) != -1) {
        item.islike = true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .main {
    position: relative;
    width: 932px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
