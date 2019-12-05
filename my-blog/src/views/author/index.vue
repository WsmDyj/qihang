<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <author-card :userInfo = userInfo></author-card>
        <author-article :userInfo = userInfo :follows = follows :actions = actions ></author-article>
      </div>
      <div class="asside">
        <achievement-card :author= true title="个人成就" :userInfo = userInfo ></achievement-card>
        <followCard @checkFollows='checkFollows' :follows = follows />
        <div class="time">
          <span class="time-title">加入于</span>
          <span class="time-detail">{{userInfo.date}}</span>
        </div>
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
import { getfollowList } from '../../api/follow'
import { formatTime } from '../../utils/formatDate'

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
  private follows: [] = []
  private actions: object = {}

  private checkFollows(event:object) {
    this.actions = event
  }
  private async getInfo(params: any) {
    const { data } = await getUserInfo({username: params})
    data.date = formatTime(data.date)
    Object.assign(this.userInfo, data)
  }
  private async getFollow(params: any) {
    const { data } = await getfollowList({username: params})
    this.follows = data
  }
  private async created() {
    this.author = this.$route.query.author
    await this.getInfo(this.author)
    this.getFollow(this.author)
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
  .time {
    @include flexcenter($jc:space-between);
    position: fixed;
    width: 240px;
    top: 390px;
    padding: 15px 2px;
    color: #000;
    font-size: 15px;
    border-top: 1px solid rgba(230,230,231,.5);
    border-bottom: 1px solid rgba(230,230,231,.5);
  }
}
</style>
