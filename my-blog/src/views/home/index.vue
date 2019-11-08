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
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import articleList from '@/components/articleList/homeArticle/index.vue'
import rankingCard from '@/components/card/rankingCard/index.vue'
import aboutCard from '@/components/card/about/index.vue'
import { IArticleData } from '../../api/types'
import formatDate from '../../utils/formatDate'
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

  created() {
    this.getList()
  }

  private async getList() {
    const { data } = await getArticles()
    data.forEach((item: IArticleData) => {
      item.createtime = formatDate(item.createtime)
    })
    this.articles = data
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
