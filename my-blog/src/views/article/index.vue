<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <div class="article-author">
          <div class="userInfo">
            <el-avatar slot="reference" :size="48" :src='userInfo.avatar'></el-avatar>
            <div class="userInfo-desc">
              <div class="username" @click="checkAuthor(article.author)">{{article.author}}</div>
              <div class="create_time">
                <span>{{article.createtime}} </span>
                <span class="review">阅读 {{article.reviews}} </span>
                <span class="edit" v-show="nickname== article.author">
                  <router-link :to="{path: '/markdown', query:{articleId: article.article_id}}">编辑</router-link>
                </span>
              </div>
            </div>
          </div>
          <div :class="follows ? 'follow' : 'unfollow'" @click="follow(article.author)">{{follows ? '已关注' : '关注'}}</div>
        </div>
        <div class="article-img" v-show="article.articleImg">
          <el-image style="width: 652px; height: 367px" :src="article.articleImg" ></el-image>
        </div>
        <h1 class="article-title">{{article.title}}</h1>
        <div ref="wrapper" id="wrapper" class="article-content" v-html="article.content"></div>
        <comment />
      </div>
      <div class="asside">
        <achievement-card title= "关于作者" :userInfo= userInfo ></achievement-card>
        <catalog :article = article.content />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import comment from '@/components/comment/index.vue'
import catalog from '@/components/catalog/index.vue'
import achievementCard from '@/components/card/achievement/index.vue'
import authorList from '@/components/card/rankingCard/authorList/index.vue'
import { detailArticle } from '../../api/blog'
import { IUserInfo } from '../../api/types'
import { getUserInfo } from '../../api/user'
import { getfollow, getunfollow, getfollowList } from '../../api/follow'
import { UserModule } from '../../store/modules/user'
import { createComment } from '../../api/comments'
import { getreviewArticle } from '../../api/actions'
import { formatTime } from '../../utils/formatDate'

@Component({
  components: {
    Header,
    comment,
    catalog,
    achievementCard,
    authorList,
  }
})
export default class  extends Vue {
  private article: string = ''
  private userInfo: any = {}
  private follows: boolean = false
  get nickname() {
    return UserModule.nickname
  }
  private checkAuthor (author: string) {
    let result = {
      path: "/author",
      query: { author: author } 
    }
    let routeUrl = this.$router.resolve(result)
    window.open(routeUrl .href, '_blank')
  }

  // 关注
  private async follow(username: string) {
    this.follows = !this.follows
    if (this.follows) {
      await getfollow({username: username})
    } else {
      await getunfollow({username: username})
    }
  }
  private async getfollowList() {
    const { data } = await getfollowList()
    data.filter((item: any) => {
      if (item.follow_author == this.userInfo.nickname) {
        this.follows = true
      }
    })
  }
 
  private async created() {
    const articleId: string | (string | null)[] = this.$route.query.articleId
    await getreviewArticle({article_id: articleId })
    const { data } = await detailArticle({ id: articleId })
    data.createtime = formatTime(data.createtime)
    const toc: string[] | null = data.content.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g)
    if (toc) {
      toc.forEach((item: string, index: number) => {
        let _toc = `<div id='${index}'>${item} </div>`
        data.content = data.content.replace(item, _toc)
      })
    }
    this.article = data
    const _data = await getUserInfo({username: data.author})
    this.userInfo = _data.data
    this.getfollowList()
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  .main {
    position: relative;
    width: 984px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .article {
      padding: 30px 20px;
      margin: 0 auto;
      width: 698px;
      box-sizing: border-box;
      background: #fff !important;
      .article-author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
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
              .review {
                padding-left: 5px;
              }
              .edit {
                position: relative;
                &::before {
                  content: "·";
                  color: #b2bac2;
                  margin-right: 5px;
                }
              }
            }
          }
        }
        .unfollow {
          margin: 0 0 0 auto;
          padding: 0;
          width: 55px;
          height: 26px;
          font-size: 13px;
          border: 1px solid #6cbd45;
          color: #6cbd45;
          background-color: #fff;
          border-radius: 2px;
          line-height: 26px;
          text-align: center;
        }
        .follow {
          margin: 0 0 0 auto;
          padding: 0;
          width: 55px;
          height: 26px;
          font-size: 13px;
          text-align: center;
          border-radius: 2px;
          line-height: 26px;
          border: 1px solid #6cbd45;
          color: #fff;
          background-color: #6cbd45;
        }
      }
      .article-img {
        margin-top: 24px;
        text-align: center;
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
