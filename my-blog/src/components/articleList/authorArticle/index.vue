<template>
  <div class="author">
    <el-tabs v-model="activeIndex">
      <el-tab-pane :label="`专栏 (${articleList.length})`" name="1">
        <articlesList @action='actionArticle' :articleList = articleList :userInfo = userInfo />
      </el-tab-pane>
      <el-tab-pane :label="`赞过的 (${likeList.length})`" name="2">
        <like-list :likeList = likeList />
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">更多 <i class="el-icon-caret-bottom"></i></span>
        <follow-list :follows = follows :actions = actions />
      </el-tab-pane>
      <el-tab-pane name="4">
        <span slot="label">问答 <i class="el-icon-caret-bottom"></i></span>
        <askList/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { IUserInfo, IArticleData, IFollow } from '../../../api/types'
import { delArticle, getArticles } from '../../../api/blog'
import { getlikesList } from '../../../api/actions'
import { ArticleModule } from '../../../store/modules/article'
import { Message, MessageBox } from 'element-ui'
import articlesList from './components/articles.vue'
import likeList from './components/likes.vue'
import followList from './components/follow.vue'
import askList from './components/ask.vue'

@Component({
  name: 'authorArticle',
  components: {
    likeList,
    articlesList,
    followList,
    askList
  },
})

export default class extends Vue {
  @Prop() private userInfo!: IUserInfo
  @Prop() private follows!: IFollow[]
  @Prop() private actions!: object
  private activeIndex: string | (string | null)[] = '1'

  private articleList: IArticleData[] = []
  private likeList: IArticleData[] =[]
  @Watch('actions') 
  private actionsChange(val: {radio: number, label: string}) {
    this.activeIndex = val.label
  }

   // 自己点赞过的文章
  get likeArticlId() {
    return ArticleModule.likeArticlId
  }
  
  // 文章去除标签
  private fommentArticle(data: IArticleData[]) {
    data.forEach((item: IArticleData) => {
      item.content = item.content.replace(/<[^>]+>/g, '')
      if (this.likeArticlId.indexOf(item.article_id) != -1) {
        item.islike = true
      }
    })
  }
  // 用户写的文章
  private async getList() {
    const { data } = await getArticles({author: this.$route.query.author})
    this.fommentArticle(data)
    this.articleList = data
  }
  // 用户点赞的
  private async getLikeArticles() {
    const { data } = await getlikesList({author: this.$route.query.author})
    this.fommentArticle(data)
    this.likeList = data
  }
  // 删除文章
  private actionArticle(event: {type: string, articleId: number}) {
    if (event.type === 'delete') {
      MessageBox.confirm(
        '您确定删除这篇博客吗？删除之后可能无法找回了',
        '确定删除',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        await delArticle({id: event.articleId})
        this.getList()
        Message({
          message: '博客删除成功',
          type: 'success',
          duration: 5 * 1000
        })
      })
    } else {
      this.$router.push({path: `/markdown?articleId=${event.articleId}`})
    }
  }
  private created() {
    this.getList()
    this.getLikeArticles()
    this.activeIndex = this.$route.query.activeIndex || '1'
  }
}
</script>
<style lang="scss" scoped>
.author {
  margin: 20px  auto 0 auto;
  width: 668px;
  cursor: pointer;
  background: #fff;
}
</style>