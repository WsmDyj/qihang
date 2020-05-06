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
        <div class="article-wrapper">
          <div class="article-content">
            <div class="article-list" v-for="(article, index) in articles" :key="index">
              <articleCard :article= article />
            </div>
          </div>
          <div v-if="isEmpty" class="article-empty">
            <el-image fit='contain' class="article-empty" :src="require('../../assets/home/empty.png')"></el-image>
          </div>
          <div v-if="loading" element-loading-spinner="el-icon-loading" v-loading="loading" class="article-bottom__loading"></div>
          <div v-if="noMore" class="article-bottom">
            <div class="article-bottom__noMore">
              <el-divider>没有更多内容</el-divider>
            </div>
          </div>
        </div>
      </div>
      <div class="asside">
        <totalCard/>
        <sticky :z-index= 8 :sticky-top="70">
          <joinCard />
          <rewardCard />
          <rankingCard />
          <moreCard />
        </sticky>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import rankingCard from '@/components/card/rankingCard/index.vue'
import moreCard from '@/components/card/more/index.vue'
import joinCard from '@/components/card/join/index.vue'
import rewardCard from '@/components/card/advert/reward.vue'
import Sticky from '@/components/Sticky/index.vue'
import carousel from './components/carousel.vue'
import totalCard from './components/information.vue'
import articleCard from './components/articleCard.vue'
import { getArticles,getArticleTags } from '../../api/blog'
import { IArticleData, Itag } from '../../api/types'
import { fommentArticle } from '../../utils/formateArticle'

export interface Ifilters {
  page: number
  activeIndex: string
  articleTag: string
}

@Component({
  name:'home',
  components: {
    Header,
    carousel,
    articleCard,
    rankingCard,
    rewardCard,
    moreCard,
    totalCard,
    joinCard,
    Sticky,
  }
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private filters: Ifilters = { page: 0, activeIndex: '0', articleTag: '' }
  private visible: boolean = true
  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false
  private disabled: boolean = false
  private actions: Itag[] = [
    { laber: '0', value: '全部' },
    { value: 'Vue', laber: '1' },
    { value: 'React', laber: '2' },
    { value: 'JavaScript', laber: '3' },
    { value: 'CSS', laber: '4' },
    { value: 'Node', laber: '5' },
    { value: 'Flutter', laber: '6' },
    { value: 'Webpack', laber: '7' },
    { value: 'TypeScript', laber: '8' },
    { value: 'Http', laber: '9' },
    { value: 'Docker', laber: '10' },
    { value: '性能优化', laber: '11' },
    { value: '微信小程序', laber: '12' }
  ]

  private handleScroll(event: boolean) {
    this.visible = event
  }

  private async selectNav(tab: Itag) {
    this.articles = []
    this.loading = true
    this.noMore = false
    this.isEmpty = false
    this.filters.page = 0
    this.filters.articleTag = this.actions.filter(item => item.laber === this.filters.activeIndex)[0].value
    const { data } = await getArticles(this.filters)
    if (data.length > 0) {
      this.loading = false
      this.articles = fommentArticle(data)
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
      window.removeEventListener('scroll',this.lazyLoading)
    } else {
      window.addEventListener('scroll', this.lazyLoading) 
    }
  }

  private async lazyLoading () { // 滚动到底部，再加载的处理事件
    this.loading = true
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.documentElement.scrollHeight 
    if (scrollTop + clientHeight >= scrollHeight) { // 如果滚动到接近底部，自动加载下一页
      this.filters.page = this.filters.page + 1
      const { data } = await getArticles(this.filters)
      if (data.length >0) {
        this.loading = false
        this.articles = this.articles.concat(fommentArticle(data))
      } else {
        this.isEmpty = true
      }
      if (data.length < 10) {
        this.noMore = true
        this.loading = false
        window.removeEventListener('scroll',this.lazyLoading)
      }
    }
  }

  private async created() {
    this.loading = true
    const { data } = await getArticles(this.filters)
    if (data) {
      this.loading = false
      this.articles = fommentArticle(data)
    }
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
    width: 964px;
    margin-top: 80px;
    margin-bottom: 20px;
    position: relative;
    @include flexcenter($jc:space-between, $ai: none);
  }
}
.articles-nav {
  width: 700px;
  overflow-y: hidden;
  overflow-x:scroll;
}
.article-empty {
  padding-top: 30px;
  width: 700px;
  height: 300px;
}

.nav-top {
  width: 100vw;
  background: #ffffff;
  transform: translate3d(0,-60px,0);
  transition: transform .2s;
}
.el-loading-mask {
  background-color: transparent;
}
</style>
