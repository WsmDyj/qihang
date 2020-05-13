<template>
  <div class="article-footer">
    <div class="footer-content">
      <div class="footer-content__author" @click.stop="handleClick(article.author)">
        <el-avatar size="small" :src="article.avatar"></el-avatar>
      </div>
      <div class="footer-item">
        <span class="author-name">{{article.author}}</span>
      </div>
      <div class="footer-content__tags footer-item">
        <i class="iconfont">&#xe794;</i>
        <span>{{article.articleTag}}</span>
      </div>
    </div>
    <div class="footer-action">
      <span class="footer-action__item mobile-none">
        <i class="iconfont">&#xe60d;</i>
        <span>{{article.reviews}}</span>
      </span>
      <span class="footer-action__item">
        <i class="iconfont">&#xe610;</i>
        <span>{{article.comments}}</span>
      </span>
      <span class="footer-action__item">
        <i class="iconfont" v-if="!article.islike">&#xe61b;</i>
        <i class="iconfont" v-else :style="{color: article.islike ? '#6cbd65' : '' }">&#xe60c;</i>
        <span :style="{color: article.islike ? '#6cbd65' : '' }">{{article.likeCount}}</span>
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
.article-footer {
  width: 100%;
  overflow: hidden;
  @include flexcenter($jc: space-between, $ai: center);
  margin-top: 4px;
}
.footer-item {
  font-size: 1.083333rem /* 13/12 */;
  padding-left: 10px;
  box-sizing: border-box;
}
.footer-content {
  flex: 1;
  display: flex;
  align-items: center;
  
  &__author {
    cursor: pointer;
    .author-name {
      padding-left: 1rem;
      color: $title-name-color;
    }
    &:hover {
      color: $primary;
    }
  }

  &__tags {
    flex: 1;
    @include nowrap();
    color: $primary;
    .iconfont {
      color: $primary;
      padding-right: 5px;
    }
  }
}
.footer-action {
  font-size: 1.083333rem /* 13/12 */;
  color: $fontcolor;
  display: flex;
  justify-content: center;

  &__item {
    width: 5rem;
    text-align: center;
    .iconfont {
      padding-right: 5px;
    }
  }
}
</style>
