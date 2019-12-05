<template>
  <div class="articles">
    <div v-if="articleList.length > 0">
      <div class="entry-list" v-for="(article, index) in articleList" :key="index">
        <router-link target="_blank" :to="{ path: '/article', query:{ articleId: article.article_id }}">
          <div class="userInfo-row">
            <article-title :isAvatar = userInfo.avatar :article= article></article-title>
          </div>
          <div class="article-img" v-show="article.articleImg">
            <el-image style="width: 608px; height: 212px" :src="article.articleImg" ></el-image>
          </div>
          <div class="abstract-row">
            <span class="title">{{ article.title }}</span>
            <span class="abstract" :style="{maxHeight: article.articleImg ? '22px' : '120px'}">{{ article.content}}</span>
          </div>
        </router-link>
        <div class="action-row">
          <div class="action-list">
            <article-action :article= article></article-action>
          </div>
          <div class="action-box">
            <span class="read-action">阅读 {{article.reviews}}</span>
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
    </div>
    <div v-else>
      <emptyBox />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { IArticleData, IUserInfo  } from '../../../../api/types'
import articleTitle from '../../../articleTitle/index.vue'
import articleAction from '../../homeArticle/components/action.vue'
import { UserModule } from '../../../../store/modules/user'
import emptyBox from '../../../emptyBox/index.vue'

@Component({
  components: {
    articleAction,
    articleTitle,
    emptyBox
  }
})
export default class extends Vue {
  @Prop() private articleList!: IArticleData[]
  @Prop() private userInfo!: IUserInfo
  private visible: boolean = false
  private articleId: number = 0

  get nickname() {
    return UserModule.nickname
  }
  
  // 删除或者编辑文章
  @Emit('action')
  private async handleCommand (command: string) {
    let action = {
      type: command,
      articleId: this.articleId
    }
    return action
  }

  private handleClick(article: IArticleData) {
    this.articleId = article.article_id
  }

  private created () {
    if (this.$route.query.author == this.nickname) {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.entry-list {
  background: #fff;
  padding: 30px;
  max-height: 460px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(230,230,231,.5);
  &:hover {
    background: #fcfcfc;
  }
  .userInfo-row {
    padding: 0 0 8px 0;
  }
  .abstract-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title {
      width: 100%;
      margin: 11px 0;
      font-size: 24px;
      color: #000;
      line-height: 1.3;
      font-weight: 600;
      word-break: break-word;
      word-wrap: break-word;
      letter-spacing: 0.56px;
    }
    .abstract {
      width: 100%;
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
</style>
