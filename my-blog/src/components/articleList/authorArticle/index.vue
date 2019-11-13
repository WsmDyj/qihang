<template>
  <div class="article">
    <div class="sub-header">
      <el-menu :default-active="activeIndex" class="sub-header" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">专栏 ({{articles.length}})</el-menu-item>
        <el-menu-item index="2">赞过的 ({{likeArticlId.length}})</el-menu-item>
      </el-menu>
    </div>
    <div class="" v-if="activeIndex == '1'">
      <div class="entry-list"  v-for="(article, index) in articles" :key="index">
        <div class="row userInfo-row">
          <article-title :isAvatar = true :article= article></article-title>
        </div>
        <div class="row abstract-row" @click="checkArticle(article)">
          <span class="title">{{ article.title }}</span>
          <span class="abstract">{{ article.content}}</span>
        </div>
        <div class="row action-row">
          <div class="action-list">
            <article-action :article= article></article-action>
          </div>
          <div class="action-box">
            <span class="read-action" @click="checkArticle(article)">阅读全文</span>
            <el-dropdown placement="top" trigger="click" @click.native="handleClick(article)" @command="handleCommand">
              <span class="el-icon-more"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='edit'>编辑</el-dropdown-item>
                <el-dropdown-item command='delete'>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
   
    <article-list v-else :articles = likeLists></article-list>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import articleTitle from '../../articleTitle/index.vue'
import articleAction from '../../articleAction/index.vue'
import { IArticleData } from '../../../api/types'
import { delArticle, getArticles } from '../../../api/blog'
import { Message, MessageBox } from 'element-ui'
import formatDate from '../../../utils/formatDate'
import { ArticleModule } from '../../../store/modules/article'
import articleList from '../homeArticle/index.vue'

interface routerQuery {
  path: string
  query: any
}
@Component({
  name: 'authorArticle',
  components: {
    articleTitle,
    articleAction,
    articleList
  },
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private likeLists: IArticleData[] =[]
  private articleId: number = 0
  private activeIndex: string | (string | null)[] = '1'
  
  public checkArticle(article: IArticleData) {
    let result:routerQuery = {
      path: "/article",
      query: { articleId: article.article_id } 
     }
    let routeUrl = this.$router.resolve(result)
     window.open(routeUrl .href, '_blank');
  }
  get likeArticles() {
    return ArticleModule.likeArticles
  }
  get likeArticlId() {
    return ArticleModule.likeArticlId
  }
  private async getList() {
    const { data } = await getArticles({isadmin: '1'})
    this.fommentArticle(data)
    this.articles = data
  }
  // 文章去除标签
  private fommentArticle(data: IArticleData[]) {
    data.forEach((item: IArticleData) => {
      item.content = item.content.replace(/<\/?.+?\/?>/g,'')
      if (this.likeArticlId.indexOf(item.article_id) != -1) {
        item.islike = true
      }
    })
  }
 
  private async handleSelect(key: any) {
    if (key === '2') {
      this.activeIndex = '2'
      this.likeLists = this.likeArticles
    } else {
      this.activeIndex = '1'
    }
  }
  private async handleCommand(command: string) {
    if (command === 'delete') {
      MessageBox.confirm(
        '您确定删除这篇博客吗？删除之后可能无法找回了',
        '确定删除',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        await delArticle({id: this.articleId})
        this.getList()
        Message({
          message: '博客删除成功',
          type: 'success',
          duration: 5 * 1000
        })
      })
      
    } else {
      this.$router.push({path: `/markdown?articleId=${this.articleId}`})
    }
  }
  private handleClick(article: IArticleData) {
    this.articleId = article.article_id
  }
  private created () {
    this.getList()
    this.handleSelect(this.$route.query.activeIndex)
    this.activeIndex = this.$route.query.activeIndex
  }
}
</script>
<style lang="scss" scoped>
.article {
  margin: 20px  auto 0 auto;
  width: 668px;
  cursor: pointer;
  background: #fff;
  .sub-header {
    height: 50px;
    border-bottom: 1px solid rgba(230,230,231,.5);
  }
  .entry-list {
    width: 100%;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(230,230,231,.5);
    &:hover {
      background: #fcfcfc;
    }
    .userInfo-row {
      padding: 4px 0 10px 4px;
    }
    .abstract-row {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .title {
        width: 100%;
        margin-bottom: 11px;
        font-size: 28px;
        color: #000;
        line-height: 1.3;
        font-weight: 600;
        word-break: break-word;
        word-wrap: break-word;
        letter-spacing: 0.56px;
      }
      .abstract {
        width: 100%;
        max-height: 120px;
        line-height: 1.6;
        letter-spacing: 0.28;
        color: #8b8b8b;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        font-size: 17px;
      }
    }
    .action-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 21px;
      font-size: 14px;
      color: rgba(24,37,50,.3);
      .read-action {
        margin-right: 20px;
        &:hover {
        color: #000;
      }
      }
    }
  }
}
</style>