<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <author-card></author-card>
        <author-article :articles= articles></author-article>
      </div>
      <div class="asside">
        <achievement-card></achievement-card>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../components/header'
import authorCard from '../components/authorCard'
import authorArticle from '../components/articleCard/authorArticle'
import achievementCard from '../components/card/achievement'
import getFormatDate from '../utils/formatDate'
import axios from 'axios'
export default {
  components: {
    Header,
    authorCard,
    authorArticle,
    achievementCard
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    axios.get('/api/blog/list?isadmin=1').then(res => {
      res.data.data.forEach(item => {
        item.createtime = getFormatDate(item.createtime)
      });
      this.articles = res.data.data
    })
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
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>