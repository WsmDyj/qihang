<template>
  <div class="article">
    <div class="sub-header">
      <div class="sub-header-title">我的专栏</div>
      <div class="sub-type-box">
        <span class="sub-type">热门</span>
        <span class="sub-type action">最新</span>
      </div>
    </div>
    <div class="entry-list" v-for="(article, index) in articles" :key="index">
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
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import articleTitle from '../../articleTitle/index.vue'
import articleAction from '../../articleAction/index.vue'
import { IArticleData } from '../../../api/types'
import { delArticle, getArticles } from '../../../api/blog'
import { Message, MessageBox } from 'element-ui'
import formatDate from '../../../utils/formatDate'

@Component({
  name: 'authorArticle',
  components: {
    articleTitle,
    articleAction
  },
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private articleId: number = 0

  public checkArticle(article: IArticleData) {
    this.$router.push({path: `/article?articleId=${article.id}`})
  }

  private async getList() {
    const { data } = await getArticles({isadmin: '1'})
    data.forEach((item: IArticleData) => {
      item.content = item.content.replace(/<\/?.+?\/?>/g,'')
      item.createtime = formatDate(item.createtime)
    })
    this.articles = data
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
    this.articleId = article.id
  }
  private created () {
    this.getList()
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 30px;
    color: #000;
    white-space: nowrap;
    border-bottom: 1px solid rgba(230,230,231,.5);
    .sub-header-title {
      font-size: 16px;
      font-weight: 700;
    }
    .sub-type-box {
      color: #72777b;
      .sub-type:first-child {
        position: relative;
        margin-right: 20px;
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -14px;
          margin-top: -7px;
          width: 1px;
          height: 14px;
          background-color: #b2bac2;
          opacity: .5;
        }
      }
      .action {
        color: #000;
      }
    }
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
      padding: 4px 0 18px;
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