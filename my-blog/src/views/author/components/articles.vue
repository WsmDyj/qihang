<template>
  <van-list>
    <div class="entry" v-for="(article, index) in articleList" :key="index">
      <router-link target="_blank" :to="{ path: '/article', query:{ articleId: article.article_id }}">
        <div class="entry-header">
          <article-title :isAvatar = userInfo.avatar :article= article />
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
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { IArticleData, IUserInfo  } from '../../../api/types'
import articleTitle from '@/components/article/articleTitle.vue'
import articleAction from '@/components/article/articleAction.vue'
import { UserModule } from '../../../store/modules/user'
import emptyBox from '@/components/emptyBox/index.vue'

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
  private loading: boolean = false
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
.entry {
  background: #fff;
  padding: 2rem;
  max-height: 460px;
  box-sizing: border-box;
  border-bottom: 1px solid $border-color;
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
