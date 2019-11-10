<template>
  <div class="action-list">
    <div class="clickable likeBtn" @click.stop="getLike(article)">
      <i class="iconfont" :style="{color: active ? '#6cbd65' : '' }">&#xe60c;</i>
      <span class="count" :style="{color: active ? '#6cbd65' : '' }">{{ article.likeCount}}</span>
    </div>
    <div class="clickable commentBtn">
      <i class="el-icon-s-comment"></i>
      <span class="count">12</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { IArticleData } from '../../api/types'
import { getlikeArticle } from '../../api/actions'
import { ArticleModule } from '../../store/modules/article'
@Component
export default class extends Vue {
  @Prop() private article!: IArticleData
  get active() {
    if (this.article.islike) {
      return true
    }
  }
  private async getLike(article: IArticleData) {
    await getlikeArticle({article_id: article.article_id})
    await ArticleModule.getLikeLists()
    // if (this.islike) {
    //   console.log('hello')
    // } else {
    //   this.islike = true
    //   await getlikeArticle({article_id: article.article_id})
    // }
  }
}
</script>
<style lang="scss" scoped>
.action-list {
  font-size: 14px;
  display: flex;
  align-items: center;
  .clickable {
    width: 60px;
    border-radius: 1px;
    text-align: center;
    line-height: 24px;
    border: 1px solid #edeeef;
    white-space: nowrap;
    height: 24px;
    &:hover {
      background: #edeeef;
    }
  }
  .count {
    padding-left: 5px;
  }
}
</style>
