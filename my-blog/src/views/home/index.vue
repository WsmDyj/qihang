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
          <div v-if="isEmpty" class="article-empty">
            <van-empty description="这里空空如也" />
          </div>
          <van-list v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad" >
            <div class="article-list" v-for="(article, index) in articles" :key="index">
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
    this.filters.articleTag = this.actions.filter(item => item.laber === this.filters.activeIndex)[0].value
    this.fetchData()
  }

  private async fetchData() {
    this.loading = true
    const { data } = await getArticles(this.filters)
    if (data.length > 0) {
      this.loading = false
      this.articles = this.articles.concat(fommentArticle(data))
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
    }
  }

  private created() {
    this.fetchData()
  }
}
</script>

<style lang="scss">
.container {
  @include flexcolumn($jc:center, $ai: center);
  .main {
    width: 68.857143rem /* 964/14 */;
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
  height: 200px;
}

.nav-top {
  width: 100vw;
  background: #ffffff;
  transform: translate3d(0,-60px,0);
  transition: transform .2s;
}
</style>
