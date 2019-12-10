<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <!-- <article-list :articles = articles></article-list> -->
        <carousel />
        <div class="home-option">
          <el-tabs v-model="activeIndex">
            <el-tab-pane v-for="(item, index) in actions" :key="index" :label="item.value" :name="item.laber">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-for="(article, index) in articles" :key="index">
          <articleCard :article= article />
        </div>
      </div>
      <div class="asside">
        <about-card></about-card>
        <rankingCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
// import articleList from '@/components/articleList/homeArticle/index.vue'
import aboutCard from '@/components/card/aboutMe/index.vue'
import { IArticleData } from '../../api/types'
import { Route } from 'vue-router'
import formatDate from '../../utils/formatDate'
import { ArticleModule } from '../../store/modules/article'
import { UserModule } from '../../store/modules/user'
import { getArticles } from '../../api/blog'
import carousel from '../../components/carousel/index.vue'
import articleCard from '../../components/articleCard/index.vue'
import rankingCard from '../../components/card/rankingCard/index.vue'

@Component({
  name:'home',
  components: {
    Header,
    // articleList,
    aboutCard,
    carousel,
    articleCard,
    rankingCard
  },
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private page: number = 0
  private activeIndex: string = '0'
  private actions: any[] = [
    { value: '首页推荐', laber: '0' },
    { value: '最新发布', laber: '1' },
    { value: '上升最快', laber: '2' },
  ]

  // 文章去除标签
  private fommentArticle(data: IArticleData[]) {
    data.forEach((item: IArticleData) => {
      item.content = item.content.replace(/<[^>]+>/g, '')
      if (this.likeArticlId.indexOf(item.article_id) != -1) {
        item.islike = true
      }
    })
  }

  private async created() {
    const { data } = await getArticles()
    this.fommentArticle(data)
    this.articles = data
    console.log(data)
  }
  get likeArticlId() {
    return ArticleModule.likeArticlId
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
          window.removeEventListener('scroll',this.lazyLoading)
        }
      }, 500)
    }
  }
  public mounted() {
    // window.addEventListener('scroll', this.lazyLoading) 
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
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .home-option {
      background: #f4f5f5;
      margin: 15px 0;
    }
  }
}
</style>
