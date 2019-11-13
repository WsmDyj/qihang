<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <h1 class="article-title">{{article.title}}</h1>
        <div ref="wrapper" id="wrapper" class="article-content" v-html="article.content"></div>
        <comment />
      </div>
      <div class="asside">
        <!-- <achievement-card></achievement-card> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import { detailArticle } from '../../api/blog'
import { getUserInfo } from '../../api/user'
import comment from '@/components/comment/index.vue'
import { createComment } from '../../api/comments'

@Component({
  components: {
    Header,
    comment
  }
})
export default class  extends Vue {
  private article: string = ''

  private async created() {
    const articleId: string | (string | null)[] = this.$route.query.articleId
    const { data } = await detailArticle({ id: articleId })
    this.article = data
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    position: relative;
    width: 932px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .article {
      padding: 30px;
      width: 668px;
      cursor: pointer;
      background: #fff !important;
      .article-title {
        font-size: 30px;
        font-weight: 700;
        line-height: 1.5;
      }
    }
  }
}
</style>
