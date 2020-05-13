<template>
  <div>
    <div class="list-empty" v-if="isEmpty" >
      <van-empty image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="遇见喜欢的就赞它" />
    </div>
    <van-list class="list-content" v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad"  v-else>
      <articleCard :articleList = likeList />
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData  } from '../../../api/types'
import { getlikesList } from '../../../api/actions'
import articleCard from '@/components/article/index.vue'
import { fommentArticle } from '../../../utils/formateArticle'
interface Irouter {
  path: string;
  query: {
      articleId: number;
  }
}
@Component({
  components: {
    articleCard
  }
})
export default class extends Vue {
  private likeList: IArticleData[] = []
  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false
  private page: number = 0

  private onLoad() {
    this.page = this.page + 1
    this.fetchData()
  }
  // 用户点赞的
  private async fetchData() {
    this.loading = true
    const { data } = await getlikesList({author: this.$route.query.author, page: this.page})
    if (data.length > 0) {
      this.loading = false
      this.likeList = this.likeList.concat(fommentArticle(data))
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
    }
  }
  created () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.entry {
  box-sizing: border-box;
  padding: 2rem;
  background: #fff;
  border-bottom: 1px solid $border-color;
  @include flexcenter($jc: space-between, $ai: center);
  &:hover {
    background: $hover-color;
  }
  &-img {
    height: 6rem;
    width: 6rem;
    border-radius: 2px;
  }
  &-content {
    &__title {
      margin: 1rem 0;
      font-size: 1.4rem;
      font-weight: 600;
      margin-top: .8rem;
      color: #2e3135;
      cursor: default;
      @include nowrap();
      &:hover {
        text-decoration: underline;
      }
      @media only screen and (max-width: 767px) { 
        font-size: 1.2rem;
      }
    }
  }
}
</style>

