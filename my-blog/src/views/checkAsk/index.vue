<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <div class="article section">
        <div class="article-container">
          <div class="article-header">
            <div class="article-header__info">
              <author-info :userInfo= ask.author>
                <div slot="content">
                  <span class="article-time">{{ask.createtime}} </span>
                  <span class="article-review">阅读 {{ ask.reviews }} </span>
                  <router-link v-if="nickname === ask.author.nickname" :to="{path: '/ask', query:{askId: ask.question_id}}">
                    <span class="article-edit">编辑</span>
                  </router-link>
                </div>
              </author-info>
            </div>
          </div>
          <div class="article-main">{{ ask.title }}</div>
          <div class="article-tags">
            <i class="iconfont">&#xe794;</i>
            <span class="article-tag" v-for="(tag, index) in ask.articleTag" :key="index">{{tag}}</span>
          </div>
          <div ref="article" v-highlight>
            <div class="article-content" v-html="ask.content"></div>
          </div>
        </div>
       
        <div class="article-comment mg-top-20" v-if="comments.length > 0">
          <div class="article-comment__title">
            <span @click="show = !show">
              <i class="el-icon-guide"></i>
              <span> {{comments.length}} 个回答 </span>
              <i :class="!show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            </span>
          </div>
          <el-collapse-transition>
            <div v-if="!show">
              <div class="article-comment__content" v-for="(comment, index) in comments" :key="index">
                <comment :show = visible :comment = comment @submit='getComment' />
              </div>
            </div>
          </el-collapse-transition>
        </div>

        <div class="article-comment mg-top-20">
          <div class="article-comment__title">
            <i class="el-icon-edit"></i>
            撰写答案 
          </div>
          <div class="article-comment__content">
            <commentForm @submit="submitComment" />
          </div>
        </div>
      </div>
      <div class="asside">
        <achievement-card title= "关于作者" :userInfo= ask.author ></achievement-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import { detailAsk } from '../../api/question'
import { UserModule } from '../../store/modules/user'
import achievementCard from '@/components/card/achievementCard/index.vue'
import authorInfo from '@/components/authorInfo/index.vue'
import { formatTime } from '../../utils/formatDate'
import { Iquestion, IComment } from '../../api/types'
import comment from './components/comment.vue'
import commentForm from './components/form.vue'
import GenNonDuplicateID from '../../utils/createId'
import { createComment, getComment, createReply } from '../../api/comments'
import articleAction from '../article/components/action.vue'
import { getreviewArticle } from '../../api/actions'

const defaultAsk = {
  question_id: '',
  author: {nickname: ''},
  title: '',
  content: '',
  createtime: '',
  likeCount: 0,
  comments: 0,
  reviews: 0,
  markdown: '',
  articleTag: [],
  status: 0,
}

@Component({
  components: {
    Header,
    achievementCard,
    authorInfo,
    comment,
    commentForm,
    articleAction,
  }
})
export default class extends Vue {
  private ask: Iquestion = defaultAsk
  private show: boolean = true
  private comments: IComment[] = []
  private loading: Boolean = true

  get nickname() {
    return UserModule.nickname
  }

  get visible() {
    return this.nickname == this.ask.author.nickname ? true : false
  }

  private async created() {
    const askId: string | (string | null)[] = this.$route.query.askId
    const { data } = await detailAsk({ask_id: askId})
    data.createtime = formatTime(data.createtime)
    this.ask = data
    this.getComment()
    await getreviewArticle({article_id: askId, type: 'ask' }) // 增加 访问次数
  }

  // 获取评论列表
  private async getComment() {
    const { data } = await getComment({ article_id: this.$route.query.askId })
    this.comments = data
  }

  
  private async submitComment(event: string) {
    const comment: any = {
      article_id: this.$route.query.askId,
      comment_conent: event,
      comment_id: GenNonDuplicateID(),
      type: 'question'
    }
    await createComment(comment)
    this.getComment()
  }

}
</script>

<style lang="scss" scoped>
.article-container {
  position: relative;
  background: #fff;
  cursor: default;
  padding: 2rem;
  @media only screen and (max-width: 767px) { 
    padding: 1rem;
  }
  .article-header {
    @include flexcenter($jc: space-between);
    margin-bottom: 10px;
    .article-time {
      letter-spacing: 1px;
      @include textRoundRight();
      font-size: 1.1rem;
      color: $fontcolor;
    }
    .article-edit {
      color: $primary;
      position: relative;
      @include textRound($color:'#409EFF');
    }
  }
  .article-main {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.5;
    margin: .67em 0 0 0;
    @media only screen and (max-width: 750px) { 
      font-size: 20px
    }
  }
  .article-tags {
    margin: 1.6rem 0;
    font-size: 1.2rem;
    .iconfont {
      color: $primary;
      padding: 2px 5px 0 5px;
    }
    .article-tag {
      color: $primary;
      @include textRoundRight($color: $primary);
      &:last-child::after {
        content: none;
      }
    }
  }
}
.article-comment {
  background: #fff;
  color: $primary;
  padding: 2rem 1.5rem;
  &__title {
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: bold;
  }
  &__content {
    border-bottom: 1px solid $border-color;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
