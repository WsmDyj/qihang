<template>
  <div class="action-list">
    <div class="clickable likeBtn" @click.stop="getLike(article)">
      <i class="iconfont" :style="{color: active ? '#6cbd65' : '' }">&#xe60c;</i>
      <span class="count" :style="{color: active ? '#6cbd65' : '' }">{{ likes }}</span>
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
import { getlikeArticle, removelike } from '../../api/actions'

@Component
export default class extends Vue {
  @Prop() private article!: IArticleData
  private active: boolean = false
  private likes: number = 0
  
  private async getLike(article: IArticleData) {
    if (!this.active) {
      await getlikeArticle({article_id: article.article_id})
      this.likes = this.likes + 1
      this.active = true 
    } else {
      await removelike({article_id: article.article_id})
      this.likes = this.likes - 1
      this.active = false
    }
  }
  created() {
    this.active = this.article.islike || false
    this.likes = this.article.likeCount
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
    &:last-child {
      border-left: none;
    }
  }
  .count {
    padding-left: 5px;
  }
}
</style>
