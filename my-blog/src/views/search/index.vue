<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <div class="section">
        <div class="search-header">
          <div class="search-header__result">
            <div v-if="count > 0">
              总共搜到<span class="search-count"> {{count}} </span>条结果
            </div>
            <div v-else>抱歉！暂无搜索结果</div>
          </div>
          <div class="search-group">
            <tabs :tabs = tabs @click="selectNav" />
          </div>
        </div> 
        <div class="search-article" v-if="radio === '0'" >
          <div class="list-empty" v-if="articleList.length <= 0">
            <van-empty image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="这里空空如也" />
          </div>
          <van-list v-else>
            <articleCard :articleList = articleList />
          </van-list>
        </div>
        <div class="search-users" v-if="radio == '1'">
          <div class="list-empty" v-if="lists.length <= 0">
            <van-empty image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="这里空空如也" />
          </div>
          <van-list v-else>
            <author-list :lists = lists></author-list>
          </van-list>
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

@Component({
  name:'home',
  components: {
    Header,
    articleList,
    authorList,
    tabs,
    articleCard
  },
})

export default class extends Vue {
  private articleList: IArticleData[] = []
  private keyword: string | (string | null)[] = ''
  private radio: string = '0'
  private lists: IFollow[] = []
  private count: number = 0
  private tabs: Qtag[] = [
    { value: '文章', label: '0'},
    { value: '作者', label: '1'},
  ]
  selectNav(event: Qtag) {
    this.radio = event.label
  }
  private async created() {
    this.keyword = this.$route.query.keyword
    const { data } = await getSearch({keyword: this.keyword})
    this.articleList = fommentArticle(data.articles)
    this.lists = data.users
    this.count = data.articles.length + data.users.length
  }
}
</script>

<style lang="scss" scoped>
.search-header {
  @include flexcenter($jc: space-between, $ai: center);
  height: 48px;
  background: #fff;
  padding-left: 2rem;
  padding-right: 1rem;
  color: $fontcolor;
  border-bottom: 1px solid $border-color;
  &__result {
    font-size: 13px;
  }
  .search-count {
    color: #e8001c;
    font-size: 1.333333rem;
    font-weight: bold;
  }
}
</style>
