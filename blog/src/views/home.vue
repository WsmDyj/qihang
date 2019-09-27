<template>
  <div class="home">
    <Header />
    <Navigation/>
    <div class="main">
      <div class="article">
        <article-card :articles = articles></article-card>
      </div>
      <div class="asside">
        <ranking-card></ranking-card>
        <about-card></about-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import getFormatDate from '../utils/formatDate'
import Header from '../components/header'
import articleCard from '../components/articleCard/homeArticle'
import rankingCard from '../components/card/rankingCard'
import Navigation from '../components/header/navigation'
import aboutCard from '../components/card/about'
export default {
  components: {
    Header,
    articleCard,
    rankingCard,
    Navigation,
    aboutCard
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      articles: [
        {
          title: '前端开发',
          content: '',
          createtime: '2019年9月9号',
          author: '邬嗣敏'
        }
      ]
    }
  },
  created() {
    axios.get('/api/blog/list').then(res => {
      res.data.data.forEach(item => {
        item.createtime = getFormatDate(item.createtime)
      });
      this.articles = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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