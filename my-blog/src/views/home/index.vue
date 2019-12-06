<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <article-list :articles = articles></article-list>
        <div v-if="divider">
          <el-divider>我也是有底线的</el-divider>
        </div>
      </div>
      <div class="asside">
        <about-card></about-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import articleList from '@/components/articleList/homeArticle/index.vue'
import aboutCard from '@/components/card/about/index.vue'
import { IArticleData } from '../../api/types'
import { Route } from 'vue-router'
import formatDate from '../../utils/formatDate'
import { ArticleModule } from '../../store/modules/article'
import { UserModule } from '../../store/modules/user'
import { getArticles } from '../../api/blog'


@Component({
  name:'home',
  components: {
    Header,
    articleList,
    aboutCard,
  },
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private page: number = 0
  private divider:boolean = false

  private async created() {
    const { data } = await getArticles()
    this.articles = data
    this.getList()
  }
  get likeArticlId() {
    return ArticleModule.likeArticlId
  }
  private async getList() {
    this.articles.forEach((item: IArticleData) => {
      Object.assign(item, {islike: false})
      if (this.likeArticlId.indexOf(item.article_id) != -1) {
        item.islike = true
      }
    })
  }
  private async lazyLoading () { // 滚动到底部，再加载的处理事件
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.documentElement.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) { // 如果滚动到接近底部，自动加载下一页
      const time = setTimeout(async ()=> {
        this.page = this.page + 1
        const { data } = await getArticles({page: this.page})
        this.articles = this.articles.concat(data)
        if (data.length < 10) {
          this.divider = true
          window.removeEventListener('scroll',this.lazyLoading)
        }
      }, 500)
    }
  }
  public mounted() {
    window.addEventListener('scroll', this.lazyLoading) // 滚动到底部，再加载的处理事件
  }

  public beforeDestroy() {
     window.removeEventListener('scroll',this.lazyLoading)
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .main {
    width: 932px;
    margin-top: 90px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
