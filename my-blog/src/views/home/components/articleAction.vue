<template>
  <div class="article-info">
    <div class="article-author">
      <div class="author-info" @click.stop="handleClick(article.author)">
        <span class="author-avatar">
          <el-avatar size="small" :src="article.avatar"></el-avatar>
        </span>
        <span class="author-name">{{article.author}}</span>
      </div>
      <div class="tags">
        <i class="iconfont">&#xe794;</i>
        <span class="article-tag">{{article.articleTag}}</span>
      </div>
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
    vertical-align: middle;
    font-size: 1rem /* 13/14 */;
    flex: 1;
    width: 5.714286rem /* 80/14 */;
    display: flex;
    align-items: center;
    align-items: center;
    .author-info {
      padding-right: .714286rem /* 10/14 */;
      cursor: pointer;
      .author-avatar {
        display: inline-block;
        vertical-align: middle;
        padding-top: 5px;
        @media only screen and (max-width: 768px) { 
          transform: scale(.8);
        }
      }
      .author-name {
        display: inline-block;
        vertical-align: middle;
        padding-left: .857143rem /* 12/14 */;
      }
      &:hover {
        color: $primary;
      }
    }
    .tags {
      flex: 1;
      vertical-align: middle;
      @include nowrap();
      .iconfont {
        color: $primary;
        padding: 0 5px;
      }
      .article-tag {
        font-size: 1rem /* 14/14 */;
        color: $primary;
      }
    }
  }
  .article-action {
    font-size: 1rem /* 14/14 */;
    color: $fontcolor;
    display: flex;
    justify-content: space-between;
    .action-item {
      padding: 0 .714286rem /* 10/14 */;
      .iconfont {
        padding:0 2px;
      }
      .count {
        padding: 0 2px;
      }
    }
  }
}
</style>
