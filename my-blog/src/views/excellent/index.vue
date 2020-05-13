<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <div class="section">
        <van-list class="list-content" v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad">
          <articleCard :articleList = list />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import likeList from '../author/components/likes.vue'
import { IArticleData  } from '../../api/types'
import Header from '@/components/header/index.vue'
import articleCard from '@/components/article/index.vue'
import { getArticles } from '../../api/blog'
import { fommentArticle } from '../../utils/formateArticle'

@Component({
  name:'excellent',
  components: {
    Header,
    likeList,
    articleCard
  }
})
export default class extends Vue {
  private list: IArticleData[] = []
   private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false

  onLoad() {
    console.log('翻页')
  }
  private async created() {
    this.loading = true
    const { data } = await getArticles()
    if (data.length > 0) {
      this.loading = false
      this.list = this.list.concat(fommentArticle(data))
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
    }
  }
}
</script>