<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <author-card :userInfo = userInfo></author-card>
        <author-article :userInfo = userInfo></author-article>
      </div>
      <div class="asside">
        <achievement-card :author= true title="个人成就" :userInfo = userInfo ></achievement-card>
        <followCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import authorCard from '@/components/authorCard/index.vue'
import authorArticle from '@/components/articleList/authorArticle/index.vue'
import achievementCard from '@/components/card/achievement/index.vue'
import followCard from '@/components/card/achievement/follow/index.vue'
import { IArticleData, IUserInfo } from '../../api/types'
import { getArticles } from '../../api/blog'
import { getUserInfo } from '../../api/user'

const defaultIUserInfo = {
  avatar: '',
  autograph: '',
  company: '',
  job: '',
  nickname: '',
  likes: 0,
  comments: 0,
  reviews: 0
}
@Component({
  name: 'author',
  components: {
    Header,
    authorCard,
    authorArticle,
    achievementCard,
    followCard
  }
})

export default class extends Vue {
  private author: string | (string | null)[] = ''
  private userInfo: IUserInfo = defaultIUserInfo
  
  private async loading(params: any) {
    const { data } = await getUserInfo({username: params})
    Object.assign(this.userInfo, data)
  }
  private async created() {
    this.author = this.$route.query.author
    this.loading(this.author)
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  .main {
    position: relative;
    width: 932px;
    margin-top: 90px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
