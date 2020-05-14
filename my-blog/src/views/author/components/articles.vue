<template>
  <div class="section-wrapper">
    <div class="list-empty" v-if="isEmpty" >
      <empty description="您还未发表过文章" />
    </div>
    <van-list class="list-content" v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad"  v-else>
      <div class="entry" v-for="(article, index) in articleList" :key="index">
        <router-link target="_blank" :to="{ path: '/article', query:{ articleId: article.article_id }}">
          <div class="entry-header">
            <article-title :isAvatar = article.avatar :article= article />
          </div>
          <div class="entry-img" v-if="article.articleImg">
            <el-image fit="cover" class="entry-img" :src="article.articleImg" ></el-image>
          </div>
          <div class="entry-title article-title">{{ article.title }}</div>
          <div class="entry-abstract" :style="{maxHeight: article.articleImg ? '22px' : '120px'}">{{ article.ellipsis}}</div>
        </router-link>
        <div class="entry-action">
          <article-action :article= article></article-action>
          <div class="entry-action__box">
            <span class="entry-action__viewers">阅读 {{article.reviews}}</span>
            <el-dropdown placement="top" v-show="visible" trigger="click" @click.native="handleClick(article)" @command="handleCommand">
              <span class="el-icon-more"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='edit'>编辑</el-dropdown-item>
                <el-dropdown-item command='delete'>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { IArticleData, IUserInfo  } from '../../../api/types'
import articleTitle from '@/components/article/articleTitle.vue'
import articleAction from '@/components/article/articleAction.vue'
import { UserModule } from '../../../store/modules/user'
import { getArticles,delArticle } from '../../../api/blog'
import { fommentArticle } from '../../../utils/formateArticle'
import empty from '@/components/emptyBox/index.vue'
@Component({
  components: {
    articleAction,
    articleTitle,
    empty
  }
})
export default class extends Vue {
  private articleList: IArticleData[] = []
  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false
  private articleId: number = 0
  private page: number = 0

  get nickname() {
    return UserModule.nickname
  }
  get visible() {
    return this.$route.query.author == this.nickname
  }

  private onLoad() {
    this.page = this.page + 1
    this.fetchData()
  }
  
  // 删除或者编辑文章
  private async handleCommand (command: string) {
    if (command === 'delete') {
      var r = confirm("确定删除吗？删除之后可能无法找回了")
      if (r){
        await delArticle({id: this.articleId})
        window.location.reload(true);
      }
    } else {
      this.$router.push({path: `/markdown?articleId=${this.articleId}`})
    }
  }

  private handleClick(article: IArticleData) {
    this.articleId = article.article_id
  }

  private async fetchData() {
    this.loading = true
    const { data } = await getArticles({author: this.$route.query.author, page: this.page})
    if (data.length > 0) {
      this.loading = false
      this.articleList = this.articleList.concat(fommentArticle(data))
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
    }
  }

  private created () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.entry {
  background: #fff;
  padding: 2rem;
  box-sizing: border-box;
  border-bottom: 1px solid $border-color;
  @media only screen and (max-width: 767px) { 
    padding: 2rem 1rem;
  }
  &:hover {
    background: $hover-color;
  }
  &-header {
    margin-bottom: 1rem;
  }
  &-title {
    margin: 1.5rem 0;
  }
  &-img {
    width: 100%;
    border-radius: 4px;
    height: 17rem;
    background-color: $placeholder-color;
  }
  &-abstract {
    line-height: 1.5;
    font-size: 1.166667rem /* 14/12 */;
    @include twoLines($clamp: 2);
    color: $title-elps-color;
  }
  &-action {
    @include flexcenter($jc: space-between, $ai: center);
    margin-top: 1rem;
    font-size: 1.166667rem /* 14/12 */;
    color: rgba(24,37,50,.3);
    &__viewers {
      margin-right: 2rem;
      &:hover {
        color: $text-color;
      }
    }
  }
}
</style>
