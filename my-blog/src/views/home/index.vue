<template>
  <div class="container">
    <Header :visible= visible />
    <div class="main">
      <div class="articles">
        <carousel />
        <sticky @scroll="handleScroll" :z-index= 9 className='articles-fixed' :sticky-top="60">
          <div :class="visible ? 'articles-nav': 'nav-top articles-nav'">
            <el-tabs @tab-click="selectNav" v-model="filters.activeIndex">
              <el-tab-pane v-for="(item, index) in actions" :key="index" :label="item.value" :name="item.laber">
              </el-tab-pane>
            </el-tabs>
          </div>
        </sticky>
        <div class="article-list" v-for="(article, index) in articles" :key="index">
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
import aboutCard from '@/components/card/aboutMe/index.vue'
import carousel from '@/components/carousel/index.vue'
import articleCard from '@/components/articleCard/index.vue'
import rankingCard from '@/components/card/rankingCard/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import { getArticles } from '../../api/blog'
import { IArticleData, Itag } from '../../api/types'
import { fommentArticle } from '../../utils/formateArticle'
import login from '../../components/login/index.vue'

const NavTag = [
  { value: '首页推荐', laber: '0' },
  { value: '最新发布', laber: '1' },
  { value: '上升最快', laber: '2' },
]

export interface Ifilters {
  page: number
  activeIndex: string
}

@Component({
  name:'home',
  components: {
    Header,
    carousel,
    articleCard,
    aboutCard,
    rankingCard,
    Sticky,
    login
  }
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private filters: Ifilters = { page: 0, activeIndex: '0' }
  private visible: boolean = true
  private actions: Itag[] = NavTag

  private handleScroll(event: boolean) {
    this.visible = event
  }

  private async selectNav(tab: Itag) {
    document.documentElement.scrollTop = 0
  }

  private async lazyLoading () { // 滚动到底部，再加载的处理事件
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.documentElement.scrollHeight 
    if (scrollTop + clientHeight >= scrollHeight) { // 如果滚动到接近底部，自动加载下一页
      const time = setTimeout(async ()=> {
        this.filters.page = this.filters.page + 1
        const { data } = await getArticles(this.filters)
        this.articles = this.articles.concat(fommentArticle(data))
        if (data.length < 10) {
          window.removeEventListener('scroll',this.lazyLoading)
        }
      }, 500)
    }
  }

  private async created() {
    const { data } = await getArticles()
    this.articles = fommentArticle(data)
  }

  public mounted() {
    window.addEventListener('scroll', this.lazyLoading) 
  }

  public beforeDestroy() {
    window.removeEventListener('scroll', this.lazyLoading)
  }
}
</script>

<style lang="scss">
.container {
  @include flexcolumn($jc:center, $ai: center);
  .main {
    width: 932px;
    margin-top: 80px;
    margin-bottom: 20px;
    position: relative;
    @include flexcenter($jc:space-between, $ai: none);
  }
}
.nav-top {
  transform: translate3d(0,-60px,0);
}
</style>
