<template>
  <div class="article-info">
    <div class="article-author">
      <div class="author-info" @click.stop="handleClick(article.author)">
        <span class="author-avatar">
          <el-avatar size="small" :src="article.avatar"></el-avatar>
        </span>
        <span class="author-name">{{article.author}}</span>
      </div>
      <i class="iconfont">&#xe794;</i>
      <span class="article-tag">{{article.articleTag}}</span>
    </div>
    <div class="article-action">
      <span class="action-item">
        <i class="iconfont">&#xe60d;</i>
        <span class="count">{{article.reviews}}</span>
      </span>
      <span class="action-item">
        <i class="iconfont">&#xe610;</i>
        <span class="count">{{article.comments}}</span>
      </span>
      <span class="action-item">
        <i class="iconfont" v-if="!article.islike">&#xe61b;</i>
        <i class="iconfont" v-else :style="{color: article.islike ? '#6cbd65' : '' }">&#xe60c;</i>
        <span class="count" :style="{color: article.islike ? '#6cbd65' : '' }">{{article.likeCount}}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData } from '../../../api/types'

@Component({
  components: {
  }
})

export default class extends Vue {
  @Prop() private article!: IArticleData

  private handleClick(author: string) {
    window.open(`/author?author=${author}`, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.article-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .article-author {
    font-size: 13px;
    display: flex;
    align-items: center;
    .author-info {
      padding-right: 10px;
      cursor: pointer;
      .author-avatar {
        display: inline-block;
        vertical-align: middle;
        padding-top: 5px;
      }
      .author-name {
        display: inline-block;
        vertical-align: middle;
        padding-left: 12px;
      }
      &:hover {
        color: $primary;
      }
    }
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
  .article-action {
    font-size: 14px;
    color: $fontcolor;
    display: flex;
    width: 160px;
    justify-content: space-between;
    .action-item {
      .iconfont {
        font-size: 14px;
        padding:0 2px;
      }
      .count {
        padding: 0 2px;
      }
    }
  }
}
</style>
