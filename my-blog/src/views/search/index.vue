<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <div class="section">
        <div class="search-header">
          <div class="search-header__result">
            总共搜到<span class="search-keyword"> {{count}} </span>条结果
          </div>
          <div class="search-group">
            <tabs splitLine = true :tabs = tabs @click="selectNav" />
          </div>
        </div> 
        <div class="search-content">
          <van-skeleton title :row="1" :loading="loading">
            <div class="search-content__empty" v-if="visibal">
              <empty description="这里空空如也" />
            </div>
            <div v-else>
              <div class="search-content__author">
                <author-list :lists = lists />
              </div>
              <articleCard :articleList = articleList />
            </div>
          </van-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import tabs from '@/components/tabs/index.vue'
import articleList from '../author/components/likes.vue'
import authorList from '@/components/authorList/index.vue'
import { IArticleData, IFollow } from '../../api/types'
import articleCard from '@/components/article/index.vue'
import { getSearch } from '../../api/blog'
import { Qtag } from '../../global'
import { fommentArticle } from '../../utils/formateArticle'
import empty from '@/components/emptyBox/index.vue'

@Component({
  name:'home',
  components: {
    Header,
    articleList,
    authorList,
    tabs,
    articleCard,
    empty
  },
})

export default class extends Vue {
  private articleList: IArticleData[] = []
  private radio: string = '0'
  private lists: IFollow[] = []
  private count: number = 0
  private loading: Boolean = true 
  private visibal: Boolean = false 
  private tabs: Qtag[] = [
    { value: '全部', label: '0'},
    { value: '文章', label: '1'},
    { value: '作者', label: '2'},
  ]
  selectNav(event: Qtag) {
    this.radio = event.label
    if (event.label === '1') {
      this.visibal = this.articleList.length > 0 ? false : true
    }
    if (event.label === '0') {
      this.visibal = this.count > 0 ? false : true
    }
    if (event.label === '2') {
      this.visibal = this.lists.length > 0 ? false : true
    }
  }

  @Watch('$route')
  private async watchAuthor(val: any) {
    this.fetchData(this.$route.query.keyword)
  }

  changeColor (keyWords: any, resultsList: any) {
    resultsList.map((item: any, index: number) => {
      let replaceReg = new RegExp(keyWords, 'g')
      let replaceString = '<span class="search-keyword">' + keyWords + '</span>'
      if (item.nickname) {
        resultsList[index].nickname = item.nickname.replace(replaceReg, replaceString)
      }
      if (item.title) {
        resultsList[index].title = item.title.replace(replaceReg, replaceString)
      }
    })
  }

  private async fetchData(keyword: string | (string | null)[]) {
    const { data } = await getSearch({keyword: keyword})
    this.articleList = fommentArticle(data.articles)
    this.lists = data.users
    this.changeColor(keyword, data.articles)
    this.changeColor(keyword, data.users)
    this.count = data.articles.length + data.users.length
    this.loading = false
    this.visibal = data.articles.length + data.users.length > 0 ? false : true
  }

  private async created() {
    this.fetchData(this.$route.query.keyword)
  }
}
</script>

<style lang="scss" scoped>
.search-header {
  @include flexcenter($jc: space-between, $ai: center);
  height: 48px;
  background: #fff;
  padding-left: 2rem;
  color: $fontcolor;
  font-size: 15px;
  @media only screen and (max-width: 765px) { 
    padding: 0 1rem;
  }
   @media only screen and (max-width: 768px) and (min-width: 750px) { 
    padding: 0rem 1rem 0rem 2rem;
  }
}
.search-group {
  width: 12.99rem;
}
.search-content {
  width: 100%;
  background: #fff;
  @include flexcolumn($jc:center, $ai: none);
  min-height: 6rem;
  border-top: 1px solid $border-color;
  &__empty {
    border-top: 1px solid $border-color;
  }
  &__author {
    border-bottom: 1px solid $border-color;
  }
}
</style>
