<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <div class="article-author">
          <div class="userInfo">
            <el-avatar slot="reference" :size="48" :src='userInfo.avatar'></el-avatar>
            <div class="userInfo-desc">
              <div class="username">{{article.author}}</div>
              <div class="create_time">{{article.createtime}}</div>
            </div>
          </div>
          <div class="check" @click="checkAuthor(article.author)">查看作者主页</div>
        </div>
        <h1 class="article-title">{{article.title}}</h1>
        <div ref="wrapper" id="wrapper" class="article-content" v-html="article.content"></div>
        <comment />
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
import { IUserInfo } from '../../api/types'
import { getUserInfo } from '../../api/user'
import comment from '@/components/comment/index.vue'
import { createComment } from '../../api/comments'
import { formatTime } from '../../utils/formatDate'

@Component({
  components: {
    Header,
    comment
  }
})
export default class  extends Vue {
  private article: string = ''
  private userInfo: any = {}
  private checkAuthor (author: string) {
    let result = {
      path: "/author",
      query: { author: author } 
    }
    let routeUrl = this.$router.resolve(result)
    window.open(routeUrl .href, '_blank')
  }
  private async created() {
    const articleId: string | (string | null)[] = this.$route.query.articleId
    const { data } = await detailArticle({ id: articleId })
    data.createtime = formatTime(data.createtime)
    this.article = data
    const _data = await getUserInfo({username: data.author})
    this.userInfo = _data.data
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
      .article-author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .userInfo {
          display: flex;
          .userInfo-desc {
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .username {
              font-size: 15px;
              font-weight: 700;
              color: #333;
            }
            .create_time {
              font-size: 13px;
              color: #909090;
              letter-spacing: 1px;
            }
          }
        }
        .check {
          margin: 0 0 0 auto;
          padding: 2px 5px;
          text-align: center;
          line-height: 26px;
          font-size: 13px;
          border: 1px solid #6cbd45;
          color: #6cbd45;
          background-color: #fff;
        }
      }
      .article-title {
        font-size: 30px;
        font-weight: 700;
        line-height: 1.5;
      }
    }
  }
}
</style>
