<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <author-card></author-card>
        <author-article></author-article>
      </div>
      <div class="asside">
        <achievement-card></achievement-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import authorCard from '@/components/authorCard/index.vue'
import authorArticle from '@/components/articleList/authorArticle/index.vue'
import { IArticleData } from '../../api/types'
import { getArticles } from '../../api/blog'
import achievementCard from '@/components/card/achievement/index.vue'

@Component({
  name: 'author',
  components: {
    Header,
    authorCard,
    authorArticle,
    achievementCard
  }
})

export default class extends Vue {
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
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
