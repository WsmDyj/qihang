<template>
  <div class="container">
    <Header />
    <div class="main">
      <articleLoading :loading='list.length > 0 ? false : true'  />
      <like-list :articles = list />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import likeList from '@/components/articleList/homeArticle/index.vue'
import { IArticleData  } from '../../api/types'
import Header from '@/components/header/index.vue'
import articleLoading from '@/components/loading/articleLoading.vue'
import { getArticles } from '../../api/blog'

@Component({
  name:'excellent',
  components: {
    Header,
    likeList,
    articleLoading
  }
})
export default class extends Vue {
  private list: IArticleData[] = []
  private async created() {
    const { data } = await getArticles()
    this.list = data
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include flexcolumn($jc:center, $ai: center);
  .main {
    width: 932px;
    margin-top: 60px;
    margin-bottom: 20px;
    position: relative;
  }
}
</style>
