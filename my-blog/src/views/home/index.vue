<template>
  <div class="container">
    <Header :visible= visible />
    <sticky @scroll="handleScroll" :fixed-top= -306 :z-index= 9 :sticky-top="60">
      <div class="navigation" :class="{'navigation-fixed': !visible}" >
        <tabs :tabs = actions @click="selectNav" />
      </div>
    </sticky>
    <div class="main mg-top-126">
      <div class="section">
        <div class="section-carousel">
          <carousel />
        </div>
        <div class="section-wrapper mg-top-20">
          <div v-if="isEmpty">
            <empty description="该类目下还没有文章" />
          </div>
          <van-list v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad" >
            <div class="section-list" v-for="(article, index) in articles" :key="index">
              <articleCard :article= article />
            </div>
          </van-list>
        </div>
      </div>
      <div class="asside">
        <information />
        <sticky :z-index= 8 :sticky-top="70">
          <rewardCard />
          <rankingCard />
          <website />
        </sticky>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import rankingCard from '@/components/card/rankingCard/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import carousel from './components/carousel.vue'
import information from './components/information.vue'
import articleCard from './components/articleCard.vue'
import rewardCard from './components/reward.vue'
import website from './components/website.vue'
import { getArticles, getArticleTags } from '../../api/blog'
import { IArticleData } from '../../api/types'
import { fommentArticle } from '../../utils/formateArticle'
import { TAG_LIST, Qtag } from '../../global'
import tabs from '@/components/tabs/index.vue'
import empty from '@/components/emptyBox/index.vue'
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
    website,
    information,
    Sticky,
    tabs,
    empty
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
  private actions: Qtag[] = TAG_LIST
  private handleScroll(event: boolean) {
    this.visible = event
  }
  private onLoad() {
    this.filters.page = this.filters.page + 1
    this.fetchData()
  }
  private async selectNav(tab: Qtag) {
    this.articles = []
    this.noMore = false
    this.isEmpty = false
    this.filters.page = 0
    this.filters.articleTag = tab.value
    this.fetchData()
  }
  private async fetchData() {
    this.loading = true
    const { data } = await getArticles(this.filters)
    if (data.length > 0) {
      this.articles = this.articles.concat(fommentArticle(data))
      this.loading = false
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
    }
  }
  private async created() {
    this.fetchData()
  }
}
</script>
<style lang="scss" scoped>
</style>


