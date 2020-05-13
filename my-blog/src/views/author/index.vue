<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <div class="section">
        <author-card :userInfo = userInfo />
        <div class="section-author mg-top-20">
          <el-tabs v-model="activeIndex">
            <el-tab-pane label="专栏" name="1">
              <articlesList />
            </el-tab-pane>
            <el-tab-pane label="赞过的" name="2">
              <like-list />
            </el-tab-pane>
            <el-tab-pane name="3">
              <span slot="label">关注<i class="el-icon-caret-bottom"></i></span>
              <follow-list :follows = follows :actions = actions />
            </el-tab-pane>
            <el-tab-pane name="4">
              <span slot="label">问答<i class="el-icon-caret-bottom"></i></span>
              <askList/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="asside">
        <achievement-card :author= true title="个人成就" :userInfo = userInfo ></achievement-card>
        <followCard @checkFollows='checkFollows' :follows = follows />
        <div class="join-time">
          <span>加入于</span>
          <span>{{userInfo.date}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import authorCard from './components/authorCard.vue'
import articlesList from './components/articles.vue'
import likeList from './components/likes.vue'
import followList from './components/follow.vue'
import askList from './components/ask.vue'
import achievementCard from '@/components/card/achievement/index.vue'
import followCard from '@/components/card/achievement/follow/index.vue'
import { IArticleData, IUserInfo, IFollow } from '../../api/types'
import { getArticles,delArticle } from '../../api/blog'
import { getUserInfo } from '../../api/user'
import { getfollowList } from '../../api/follow'
import { formatTime } from '../../utils/formatDate'
import { getlikesList } from '../../api/actions'
import { ArticleModule } from '../../store/modules/article'
import { Message, MessageBox } from 'element-ui'

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
    achievementCard,
    followCard,
    likeList,
    articlesList,
    followList,
    askList
  }
})

export default class extends Vue {
  private author: string | (string | null)[] = ''
  private userInfo: IUserInfo = defaultIUserInfo
  private follows: [] = []
  private activeIndex: string | (string | null)[] = '1'
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
    this.activeIndex = this.$route.query.activeIndex || '1'
  }
 
  @Watch('actions') 
  private actionsChange(val: {radio: number, label: string}) {
    this.activeIndex = val.label
  }
}
</script>

<style lang="scss" scoped>
.section-author {
  width: 100%;
  cursor: pointer;
}
.join-time {
  @include flexcenter($jc:space-between);
  position: fixed;
  width: 240px;
  top: 390px;
  padding: 1.5rem 0;
  color: #000;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-article-color;
  border-top: 1px solid $border-article-color;
}
</style>
