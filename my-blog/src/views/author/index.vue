<template>
  <div class="container">
    <Header :visible = visible />
    <div class="main mg-top-80">
      <div class="section">
        <author-card :userInfo = userInfo />
        <div class="section-author mg-top-20">
          <div class="author-tabs">
            <div class="author-tabs__nav">
              <tabs :activeIndex = activeIndex :tabs = tabs @click="selectNav" />
            </div>
          </div>
          <articlesList v-if="activeIndex === '0'" />
          <like-list v-if="activeIndex === '1'" />
          <follow-list :follows = follows :actions = actions v-if="activeIndex === '2'" />
          <askList v-if="activeIndex === '3'" />
        </div>
      </div>
      <div class="asside">
        <sticky :z-index= 8 :sticky-top="80">
          <achievement-card :author= true title="个人成就" :userInfo = userInfo ></achievement-card>
          <followCard :follows = follows />
          <div class="join-time">
            <span>加入于</span>
            <span>{{userInfo.date}}</span>
          </div>
        </sticky>
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
import Sticky from '@/components/Sticky/index.vue'
import achievementCard from '@/components/card/achievementCard/index.vue'
import followCard from './components/followCard.vue'
import { IArticleData, IUserInfo, IFollow } from '../../api/types'
import { getArticles,delArticle } from '../../api/blog'
import { getUserInfo } from '../../api/user'
import { getfollowList } from '../../api/follow'
import { formatTime } from '../../utils/formatDate'
import { getlikesList } from '../../api/actions'
import { ArticleModule } from '../../store/modules/article'
import { Message, MessageBox } from 'element-ui'
import tabs from '@/components/tabs/index.vue'
import { TAG_LIST, Qtag } from '../../global'
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
const Tabs_LIST = [
  { value: "专栏", label: "0" },
  { value: "赞过的", label: "1" },
  { value: "关注", label: "2", icon: 'el-icon-caret-bottom' },
  { value: "问答", label: "3", icon: 'el-icon-caret-bottom' }
]

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
    Sticky,
    askList,
    tabs
  }
})

export default class extends Vue {
  private author: string | (string | null)[] = ''
  private userInfo: IUserInfo = defaultIUserInfo
  private follows: [] = []
  private visible: boolean = true
  private activeIndex: string | (string | null)[] = '0'
  private actions: object = {}
  private tabs: Qtag[] = Tabs_LIST

  private selectNav(tab: Qtag) {
    this.activeIndex = tab.label
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
  private handleScroll(event: boolean) {
    this.visible = event
  }
  private async created() {
    this.author = this.$route.query.author
    await this.getInfo(this.author)
    this.getFollow(this.author)
    this.activeIndex = this.$route.query.activeIndex || '0'
  }
}
</script>

<style lang="scss" scoped>
.section-author {
  width: 100%;
  background-color: #fff;
}
.author-tabs {
  border-bottom: 2px solid $border-color;
  width: 100%;
  font-weight: bold;
  &__nav {
    width: 300px;
    padding: 0 1.2rem;
    box-sizing: border-box;
    @media only screen and (max-width: 768px) { 
      padding: 0 20px 0 0;
      width: 100%;
    }
  }
}

.join-time {
  @include flexcenter($jc:space-between);
  margin-top: 4rem;
  width: 240px;
  padding: 1.5rem 0;
  color: #000;
  font-size: 1.25rem;
  border-bottom: 1px solid $border-article-color;
  border-top: 1px solid $border-article-color;
}
</style>
