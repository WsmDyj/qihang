<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <h1 class="article-title">{{title}}</h1>
        <div ref="wrapper" id="wrapper" class="article-content" v-html="article"></div>
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

@Component({
  components: {
    Header,
  }
})
export default class  extends Vue {
  private article: string = ''
  private title : string = ''
  private async created() {
    const articleId: string | (string | null)[] = this.$route.query.articleId
    const { data } = await detailArticle({ id: articleId })
    this.article = data.content
    this.title = data.title
    
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
