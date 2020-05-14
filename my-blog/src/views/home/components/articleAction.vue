<template>
  <div class="article-footer">
    <div class="footer-content" @click.stop="handleClick(article.author)">
      <el-avatar size="small" :src="article.avatar"></el-avatar>
      <span class="author-name">{{article.author}}</span>
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
  @include flexcenter($jc: space-between, $ai: center);
  margin-top: 4px;
  font-size: 1.083333rem /* 13/12 */;
}
.author-name {
  padding: 0 10px;
  box-sizing: border-box;
  color: $title-name-color;
  cursor: pointer;
  &:hover {
    color: $primary;
  }
}
.footer-content {
  flex: 1;
  display: flex;
  align-items: center;

  &__tags {
    flex: 1;
    box-sizing: border-box;
    color: $title-name-color;
    @include nowrap();
    .iconfont {
      color: $title-name-color;
      padding-right: 5px;
    }
  }
}
.footer-action {
  font-size: 1.083333rem /* 13/12 */;
  color: $title-name-color;
  display: flex;
  justify-content: center;

  &__item {
    width: 5rem;
    text-align: end;
    .iconfont {
      color: $title-name-color;
      padding-right: 5px;
    }
  }
}
</style>
