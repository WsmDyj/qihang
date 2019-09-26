<template>
  <div>
    <Header />
    <author-card></author-card>
    <author-article :articles= articles></author-article>
  </div>
</template>
<script>
import Header from '../components/header'
import authorCard from '../components/authorCard'
import authorArticle from '../components/articleCard/authorArticle'
import axios from 'axios'
export default {
  components: {
    Header,
    authorCard,
    authorArticle
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    axios.get('/api/blog/list?isadmin=1').then(res => {
      this.articles = res.data.data
      // console.log(res.data.data)
    })
  }
}
</script>
<style lang="scss" scoped>
</style>